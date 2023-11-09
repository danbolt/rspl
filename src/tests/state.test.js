import {transpileSource} from "../lib/transpiler";

const CONF = {rspqWrapper: true};

const getDataSection = asm => {
  const idxData = asm.indexOf(".data");
  const idxText = asm.indexOf(".text");
  return asm.substring(idxData, idxText);
}

describe('State', () =>
{
  test('Empty State', () => {
    const {asm, warn} = transpileSource(`
      state {}
      `, CONF);

    expect(warn).toBe("");
    expect(getDataSection(asm)).toBe(`.data
  RSPQ_BeginOverlayHeader

  RSPQ_EndOverlayHeader

  RSPQ_EmptySavedState

`);
  });

  test('Types', () => {
    const {asm, warn} = transpileSource(`
      state {
        u8 a;
        u16 b;
        u32 c;
        vec16 d;
        vec32 e;
      }
      `, CONF);

    expect(warn).toBe("");
    expect(getDataSection(asm)).toBe(`.data
  RSPQ_BeginOverlayHeader

  RSPQ_EndOverlayHeader

  RSPQ_BeginSavedState
    .align 1
    a: .ds.b 1
    .align 1
    b: .ds.b 2
    .align 2
    c: .ds.b 4
    .align 3
    d: .ds.b 16
    .align 4
    e: .ds.b 32
  RSPQ_EndSavedState

`);
  });

  test('Arrays', () => {
    const {asm, warn} = transpileSource(`
      state {
        u32 a0[1];
        u32 a1[4];
        u32 a2[2][4];
        vec32 b0[1];
        vec32 b1[2];
        vec32 b2[4][2];
      }
      `, CONF);

    expect(warn).toBe("");
    expect(getDataSection(asm)).toBe(`.data
  RSPQ_BeginOverlayHeader

  RSPQ_EndOverlayHeader

  RSPQ_BeginSavedState
    .align 2
    a0: .ds.b 4
    .align 2
    a1: .ds.b 16
    .align 2
    a2: .ds.b 32
    .align 4
    b0: .ds.b 32
    .align 4
    b1: .ds.b 64
    .align 4
    b2: .ds.b 256
  RSPQ_EndSavedState

`);
  });

  test('Extern', () => {
    const {asm, warn} = transpileSource(`
      state {
        u32 a;
        extern u32 b;
        u32 c;
      }
      `, CONF);

    expect(warn).toBe("");
    expect(getDataSection(asm)).toBe(`.data
  RSPQ_BeginOverlayHeader

  RSPQ_EndOverlayHeader

  RSPQ_BeginSavedState
    .align 2
    a: .ds.b 4
    .align 2
    c: .ds.b 4
  RSPQ_EndSavedState

`);
  });
});