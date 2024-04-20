import { expect, jest, test } from '@jest/globals';
import { randomBigInt } from '../src/randombigint';

test("疎通", () => {
  expect(() => { randomBigInt(0n, 100n); }).not.toThrow();
});

test("巨大数", () => {
  expect(() => { randomBigInt(0n, 10000000000000000000000000000000000000000000000000000n); }).not.toThrow();
});

test("min指定", () => {
  expect(() => { randomBigInt(10000000000000000000000000000000000000000000000000000n, 10000000000000000000000000000000000000000000000000100n); }).not.toThrow();
});

test("指定ミス", () => {
  expect(() => { randomBigInt(10000000000000000000000000000010000000000000000000000n, 10000000000000000000000000000000000000000000000000100n); }).toThrow();
});