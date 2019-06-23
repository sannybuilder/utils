import * as voca from 'voca';
import intersection from 'lodash.intersection';
import uniq from 'lodash.uniq';
import crc32 from 'crc-32';

type Char = string;
type CharSet = Char[];
export const Q_SP = /[^\s]+/g;
const DecimalSeparator = '.';

class EConvertError extends Error {}

function strToRe(s: string | RegExp): RegExp {
  return typeof s === 'string' ? new RegExp(`[^${s}]+`, 'g') : s;
}

export function Q_BitReset32(num: number, index: number): number {
  return num & ~(1 << index);
}

export function Q_BitSet32(num: number, index: number): number {
  return num | (1 << index);
}

export function Q_BitTest32(num: number, index: number): boolean {
  return (num >> index) % 2 !== 0;
}

export function Q_SetBitScanForward32(
  num: number,
  firstBit: number = 0
): number {
  for (let i = firstBit; i < 32; i++) {
    if (Q_BitTest32(num, i)) {
      return i;
    }
  }
  return -1;
}

export function Q_CRC32(s: string): number {
  // CRC32/JAMCRC
  return crc32.str(s) ^ -1;
}

export function Q_CharCount(s: string, ch: Char): number {
  return voca.countSubstrings(s, ch);
}

export function Q_CompStr(s1: string, s2: string): boolean {
  return s1 === s2;
}

export function Q_CopyFrom(s: string, start: number): string {
  return voca.substr(s, start);
}

export function Q_CopyLeft(s: string, count: number): string {
  return voca.first(s, count);
}

export function Q_CopyRight(s: string, count: number): string {
  return voca.last(s, count);
}

export function Q_CopyRange(s: string, start: number, stop: number): string {
  return voca.substring(s, start, stop + 1);
}

export function Q_DelChars(s: string, charsToRemove: string): string {
  const re = new RegExp(`[${charsToRemove}]`);
  return voca.replaceAll(s, re, '');
}

export function Q_Delete(s: string, index: number, count: number): string {
  return voca.splice(s, index, count);
}

export function Q_GetWordN(
  OrdN: number,
  s: string,
  delimiters: string | RegExp = Q_SP
): string {
  const re = strToRe(delimiters);

  const words = voca.words(s, re);
  if (words.length >= OrdN) {
    return words[OrdN - 1];
  }
  return '';
}

export function Q_HexToUInt(s: string): number {
  const res = parseInt(s, 16);
  if (isNaN(res)) {
    throw new EConvertError('Hex To Int failed ' + s);
  }
  return res;
}

export function Q_IntToStr(n: number): string {
  return n.toString(10);
}

export function Q_IsEmptyStr(
  s: string,
  emptyChars: string | RegExp = Q_SP
): boolean {
  if (!s || !s.length) {
    return true;
  }
  const re = strToRe(emptyChars);
  return !re.test(s);
}

export function Q_IsFloat(s: string): boolean {
  return !!s && !isNaN(+s) && s.indexOf(DecimalSeparator) !== -1;
}

export function Q_IsInteger(s: string): boolean {
  return !!s && !isNaN(+s) && s.indexOf(DecimalSeparator) === -1;
}

export function Q_IsSubset(leftSet: CharSet, rightSet: CharSet): boolean {
  return intersection(leftSet, rightSet).length === leftSet.length;
}

export function Q_PadRight(
  s: string,
  length: number,
  padCh: Char = ' ',
  cut: boolean = false
): string {
  if (s.length === length) {
    return s;
  }
  if (s.length > length && cut) {
    return Q_CopyLeft(s, length);
  }
  return voca.padRight(s, length, padCh);
}

export function Q_PosLastStr(
  findString: string,
  sourceString: string,
  lastPos: number = sourceString.length
): number {
  return voca.lastIndexOf(sourceString, findString, lastPos - 1);
}

export function Q_PosStr(
  findString: string,
  sourceString: string,
  startPos: number = 0
): number {
  return voca.indexOf(sourceString, findString, startPos);
}

export function Q_RemDuplicates_Int32(
  arr: number[],
  count: number = arr.length
): number[] {
  return uniq(arr);
}

function replace(
  s: string,
  findString: RegExp,
  replaceString: string,
  startPos: number = 0
): string {
  const leftChunk = Q_CopyLeft(s, startPos);
  const rightChunk = Q_CopyFrom(s, startPos);
  return leftChunk + voca.replace(rightChunk, findString, replaceString);
}

export function Q_DeleteFirstText(
  s: string,
  subStrToDel: string,
  startPos: number = 0
): string {
  const re = new RegExp(subStrToDel, 'i');
  return replace(s, re, '', startPos);
}

export function Q_DeleteFirstStr(
  s: string,
  subStrToDel: string,
  startPos: number = 0
): string {
  const re = new RegExp(subStrToDel);
  return replace(s, re, '', startPos);
}

export function Q_ReplaceFirstStr(
  s: string,
  findString: string,
  replaceString: string,
  startPos: number = 0
): string {
  return replace(s, new RegExp(findString), replaceString, startPos);
}

export function Q_ReplaceStr(
  s: string,
  findString: string,
  replaceString: string,
  startPos: number = 0
): string {
  const re = new RegExp(findString, 'g');
  return replace(s, re, replaceString, startPos);
}

export function Q_ReplaceText(
  s: string,
  findString: string,
  replaceString: string,
  startPos: number = 0
): string {
  const re = new RegExp(findString, 'gi');
  return replace(s, re, replaceString, startPos);
}

export function Q_SameStr(s1: string, s2: string): boolean {
  return s1 === s2;
}

export function Q_SameText(s1: string, s2: string): boolean {
  return Q_SameStr(voca.lowerCase(s1), voca.lowerCase(s2));
}

export function Q_Sort_Integer(
  arrPtr: number[],
  count: number = arrPtr.length
): number[] {
  const copy = [...arrPtr];
  copy.sort((a, b) => a - b);
  return copy;
}

export function Q_SpaceCompress(s: string): string {
  return replace(Q_Trim(s), new RegExp('\\s+', 'g'), ' ');
}

// export function Q_StrLower(s: string): string {
//   return voca.lowerCase(s);
// }

// export function Q_StrUpper(s: string): string {
//   return voca.upperCase(s);
// }

export function Q_UpperCase(s: string): string {
  return voca.upperCase(s);
}

export function Q_LowerCase(s: string): string {
  return voca.lowerCase(s);
}

export function Q_StrToInt(s: string): number | false {
  if (Q_IsInteger(s)) {
    return parseInt(s, 10);
  }
  return false;
}

export function Q_StrToUInt(s: string): number | false {
  const res = Q_StrToInt(s);
  return res < 0 ? false : res;
}

export function Q_StrTok(
  s: string,
  delimiters: string | RegExp = Q_SP
): { tok: string; str: string } {
  const re = strToRe(delimiters);
  const words = voca.words(s, re);
  return {
    tok: words[0] || '',
    str: Q_DeleteFirstText(s, words[0])
  };
}

export function Q_StrTok1(
  s: string,
  delimiters: string | RegExp = Q_SP
): { tok: string; str: string } {
  const { tok, str } = Q_StrTok(s, delimiters);
  return { tok, str: Q_CopyFrom(str, 1) };
}

export function Q_TablePosText(
  s: string,
  delimiters: string | RegExp = Q_SP
): { tok: string; str: string } {
  const { tok, str } = Q_StrTok(s, delimiters);
  return { tok, str: Q_CopyFrom(str, 1) };
}

export function Q_Trim(s: string): string {
  return voca.trim(s);
}

export function Q_TrimLeft(s: string): string {
  return voca.trimLeft(s);
}

export function Q_UIntToHex(s: number, digits: number): string {
  const res = s.toString(16);
  if (res.length > digits) {
    return Q_CopyRight(res, digits);
  } else if (res.length < digits) {
    return voca.padLeft(res, digits, '0');
  }
  return res;
}

export function Q_WordAtPos(
  s: string,
  pos: number,
  delimiters: string | RegExp = Q_SP
): string {
  const re = strToRe(delimiters);

  if (pos >= 0 && pos < s.length && s[pos].match(re)) {
    let p1 = pos - 1;
    let p2 = pos;

    while (p1 >= 0 && s[p1].match(re)) {
      p1--;
    }
    while (p2 < s.length && s[p2].match(re)) {
      p2++;
    }

    return Q_CopyRange(s, p1 + 1, p2 - 1);
  }

  return '';
}
