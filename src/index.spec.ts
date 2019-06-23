import * as Utils from './';

describe('Bitwise operations', () => {
  it('Q_BitReset32', () => {
    expect(Utils.Q_BitReset32(0b0001, 0)).toBe(0);
    expect(Utils.Q_BitReset32(0b0110, 1)).toBe(0b0100);
    expect(Utils.Q_BitReset32(0b1000000000000000000000000000000, 30)).toBe(0);
  });

  it('Q_BitSet32', () => {
    expect(Utils.Q_BitSet32(0, 0)).toBe(0b1);
    expect(Utils.Q_BitSet32(0b0100, 1)).toBe(0b110);
    expect(Utils.Q_BitSet32(0, 30)).toBe(0b1000000000000000000000000000000);
  });

  it('Q_BitTest32', () => {
    expect(Utils.Q_BitTest32(0b1, 0)).toBe(true);
    expect(Utils.Q_BitTest32(0b0100, 1)).toBe(false);
    expect(Utils.Q_BitTest32(0b1000000000000000000000000000000, 30)).toBe(true);
  });

  it('Q_SetBitScanForward32', () => {
    expect(
      Utils.Q_SetBitScanForward32(0b00000000000000000000000000000000)
    ).toBe(-1);
    expect(
      Utils.Q_SetBitScanForward32(0b00000000000000000000000000000001)
    ).toBe(0);
    expect(
      Utils.Q_SetBitScanForward32(0b10000000000000000000000000000000)
    ).toBe(31);
    expect(
      Utils.Q_SetBitScanForward32(0b10000000000000000000001000000000, 10)
    ).toBe(31);
  });

  it('Q_CRC32', () => {
    expect(Utils.Q_CRC32('string')).toBe(0x61414d56);
    expect(Utils.Q_CRC32('12345678')).toBe(0x651f2550);
  });
});

describe('Conversion utilities', () => {
  it('Q_HexToUInt', () => {
    expect(() => Utils.Q_HexToUInt('')).toThrowError();
    expect(Utils.Q_HexToUInt('0x10')).toBe(16);
    expect(Utils.Q_HexToUInt('A')).toBe(10);
    expect(Utils.Q_HexToUInt('b')).toBe(11);
  });

  it('Q_IntToStr', () => {
    expect(Utils.Q_IntToStr(10)).toBe('10');
    expect(Utils.Q_IntToStr(-1)).toBe('-1');
  });
});

describe('Strings utilities', () => {
  it('Q_CharCount', () => {
    expect(Utils.Q_CharCount('', '')).toBe(0);
    expect(Utils.Q_CharCount('', 'a')).toBe(0);
    expect(Utils.Q_CharCount('a', 'a')).toBe(1);
    expect(Utils.Q_CharCount('abaaa', 'a')).toBe(4);
  });

  it('Q_CompStr', () => {
    expect(Utils.Q_CompStr('', '')).toBe(true);
    expect(Utils.Q_CompStr('a', 'a')).toBe(true);
    expect(Utils.Q_CompStr('A', 'a')).toBe(false);
    expect(Utils.Q_CompStr('a', 'A')).toBe(false);
  });

  it('Q_CopyFrom', () => {
    expect(Utils.Q_CopyFrom('abc', 0)).toBe('abc');
    expect(Utils.Q_CopyFrom('abc', 1)).toBe('bc');
    expect(Utils.Q_CopyFrom('abc', Infinity)).toBe('');
    expect(Utils.Q_CopyFrom('', Infinity)).toBe('');
  });

  it('Q_CopyLeft', () => {
    expect(Utils.Q_CopyLeft('abc', 0)).toBe('');
    expect(Utils.Q_CopyLeft('abc', 1)).toBe('a');
    expect(Utils.Q_CopyLeft('abc', Infinity)).toBe('abc');
    expect(Utils.Q_CopyLeft('', Infinity)).toBe('');
  });

  it('Q_CopyRight', () => {
    expect(Utils.Q_CopyRight('abc', 0)).toBe('');
    expect(Utils.Q_CopyRight('abc', 2)).toBe('bc');
    expect(Utils.Q_CopyRight('abc', Infinity)).toBe('abc');
    expect(Utils.Q_CopyRight('', Infinity)).toBe('');
  });

  it('Q_CopyRange', () => {
    expect(Utils.Q_CopyRange('abc', 0, 0)).toBe('a');
    expect(Utils.Q_CopyRange('abc', 0, 1)).toBe('ab');
    expect(Utils.Q_CopyRange('abc', 1, Infinity)).toBe('bc');
    expect(Utils.Q_CopyRange('', 0, Infinity)).toBe('');
  });

  it('Q_DelChars', () => {
    expect(Utils.Q_DelChars('abccab', 'ac')).toBe('bb');
    expect(Utils.Q_DelChars('abccab', 'a')).toBe('bccb');
    expect(Utils.Q_DelChars('abc', '')).toBe('abc');
    expect(Utils.Q_DelChars('abc', 'aaa')).toBe('bc');
    expect(Utils.Q_DelChars('', 'a')).toBe('');
  });

  it('Q_Delete', () => {
    expect(Utils.Q_Delete('abc', 0, 1)).toBe('bc');
    expect(Utils.Q_Delete('abc', 1, 2)).toBe('a');
    expect(Utils.Q_Delete('abc', 0, Infinity)).toBe('');
    expect(Utils.Q_Delete('', 1, Infinity)).toBe('');
  });

  it('Q_DeleteFirstText', () => {
    expect(Utils.Q_DeleteFirstText('abccab', 'AB')).toBe('ccab');
    expect(Utils.Q_DeleteFirstText('abccab', '')).toBe('abccab');
    expect(Utils.Q_DeleteFirstText('abccab', 'Ab', 1)).toBe('abcc');
    expect(Utils.Q_DeleteFirstText('', 'a')).toBe('');
  });

  it('Q_DeleteFirstStr', () => {
    expect(Utils.Q_DeleteFirstStr('abccab', 'AB')).toBe('abccab');
    expect(Utils.Q_DeleteFirstStr('abccab', '')).toBe('abccab');
    expect(Utils.Q_DeleteFirstStr('abccab', 'ab', 1)).toBe('abcc');
    expect(Utils.Q_DeleteFirstStr('', 'a')).toBe('');
  });

  it('Q_GetWordN', () => {
    expect(Utils.Q_GetWordN(3, 'ab\t\tcd ab')).toBe('ab');
    expect(Utils.Q_GetWordN(1, '')).toBe('');
    expect(Utils.Q_GetWordN(3, 'ab cd')).toBe('');
    expect(Utils.Q_GetWordN(1, 'ab cd', 'c')).toBe('ab ');
    expect(Utils.Q_GetWordN(2, 'ab cd', 'c')).toBe('d');
  });

  it('Q_IsEmptyStr', () => {
    expect(Utils.Q_IsEmptyStr('')).toBe(true);
    expect(Utils.Q_IsEmptyStr('   ')).toBe(true);
    expect(Utils.Q_IsEmptyStr('\t')).toBe(true);
    expect(Utils.Q_IsEmptyStr('a')).toBe(false);
    expect(Utils.Q_IsEmptyStr('a b')).toBe(false);
    expect(Utils.Q_IsEmptyStr('a', 'a')).toBe(true);
    expect(Utils.Q_IsEmptyStr('ab', 'a')).toBe(false);
  });

  it('Q_IsFloat', () => {
    expect(Utils.Q_IsFloat('')).toBe(false);
    expect(Utils.Q_IsFloat('1.0')).toBe(true);
    expect(Utils.Q_IsFloat('0.0')).toBe(true);
    expect(Utils.Q_IsFloat('-1.0')).toBe(true);
    expect(Utils.Q_IsFloat('0')).toBe(false);
    expect(Utils.Q_IsFloat('1e4')).toBe(false);
  });

  it('Q_IsInteger', () => {
    expect(Utils.Q_IsInteger('')).toBe(false);
    expect(Utils.Q_IsInteger('1.0')).toBe(false);
    expect(Utils.Q_IsInteger('0.0')).toBe(false);
    expect(Utils.Q_IsInteger('0')).toBe(true);
    expect(Utils.Q_IsInteger('1e4')).toBe(true);
    expect(Utils.Q_IsInteger('-5')).toBe(true);
  });

  it('Q_IsSubset', () => {
    expect(Utils.Q_IsSubset([], [])).toBe(true);
    expect(Utils.Q_IsSubset([''], ['a', 'b'])).toBe(false);
    expect(Utils.Q_IsSubset(['a'], ['a', 'b'])).toBe(true);
  });

  it('Q_PadRight', () => {
    expect(Utils.Q_PadRight('', 3)).toBe('   ');
    expect(Utils.Q_PadRight('abc', 0)).toBe('abc');
    expect(Utils.Q_PadRight('abc', 0, ' ', true)).toBe('');
    expect(Utils.Q_PadRight('abc', 5)).toBe('abc  ');
    expect(Utils.Q_PadRight('abc', 3)).toBe('abc');
  });

  it('Q_PosLastStr', () => {
    expect(Utils.Q_PosLastStr('abc', 'abc1abc2abc3')).toBe(8);
    expect(Utils.Q_PosLastStr('abc', '')).toBe(-1);
    expect(Utils.Q_PosLastStr('c', 'abc')).toBe(2);
    expect(Utils.Q_PosLastStr('abc', 'abc1abc2abc3', 8)).toBe(4);
    expect(Utils.Q_PosLastStr('.', 'a.b.c', 3)).toBe(1);
    expect(Utils.Q_PosLastStr('abc', 'abc1abc2abc3', 0)).toBe(0);
  });

  it('Q_PosStr', () => {
    expect(Utils.Q_PosStr('abc', 'abc1abc2abc3')).toBe(0);
    expect(Utils.Q_PosStr('abc', '')).toBe(-1);
    expect(Utils.Q_PosStr('c', 'abc')).toBe(2);
    expect(Utils.Q_PosStr('abc', 'abc1abc2abc3', 1)).toBe(4);
    expect(Utils.Q_PosStr('.', 'a.b.c', 4)).toBe(-1);
    expect(Utils.Q_PosStr('abc', 'abc1abc2abc3', 0)).toBe(0);
  });

  it('Q_RemDuplicates_Int32', () => {
    expect(Utils.Q_RemDuplicates_Int32([5, 5, 6, 1, 5, 6, 1, 3])).toEqual([
      5,
      6,
      1,
      3
    ]);
    expect(Utils.Q_RemDuplicates_Int32([])).toEqual([]);
    expect(Utils.Q_RemDuplicates_Int32([1], 1)).toEqual([1]);
  });

  it('Q_ReplaceFirstStr', () => {
    expect(Utils.Q_ReplaceFirstStr('abc1abc2abc3', 'abc', 'xxx')).toBe(
      'xxx1abc2abc3'
    );
    expect(Utils.Q_ReplaceFirstStr('', 'a', 'b')).toBe('');
    expect(Utils.Q_ReplaceFirstStr('abc1abc2abc3', 'Abc', '')).toBe(
      'abc1abc2abc3'
    );
  });

  it('Q_ReplaceStr', () => {
    expect(Utils.Q_ReplaceStr('abc1abc2abc3', 'abc', 'xxx')).toBe(
      'xxx1xxx2xxx3'
    );
    expect(Utils.Q_ReplaceStr('', 'a', 'b')).toBe('');
    expect(Utils.Q_ReplaceStr('abc1abc2abc3', 'Abc', '')).toBe('abc1abc2abc3');
  });

  it('Q_ReplaceText', () => {
    expect(Utils.Q_ReplaceText('abc1Abc2abC3', 'abc', 'xxx')).toBe(
      'xxx1xxx2xxx3'
    );
    expect(Utils.Q_ReplaceText('', 'a', 'b')).toBe('');
    expect(Utils.Q_ReplaceText('abc1abc2abc3', 'Abc', '')).toBe('123');
  });

  it('Q_SameStr', () => {
    expect(Utils.Q_SameStr('abc', 'abc')).toBe(true);
    expect(Utils.Q_SameStr('', '')).toBe(true);
    expect(Utils.Q_SameStr('Abc', 'abc')).toBe(false);
  });

  it('Q_SameText', () => {
    expect(Utils.Q_SameText('abc', 'abc')).toBe(true);
    expect(Utils.Q_SameText('', '')).toBe(true);
    expect(Utils.Q_SameText('Abc', 'abc')).toBe(true);
    expect(Utils.Q_SameText('Abc', 'abc1')).toBe(false);
  });

  it('Q_Sort_Integer', () => {
    const unsorted = [4, 5, 1, 1, 100, -1, 3];
    expect(Utils.Q_Sort_Integer(unsorted)).toEqual([-1, 1, 1, 3, 4, 5, 100]);
    expect(Utils.Q_Sort_Integer([])).toEqual([]);
    expect(unsorted).toEqual(unsorted);
  });

  it('Q_SpaceCompress', () => {
    expect(Utils.Q_SpaceCompress('')).toEqual('');
    expect(Utils.Q_SpaceCompress('a')).toEqual('a');
    expect(Utils.Q_SpaceCompress(' a ')).toEqual('a');
    expect(Utils.Q_SpaceCompress(' a   b \t\t\tc')).toEqual('a b c');
  });

  it('Q_UpperCase', () => {
    expect(Utils.Q_UpperCase('')).toEqual('');
    expect(Utils.Q_UpperCase('a')).toEqual('A');
    expect(Utils.Q_UpperCase('AbC')).toEqual('ABC');
    expect(Utils.Q_UpperCase('A1C')).toEqual('A1C');
  });

  it('Q_LowerCase', () => {
    expect(Utils.Q_LowerCase('')).toBe('');
    expect(Utils.Q_LowerCase('abc')).toBe('abc');
    expect(Utils.Q_LowerCase('ABC')).toBe('abc');
  });

  it('Q_StrToInt', () => {
    expect(Utils.Q_StrToInt('')).toEqual(false);
    expect(Utils.Q_StrToInt('a')).toEqual(false);
    expect(Utils.Q_StrToInt('1a')).toEqual(false);
    expect(Utils.Q_StrToInt('10e1')).toEqual(10);
    expect(Utils.Q_StrToInt('-1.0')).toEqual(false);
    expect(Utils.Q_StrToInt('1')).toEqual(1);
    expect(Utils.Q_StrToInt('-1')).toEqual(-1);
  });

  it('Q_StrToUInt', () => {
    expect(Utils.Q_StrToUInt('')).toEqual(false);
    expect(Utils.Q_StrToUInt('a')).toEqual(false);
    expect(Utils.Q_StrToUInt('1a')).toEqual(false);
    expect(Utils.Q_StrToUInt('10e1')).toEqual(10);
    expect(Utils.Q_StrToUInt('-1.0')).toEqual(false);
    expect(Utils.Q_StrToUInt('1')).toEqual(1);
    expect(Utils.Q_StrToUInt('-1')).toEqual(false);
  });

  it('Q_StrTok', () => {
    expect(Utils.Q_StrTok('')).toEqual({ tok: '', str: '' });
    expect(Utils.Q_StrTok('a b')).toEqual({ tok: 'a', str: ' b' });
    expect(Utils.Q_StrTok('a = b', '=')).toEqual({ tok: 'a ', str: '= b' });
  });

  it('Q_StrTok1', () => {
    expect(Utils.Q_StrTok1('')).toEqual({ tok: '', str: '' });
    expect(Utils.Q_StrTok1('a c')).toEqual({ tok: 'a', str: 'c' });
    expect(Utils.Q_StrTok1('a = b', '=')).toEqual({ tok: 'a ', str: ' b' });
  });

  it('Q_Trim', () => {
    expect(Utils.Q_Trim('')).toEqual('');
    expect(Utils.Q_Trim('a c')).toEqual('a c');
    expect(Utils.Q_Trim(' a ')).toEqual('a');
    expect(Utils.Q_Trim(' \t\ta\t\t ')).toEqual('a');
  });

  it('Q_TrimLeft', () => {
    expect(Utils.Q_TrimLeft('')).toEqual('');
    expect(Utils.Q_TrimLeft('a c')).toEqual('a c');
    expect(Utils.Q_TrimLeft(' a ')).toEqual('a ');
    expect(Utils.Q_TrimLeft(' \t\ta\t\t ')).toEqual('a\t\t ');
  });

  it('Q_UIntToHex', () => {
    expect(Utils.Q_UIntToHex(0, 1)).toEqual('0');
    expect(Utils.Q_UIntToHex(10, 1)).toEqual('a');
    expect(Utils.Q_UIntToHex(16, 0)).toEqual('');
    expect(Utils.Q_UIntToHex(16, 3)).toEqual('010');
  });

  it('Q_WordAtPos', () => {
    expect(Utils.Q_WordAtPos('aaa.bbb', 1, '.')).toEqual('aaa');
    expect(Utils.Q_WordAtPos('aaa.bbb.ccc', 5, '.')).toEqual('bbb');
    expect(Utils.Q_WordAtPos('aaa.bbb.ccc', 3, '.')).toEqual('');
  });
});
