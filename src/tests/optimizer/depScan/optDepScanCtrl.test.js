import {asm, asmLabel} from "../../../lib/intsructions/asmWriter.js";
import {asmGetReorderRange, asmInitDeps} from "../../../lib/optimizer/asmScanDeps.js";

function asmLinesToDeps(lines)
{
  asmInitDeps({asm: lines});
  return lines.map((line, i) => asmGetReorderRange(lines, i));
}

describe('Optimizer - Dependency Scanner - Control', () =>
{
  test('Stop at Label', () => {
    const lines = [
      /* 00 */ asm("or", ["$t0", "$zero", "$zero"]),
      /* 01 */ asm("or", ["$t1", "$zero", "$zero"]),
      /* 02 */ asmLabel("SOME_LABEL"),
      /* 03 */ asm("or", ["$t2", "$zero", "$zero"]),
    ];
    expect(asmLinesToDeps(lines)).toEqual([
      [0, 1],
      [0, 1],
      [2, 2],
      [3, 3],
    ]);
  });

  test('Stop at Jump', () => {
    const lines = [
      /* 00 */ asm("or", ["$t0", "$zero", "$zero"]),
      /* 01 */ asm("or", ["$t1", "$zero", "$zero"]),
      /* 02 */ asm("j", ["SOME_WHERE"]),
      /* 03 */ asm("or", ["$t2", "$zero", "$zero"]), // delay slot (filled)
      /* 04 */ asm("or", ["$t2", "$zero", "$zero"]),
    ];
    expect(asmLinesToDeps(lines)).toEqual([
      [0, 1],
      [0, 1],
      [2, 2], // j
      [0, 3], // delay-slot, only move backwards
      [4, 4],
    ]);
  });
});