/**
* @copyright 2023 - Max Bebök
* @license GPL-3.0
*/

import opsScalar from "./operations/scalar";
import opsVector from "./operations/vector";
import state from "./state";
import builtins from "./builtins/functions";
import {isVecReg, REG} from "./syntax/registers.js";
import {asm, asmComment, asmLabel, asmNOP} from "./intsructions/asmWriter.js";
import {opBranch} from "./operations/branch.js";
import {callUserFunction} from "./operations/userFunction.js";

const VECTOR_TYPES = ["vec16", "vec32"];

function calcToAsm(calc, varRes)
{
  switch(calc.type)
  {
    case "calcVar": {
      const varRight = state.getRequiredVar(calc.right, "right", calc);
      varRight.swizzle = calc.swizzleRight;
      return calcAssignToAsm(calc, varRes, varRight);
    }

    case "calcNum": {
      const varRight = {type: varRes.type, value: calc.right};
      return calcAssignToAsm(calc, varRes, varRight);
    }

    case "calcVarVar": {
      const varLeft = state.getRequiredVar(calc.left, "Left", calc);
      const varRight = state.getRequiredVar(calc.right, "right", calc);
      varLeft.swizzle = calc.swizzleLeft;
      varRight.swizzle = calc.swizzleRight;

      return calcLRToAsm(calc, varRes, varLeft, varRight);
    }

    case "calcVarNum": {
      const varLeft = state.getRequiredVar(calc.left, "Left", calc);
      varLeft.swizzle = calc.swizzleLeft;
      const varRight = {type: varLeft.type, value: calc.right};

      return calcLRToAsm(calc, varRes, varLeft, varRight);
    }

    case "calcFunc": {
      const builtinFunc = builtins[calc.funcName];
      if(!builtinFunc)state.throwError("Unknown builtin: " + calc.funcName, calc);
      return builtinFunc(varRes, calc.args, calc.swizzleRight);
    }

    default: state.throwError("Unknown calculation type: " + calc.type, calc);
  }
}

function calcAssignToAsm(calc, varRes, varRight) {
  const isVector = VECTOR_TYPES.includes(varRes.type);
  const opsHandler = isVector ? opsVector : opsScalar;

  if(!isVector && (calc.swizzleLeft || calc.swizzleRight)) {
    state.throwError("Swizzling not allowed for scalar operations!");
  }

  switch (calc.op) {
    case "!":  state.throwError("Unary '!'-operator not implemented!"); break;
    case "~": return opsHandler.opBitFlip(varRes, varRight);
    default: return opsHandler.opMove(varRes, varRight);
  }
}

function calcLRToAsm(calc, varRes, varLeft, varRight)
{
  const op = calc.op;
  if(varLeft.type !== varRight.type || varLeft.type !== varRes.type) {
    //state.throwError("Type mismatch!", [varLeft.type, varRight.type, varRes.type]);
  }

  const isVector = VECTOR_TYPES.includes(varRes.type);
  const opsHandler = isVector ? opsVector : opsScalar;

  if(!isVector && (calc.swizzleLeft || calc.swizzleRight)) {
    state.throwError("Swizzling not allowed for scalar operations!");
  }

  switch (op) {
    case  "+":  return opsHandler.opAdd(varRes, varLeft, varRight, true);
    case  "-":  return opsHandler.opSub(varRes, varLeft, varRight, true);
    case "++":  return opsHandler.opAdd(varRes, varLeft, varRight, false);
    case  "*":  return opsHandler.opMul(varRes, varLeft, varRight, true);
    case "+*":  return opsHandler.opMul(varRes, varLeft, varRight, false);
    case  "/":  return opsHandler.opDiv(varRes, varLeft, varRight, true);
    case "+/":  return opsHandler.opDiv(varRes, varLeft, varRight, false);

    case "&":  return opsHandler.opAnd(varRes, varLeft, varRight);
    case "|":  return opsHandler.opOr(varRes, varLeft, varRight);
    case "^":  return opsHandler.opXOR(varRes, varLeft, varRight);

    case "<<":  return opsHandler.opShiftLeft(varRes, varLeft, varRight);
    case ">>":  return opsHandler.opShiftRight(varRes, varLeft, varRight);

    default: state.throwError("Unknown operator: " + op);
  }
}

function ifToASM(st, args)
{
  if(st.compare.left.type === "num") {
    return state.throwError("IF-Statements with numeric left-hand-side not implemented!", st);
  }
  const varLeft = state.getRequiredVar(st.compare.left.value, "left", st);
  if(isVecReg(varLeft.reg)) {
    return state.throwError("IF-Statements must use scalar-registers!", st);
  }

  const labelElse = state.generateLocalLabel();
  const labelEnd = st.blockElse ? state.generateLocalLabel() : labelElse;
  const res = [];

  // Branch condition
  res.push(...opBranch(st.compare, labelElse));

  // IF-Block
  state.pushScope();
  res.push(...scopedBlockToASM(st.blockIf, args));
  if(st.blockElse)res.push(asm("beq", [REG.ZERO, REG.ZERO, labelEnd+"f"]), asmNOP());
  state.popScope();

  // ELSE-Block
  if(st.blockElse) {
    state.pushScope();
    res.push(asmLabel(labelElse), ...scopedBlockToASM(st.blockElse, args));
    state.popScope();
  }
  res.push(asmLabel(labelEnd));

  return res;
}

function scopedBlockToASM(block, args)
{
  const res = [];

  let argIdx = 0;
  for(const arg of args)
  {
    let reg = arg.reg || "$a"+argIdx;
    if(argIdx >= 4) { // args beyond that live in RAM, fetch them and expect a target register
      if(!arg.reg)state.throwError("Argument "+argIdx+" '"+arg.name+"' needs a target register!", arg);
      const totalSize = args.length * 4;
      res.push(asm("lw", [arg.reg, `%lo(RSPQ_DMEM_BUFFER) - ${totalSize - argIdx*4}(${REG.GP})`]));
    }

    state.declareVar(arg.name, arg.type, reg);
    ++argIdx;
  }

  for(const st of block.statements)
  {
    state.line = st.line || 0;

    switch(st.type) 
    {
      case "comment":
        res.push(asmComment(st.comment.substring(2).trimEnd() || ""));
      break;

      case "varDecl":
        state.declareVar(st.varName, st.varType, st.reg);
        break;

      case "varAssignCalc": {
        const calc = st.calc;
        const varRes = structuredClone(
          state.getRequiredVar(st.varName, "result", st)
        );
        varRes.swizzle = st.swizzle;
        if(!varRes)state.throwError("Destination Variable "+st.varName+" not known!", st);

        res.push(...calcToAsm(calc, varRes));
      } break;

      case "funcCall": {
        const builtinFunc = builtins[st.func];
        if(builtinFunc) {
          res.push(...builtinFunc(undefined, st.args, undefined));
        } else {
          res.push(...callUserFunction(st.func, st.args));
        }

      } break;

      case "labelDecl":
        res.push(asmLabel(st.name));
      break;

      case "goto":
        res.push(asm("j", [st.label]), asmNOP());
      break;

      case "if":
        res.push(...ifToASM(st, args));
      break;

      case "scopedBlock":
        state.pushScope();
        res.push(...scopedBlockToASM(st, args));
        state.popScope();
      break;

      default:
        state.throwError("Unknown statement type: " + st.type, st);
    }
  }
  return res;
}

function getArgSize(block)
{
  if(block.type !== "command")return 0;
  // each arg is always 4-bytes, the first one is implicitly set
  return Math.max(block.args.length * 4, 4);
}

export function ast2asm(ast)
{
  const res = [];

  for(const stateVar of ast.state) {
    state.declareMemVar(stateVar.varName, stateVar.varType, stateVar.arraySize);
  }

  for(const block of ast.functions)
  {
    state.func = block.name || "";
    state.line = block.line || 0;

    if(["function", "command"].includes(block.type)) {
      state.declareFunction(block.name, block.args);
      state.enterFunction(block.name);

      if(!block.body)continue;

      const blockAsm = scopedBlockToASM(block.body, block.args);
      if(block.type === "command") {
        blockAsm.push(asm("j", ["RSPQ_Loop"]), asmNOP()); // @TODO
      } else {
        blockAsm.push(asm("jr", [REG.RA]), asmNOP());
      }

      res.push({
        ...block,
        asm: blockAsm.filter(Boolean),
        argSize: getArgSize(block),
        body: undefined
      });
    }
  }
  return res;
}
