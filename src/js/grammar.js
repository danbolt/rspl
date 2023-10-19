// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 
	const MAP_NULL = () => null;
	const MAP_FIRST = d => d[0]; 
	const MAP_ENUM = d => d[0][0]; 
	const MAP_TAKE = (d, i) => d && d.map(x => x[i]);
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "File$ebnf$1$subexpression$1", "symbols": ["_", "SectionCmd"]},
    {"name": "File$ebnf$1", "symbols": ["File$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "File$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "File$ebnf$2$subexpression$1", "symbols": ["_", "SectionState"]},
    {"name": "File$ebnf$2", "symbols": ["File$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "File$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "File$ebnf$3", "symbols": []},
    {"name": "File$ebnf$3$subexpression$1", "symbols": ["_", "Function"]},
    {"name": "File$ebnf$3", "symbols": ["File$ebnf$3", "File$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "File", "symbols": ["File$ebnf$1", "File$ebnf$2", "File$ebnf$3", "_"], "postprocess":  
        d => ({
        	commands : d[0] && d[0][1],
           		state    : d[1] && d[1][1],
           		functions: MAP_TAKE(d[2], 1)
          	}) 
        },
    {"name": "SectionCmd$subexpression$1", "symbols": [/[cC]/, /[oO]/, /[mM]/, /[mM]/, /[aA]/, /[nN]/, /[dD]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "SectionCmd$ebnf$1", "symbols": []},
    {"name": "SectionCmd$ebnf$1", "symbols": ["SectionCmd$ebnf$1", "CommandDef"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "SectionCmd", "symbols": ["SectionCmd$subexpression$1", "_", {"literal":"{"}, "_", "SectionCmd$ebnf$1", {"literal":"}"}], "postprocess": d => d[4]},
    {"name": "CommandDef", "symbols": ["ValueNumeric", {"literal":":"}, "_", "VarName", "_"], "postprocess": d => ({idx: d[0], name: d[3]})},
    {"name": "SectionState$subexpression$1", "symbols": [/[sS]/, /[tT]/, /[aA]/, /[tT]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "SectionState$ebnf$1", "symbols": []},
    {"name": "SectionState$ebnf$1", "symbols": ["SectionState$ebnf$1", "StateVarDef"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "SectionState", "symbols": ["SectionState$subexpression$1", "_", {"literal":"{"}, "_", "SectionState$ebnf$1", {"literal":"}"}], "postprocess": d => d[4]},
    {"name": "StateVarDef", "symbols": ["DataType", "_", "VarName", "_", {"literal":";"}, "_"], "postprocess":  
        (d) => ({type: "varState", varType: d[0], varName: d[2]})
        },
    {"name": "Function$string$1", "symbols": [{"literal":"("}, {"literal":")"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Function", "symbols": ["FuncName", "Function$string$1", "_LB_", {"literal":"{"}, "FuncBody", "_LB_", {"literal":"}"}], "postprocess": d => ({type: "function", name: d[0], body: d[4]})},
    {"name": "FuncBody$ebnf$1", "symbols": []},
    {"name": "FuncBody$ebnf$1$subexpression$1", "symbols": ["Statement"]},
    {"name": "FuncBody$ebnf$1$subexpression$1", "symbols": ["LineComment"]},
    {"name": "FuncBody$ebnf$1", "symbols": ["FuncBody$ebnf$1", "FuncBody$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "FuncBody", "symbols": ["FuncBody$ebnf$1"], "postprocess": function(d) {return {type: "funcBody", statements: d[0].map(y => y[0])}}},
    {"name": "Statement$subexpression$1", "symbols": ["ExprVarDeclAssign"]},
    {"name": "Statement$subexpression$1", "symbols": ["ExprVarAssign"]},
    {"name": "Statement$subexpression$1", "symbols": ["ExprASM"]},
    {"name": "Statement", "symbols": ["_", "Statement$subexpression$1", {"literal":";"}], "postprocess": (d) => d[1][0]},
    {"name": "LineComment$string$1", "symbols": [{"literal":"/"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LineComment$ebnf$1", "symbols": []},
    {"name": "LineComment$ebnf$1", "symbols": ["LineComment$ebnf$1", /./], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LineComment", "symbols": ["_", "LineComment$string$1", "LineComment$ebnf$1", /[\n]/], "postprocess": (d) => ({type: "comment", comment: d[2].join("")})},
    {"name": "ExprVarDeclAssign$subexpression$1$ebnf$1", "symbols": ["ExprPartAssign"], "postprocess": id},
    {"name": "ExprVarDeclAssign$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ExprVarDeclAssign$subexpression$1", "symbols": ["DataType", "RegDef", "_", "VarName", "_", "ExprVarDeclAssign$subexpression$1$ebnf$1"]},
    {"name": "ExprVarDeclAssign", "symbols": ["ExprVarDeclAssign$subexpression$1"], "postprocess":  
        ([d]) => ({type: "varDeclAssign", varType: d[0], reg: d[1], varName: d[3], value: d[5]})
        },
    {"name": "ExprPartAssign$subexpression$1", "symbols": ["ValueNumeric"]},
    {"name": "ExprPartAssign$subexpression$1", "symbols": ["ExprFuncCall"]},
    {"name": "ExprPartAssign$ebnf$1", "symbols": ["OpsSwizzle"], "postprocess": id},
    {"name": "ExprPartAssign$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ExprPartAssign", "symbols": [{"literal":"="}, "_", "ExprPartAssign$subexpression$1", "_", "ExprPartAssign$ebnf$1"], "postprocess": d => ({type: "value", value: d[2][0], swizzle: d[4]})},
    {"name": "ExprFuncCall", "symbols": ["FuncName", {"literal":"("}, "_", "VarName", "_", {"literal":")"}], "postprocess": d => ({type: "funcCall", func: d[0], args: d[3]})},
    {"name": "ExprASM$string$1", "symbols": [{"literal":"a"}, {"literal":"s"}, {"literal":"m"}, {"literal":"("}, {"literal":"\""}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ExprASM$ebnf$1", "symbols": []},
    {"name": "ExprASM$ebnf$1", "symbols": ["ExprASM$ebnf$1", /[a-zA-Z0-9 ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ExprASM$string$2", "symbols": [{"literal":"\""}, {"literal":")"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ExprASM", "symbols": ["ExprASM$string$1", "ExprASM$ebnf$1", "ExprASM$string$2"], "postprocess": d => ({type: "asm", asm: d[1].join("")})},
    {"name": "ExprVarAssign$subexpression$1", "symbols": ["VarName", "_", {"literal":"="}, "_", "ExprPartAssignCalc"]},
    {"name": "ExprVarAssign", "symbols": ["ExprVarAssign$subexpression$1"], "postprocess":  
        ([d]) => ({type: "varAssignCalc", varName: d[0], value: d[5], calc: d[4]})
        },
    {"name": "ExprPartAssignCalc$ebnf$1", "symbols": ["OpsSwizzle"], "postprocess": id},
    {"name": "ExprPartAssignCalc$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ExprPartAssignCalc$ebnf$2", "symbols": ["OpsSwizzle"], "postprocess": id},
    {"name": "ExprPartAssignCalc$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ExprPartAssignCalc", "symbols": ["VarName", "ExprPartAssignCalc$ebnf$1", "_", "OpsLeftRight", "_", "VarName", "ExprPartAssignCalc$ebnf$2"], "postprocess":  
        d => ({type: "calc", left: d[0], swizzleLeft: d[1], op: d[3], right: d[5], swizzleRight: d[6]}) 
        },
    {"name": "VarName$ebnf$1", "symbols": []},
    {"name": "VarName$ebnf$1", "symbols": ["VarName$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "VarName", "symbols": [/[a-zA-Z]/, "VarName$ebnf$1"], "postprocess": d => d[0][0] + d[1].join("")},
    {"name": "FuncName$ebnf$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "FuncName$ebnf$1", "symbols": ["FuncName$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "FuncName", "symbols": ["FuncName$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "DataType$subexpression$1$string$1", "symbols": [{"literal":"u"}, {"literal":"8"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DataType$subexpression$1", "symbols": ["DataType$subexpression$1$string$1"]},
    {"name": "DataType$subexpression$1$string$2", "symbols": [{"literal":"s"}, {"literal":"8"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DataType$subexpression$1", "symbols": ["DataType$subexpression$1$string$2"]},
    {"name": "DataType$subexpression$1$string$3", "symbols": [{"literal":"u"}, {"literal":"1"}, {"literal":"6"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DataType$subexpression$1", "symbols": ["DataType$subexpression$1$string$3"]},
    {"name": "DataType$subexpression$1$string$4", "symbols": [{"literal":"s"}, {"literal":"1"}, {"literal":"6"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DataType$subexpression$1", "symbols": ["DataType$subexpression$1$string$4"]},
    {"name": "DataType$subexpression$1$string$5", "symbols": [{"literal":"u"}, {"literal":"3"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DataType$subexpression$1", "symbols": ["DataType$subexpression$1$string$5"]},
    {"name": "DataType$subexpression$1$string$6", "symbols": [{"literal":"s"}, {"literal":"3"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DataType$subexpression$1", "symbols": ["DataType$subexpression$1$string$6"]},
    {"name": "DataType$subexpression$1$string$7", "symbols": [{"literal":"v"}, {"literal":"e"}, {"literal":"c"}, {"literal":"3"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DataType$subexpression$1", "symbols": ["DataType$subexpression$1$string$7"]},
    {"name": "DataType$subexpression$1$string$8", "symbols": [{"literal":"v"}, {"literal":"e"}, {"literal":"c"}, {"literal":"1"}, {"literal":"6"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DataType$subexpression$1", "symbols": ["DataType$subexpression$1$string$8"]},
    {"name": "DataType", "symbols": ["DataType$subexpression$1"], "postprocess": MAP_ENUM},
    {"name": "RegsAll", "symbols": ["RegsScalar"]},
    {"name": "RegsAll", "symbols": ["RegsVector"]},
    {"name": "RegsScalar$subexpression$1$string$1", "symbols": [{"literal":"$"}, {"literal":"a"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$1"]},
    {"name": "RegsScalar$subexpression$1$string$2", "symbols": [{"literal":"$"}, {"literal":"z"}, {"literal":"e"}, {"literal":"r"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$2"]},
    {"name": "RegsScalar$subexpression$1$string$3", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$3"]},
    {"name": "RegsScalar$subexpression$1$string$4", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$4"]},
    {"name": "RegsScalar$subexpression$1$string$5", "symbols": [{"literal":"$"}, {"literal":"a"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$5"]},
    {"name": "RegsScalar$subexpression$1$string$6", "symbols": [{"literal":"$"}, {"literal":"a"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$6"]},
    {"name": "RegsScalar$subexpression$1$string$7", "symbols": [{"literal":"$"}, {"literal":"a"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$7"]},
    {"name": "RegsScalar$subexpression$1$string$8", "symbols": [{"literal":"$"}, {"literal":"a"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$8"]},
    {"name": "RegsScalar$subexpression$1$string$9", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$9"]},
    {"name": "RegsScalar$subexpression$1$string$10", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$10"]},
    {"name": "RegsScalar$subexpression$1$string$11", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$11"]},
    {"name": "RegsScalar$subexpression$1$string$12", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$12"]},
    {"name": "RegsScalar$subexpression$1$string$13", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"4"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$13"]},
    {"name": "RegsScalar$subexpression$1$string$14", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"5"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$14"]},
    {"name": "RegsScalar$subexpression$1$string$15", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"6"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$15"]},
    {"name": "RegsScalar$subexpression$1$string$16", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"7"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$16"]},
    {"name": "RegsScalar$subexpression$1$string$17", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"8"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$17"]},
    {"name": "RegsScalar$subexpression$1$string$18", "symbols": [{"literal":"$"}, {"literal":"t"}, {"literal":"9"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$18"]},
    {"name": "RegsScalar$subexpression$1$string$19", "symbols": [{"literal":"$"}, {"literal":"s"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$19"]},
    {"name": "RegsScalar$subexpression$1$string$20", "symbols": [{"literal":"$"}, {"literal":"s"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$20"]},
    {"name": "RegsScalar$subexpression$1$string$21", "symbols": [{"literal":"$"}, {"literal":"s"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$21"]},
    {"name": "RegsScalar$subexpression$1$string$22", "symbols": [{"literal":"$"}, {"literal":"s"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$22"]},
    {"name": "RegsScalar$subexpression$1$string$23", "symbols": [{"literal":"$"}, {"literal":"s"}, {"literal":"4"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$23"]},
    {"name": "RegsScalar$subexpression$1$string$24", "symbols": [{"literal":"$"}, {"literal":"s"}, {"literal":"5"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$24"]},
    {"name": "RegsScalar$subexpression$1$string$25", "symbols": [{"literal":"$"}, {"literal":"s"}, {"literal":"6"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$25"]},
    {"name": "RegsScalar$subexpression$1$string$26", "symbols": [{"literal":"$"}, {"literal":"s"}, {"literal":"7"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$26"]},
    {"name": "RegsScalar$subexpression$1$string$27", "symbols": [{"literal":"$"}, {"literal":"k"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$27"]},
    {"name": "RegsScalar$subexpression$1$string$28", "symbols": [{"literal":"$"}, {"literal":"k"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$28"]},
    {"name": "RegsScalar$subexpression$1$string$29", "symbols": [{"literal":"$"}, {"literal":"g"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$29"]},
    {"name": "RegsScalar$subexpression$1$string$30", "symbols": [{"literal":"$"}, {"literal":"s"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$30"]},
    {"name": "RegsScalar$subexpression$1$string$31", "symbols": [{"literal":"$"}, {"literal":"f"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$31"]},
    {"name": "RegsScalar$subexpression$1$string$32", "symbols": [{"literal":"$"}, {"literal":"r"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsScalar$subexpression$1", "symbols": ["RegsScalar$subexpression$1$string$32"]},
    {"name": "RegsScalar", "symbols": ["RegsScalar$subexpression$1"], "postprocess": MAP_ENUM},
    {"name": "RegsVector$subexpression$1$string$1", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$1"]},
    {"name": "RegsVector$subexpression$1$string$2", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$2"]},
    {"name": "RegsVector$subexpression$1$string$3", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$3"]},
    {"name": "RegsVector$subexpression$1$string$4", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$4"]},
    {"name": "RegsVector$subexpression$1$string$5", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"4"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$5"]},
    {"name": "RegsVector$subexpression$1$string$6", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"5"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$6"]},
    {"name": "RegsVector$subexpression$1$string$7", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"6"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$7"]},
    {"name": "RegsVector$subexpression$1$string$8", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"7"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$8"]},
    {"name": "RegsVector$subexpression$1$string$9", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"8"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$9"]},
    {"name": "RegsVector$subexpression$1$string$10", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"0"}, {"literal":"9"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$10"]},
    {"name": "RegsVector$subexpression$1$string$11", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$11"]},
    {"name": "RegsVector$subexpression$1$string$12", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$12"]},
    {"name": "RegsVector$subexpression$1$string$13", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$13"]},
    {"name": "RegsVector$subexpression$1$string$14", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$14"]},
    {"name": "RegsVector$subexpression$1$string$15", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"4"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$15"]},
    {"name": "RegsVector$subexpression$1$string$16", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"5"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$16"]},
    {"name": "RegsVector$subexpression$1$string$17", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"6"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$17"]},
    {"name": "RegsVector$subexpression$1$string$18", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"7"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$18"]},
    {"name": "RegsVector$subexpression$1$string$19", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"8"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$19"]},
    {"name": "RegsVector$subexpression$1$string$20", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"1"}, {"literal":"9"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$20"]},
    {"name": "RegsVector$subexpression$1$string$21", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$21"]},
    {"name": "RegsVector$subexpression$1$string$22", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$22"]},
    {"name": "RegsVector$subexpression$1$string$23", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"2"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$23"]},
    {"name": "RegsVector$subexpression$1$string$24", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"3"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$24"]},
    {"name": "RegsVector$subexpression$1$string$25", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"4"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$25"]},
    {"name": "RegsVector$subexpression$1$string$26", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"5"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$26"]},
    {"name": "RegsVector$subexpression$1$string$27", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"6"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$27"]},
    {"name": "RegsVector$subexpression$1$string$28", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"7"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$28"]},
    {"name": "RegsVector$subexpression$1$string$29", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"8"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$29"]},
    {"name": "RegsVector$subexpression$1$string$30", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"2"}, {"literal":"9"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$30"]},
    {"name": "RegsVector$subexpression$1$string$31", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"3"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$31"]},
    {"name": "RegsVector$subexpression$1$string$32", "symbols": [{"literal":"$"}, {"literal":"v"}, {"literal":"3"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RegsVector$subexpression$1", "symbols": ["RegsVector$subexpression$1$string$32"]},
    {"name": "RegsVector", "symbols": ["RegsVector$subexpression$1"], "postprocess": MAP_ENUM},
    {"name": "RegDef", "symbols": [{"literal":"<"}, "RegsAll", {"literal":">"}], "postprocess": (d) => d[1][0]},
    {"name": "ValueNumeric$subexpression$1", "symbols": ["ValueInt"]},
    {"name": "ValueNumeric$subexpression$1", "symbols": ["ValueHex"]},
    {"name": "ValueNumeric", "symbols": ["ValueNumeric$subexpression$1"], "postprocess": (d) => d[0][0]},
    {"name": "ValueInt$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "ValueInt$ebnf$1", "symbols": ["ValueInt$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ValueInt", "symbols": ["ValueInt$ebnf$1"], "postprocess": (d) => parseInt(d[0].join(""))},
    {"name": "ValueHex$string$1", "symbols": [{"literal":"0"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ValueHex$ebnf$1", "symbols": [/[0-9A-F]/]},
    {"name": "ValueHex$ebnf$1", "symbols": ["ValueHex$ebnf$1", /[0-9A-F]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ValueHex", "symbols": ["ValueHex$string$1", "ValueHex$ebnf$1"], "postprocess": (d) => parseInt(d[1].join(""), 16)},
    {"name": "OpsLeftRight$subexpression$1", "symbols": ["OpsNumeric"]},
    {"name": "OpsLeftRight$subexpression$1", "symbols": ["OpsLogic"]},
    {"name": "OpsLeftRight$subexpression$1", "symbols": ["OpsBitwise"]},
    {"name": "OpsLeftRight", "symbols": ["OpsLeftRight$subexpression$1"], "postprocess": MAP_ENUM},
    {"name": "OpsNumeric$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "OpsNumeric$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "OpsNumeric$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "OpsNumeric$subexpression$1$string$1", "symbols": [{"literal":"+"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsNumeric$subexpression$1", "symbols": ["OpsNumeric$subexpression$1$string$1"]},
    {"name": "OpsNumeric$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "OpsNumeric$subexpression$1", "symbols": [{"literal":"."}]},
    {"name": "OpsNumeric", "symbols": ["OpsNumeric$subexpression$1"], "postprocess": MAP_ENUM},
    {"name": "OpsLogic$subexpression$1$string$1", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsLogic$subexpression$1", "symbols": ["OpsLogic$subexpression$1$string$1"]},
    {"name": "OpsLogic$subexpression$1$string$2", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsLogic$subexpression$1", "symbols": ["OpsLogic$subexpression$1$string$2"]},
    {"name": "OpsLogic$subexpression$1", "symbols": [{"literal":"!"}]},
    {"name": "OpsLogic$subexpression$1$string$3", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsLogic$subexpression$1", "symbols": ["OpsLogic$subexpression$1$string$3"]},
    {"name": "OpsLogic$subexpression$1$string$4", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsLogic$subexpression$1", "symbols": ["OpsLogic$subexpression$1$string$4"]},
    {"name": "OpsLogic$subexpression$1", "symbols": [{"literal":"<"}]},
    {"name": "OpsLogic$subexpression$1", "symbols": [{"literal":">"}]},
    {"name": "OpsLogic$subexpression$1$string$5", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsLogic$subexpression$1", "symbols": ["OpsLogic$subexpression$1$string$5"]},
    {"name": "OpsLogic$subexpression$1$string$6", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsLogic$subexpression$1", "symbols": ["OpsLogic$subexpression$1$string$6"]},
    {"name": "OpsLogic", "symbols": ["OpsLogic$subexpression$1"], "postprocess": MAP_ENUM},
    {"name": "OpsBitwise$subexpression$1", "symbols": [{"literal":"&"}]},
    {"name": "OpsBitwise$subexpression$1", "symbols": [{"literal":"|"}]},
    {"name": "OpsBitwise$subexpression$1", "symbols": [{"literal":"^"}]},
    {"name": "OpsBitwise$subexpression$1", "symbols": [{"literal":"~"}]},
    {"name": "OpsBitwise$subexpression$1$string$1", "symbols": [{"literal":"<"}, {"literal":"<"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsBitwise$subexpression$1", "symbols": ["OpsBitwise$subexpression$1$string$1"]},
    {"name": "OpsBitwise$subexpression$1$string$2", "symbols": [{"literal":">"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsBitwise$subexpression$1", "symbols": ["OpsBitwise$subexpression$1$string$2"]},
    {"name": "OpsBitwise", "symbols": ["OpsBitwise$subexpression$1"], "postprocess": MAP_ENUM},
    {"name": "OpsSwizzle$subexpression$1$string$1", "symbols": [{"literal":"."}, {"literal":"x"}, {"literal":"x"}, {"literal":"z"}, {"literal":"z"}, {"literal":"X"}, {"literal":"X"}, {"literal":"Z"}, {"literal":"Z"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$1"]},
    {"name": "OpsSwizzle$subexpression$1$string$2", "symbols": [{"literal":"."}, {"literal":"y"}, {"literal":"y"}, {"literal":"w"}, {"literal":"w"}, {"literal":"Y"}, {"literal":"Y"}, {"literal":"W"}, {"literal":"W"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$2"]},
    {"name": "OpsSwizzle$subexpression$1$string$3", "symbols": [{"literal":"."}, {"literal":"x"}, {"literal":"x"}, {"literal":"x"}, {"literal":"x"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$3"]},
    {"name": "OpsSwizzle$subexpression$1$string$4", "symbols": [{"literal":"."}, {"literal":"y"}, {"literal":"y"}, {"literal":"y"}, {"literal":"y"}, {"literal":"Y"}, {"literal":"Y"}, {"literal":"Y"}, {"literal":"Y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$4"]},
    {"name": "OpsSwizzle$subexpression$1$string$5", "symbols": [{"literal":"."}, {"literal":"z"}, {"literal":"z"}, {"literal":"z"}, {"literal":"z"}, {"literal":"Z"}, {"literal":"Z"}, {"literal":"Z"}, {"literal":"Z"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$5"]},
    {"name": "OpsSwizzle$subexpression$1$string$6", "symbols": [{"literal":"."}, {"literal":"w"}, {"literal":"w"}, {"literal":"w"}, {"literal":"w"}, {"literal":"W"}, {"literal":"W"}, {"literal":"W"}, {"literal":"W"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$6"]},
    {"name": "OpsSwizzle$subexpression$1$string$7", "symbols": [{"literal":"."}, {"literal":"x"}, {"literal":"x"}, {"literal":"x"}, {"literal":"x"}, {"literal":"x"}, {"literal":"x"}, {"literal":"x"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$7"]},
    {"name": "OpsSwizzle$subexpression$1$string$8", "symbols": [{"literal":"."}, {"literal":"y"}, {"literal":"y"}, {"literal":"y"}, {"literal":"y"}, {"literal":"y"}, {"literal":"y"}, {"literal":"y"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$8"]},
    {"name": "OpsSwizzle$subexpression$1$string$9", "symbols": [{"literal":"."}, {"literal":"z"}, {"literal":"z"}, {"literal":"z"}, {"literal":"z"}, {"literal":"z"}, {"literal":"z"}, {"literal":"z"}, {"literal":"z"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$9"]},
    {"name": "OpsSwizzle$subexpression$1$string$10", "symbols": [{"literal":"."}, {"literal":"w"}, {"literal":"w"}, {"literal":"w"}, {"literal":"w"}, {"literal":"w"}, {"literal":"w"}, {"literal":"w"}, {"literal":"w"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$10"]},
    {"name": "OpsSwizzle$subexpression$1$string$11", "symbols": [{"literal":"."}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}, {"literal":"X"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$11"]},
    {"name": "OpsSwizzle$subexpression$1$string$12", "symbols": [{"literal":"."}, {"literal":"Y"}, {"literal":"Y"}, {"literal":"Y"}, {"literal":"Y"}, {"literal":"Y"}, {"literal":"Y"}, {"literal":"Y"}, {"literal":"Y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$12"]},
    {"name": "OpsSwizzle$subexpression$1$string$13", "symbols": [{"literal":"."}, {"literal":"Z"}, {"literal":"Z"}, {"literal":"Z"}, {"literal":"Z"}, {"literal":"Z"}, {"literal":"Z"}, {"literal":"Z"}, {"literal":"Z"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$13"]},
    {"name": "OpsSwizzle$subexpression$1$string$14", "symbols": [{"literal":"."}, {"literal":"W"}, {"literal":"W"}, {"literal":"W"}, {"literal":"W"}, {"literal":"W"}, {"literal":"W"}, {"literal":"W"}, {"literal":"W"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "OpsSwizzle$subexpression$1", "symbols": ["OpsSwizzle$subexpression$1$string$14"]},
    {"name": "OpsSwizzle", "symbols": ["OpsSwizzle$subexpression$1"], "postprocess": d => d[0][0].substring(1)},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": MAP_NULL},
    {"name": "_LB_$ebnf$1", "symbols": []},
    {"name": "_LB_$ebnf$1", "symbols": ["_LB_$ebnf$1", /[ \t\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_LB_", "symbols": ["_LB_$ebnf$1"], "postprocess": MAP_NULL}
]
  , ParserStart: "File"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
