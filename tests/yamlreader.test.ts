import { expect, jest, test } from '@jest/globals';
import * as fs from 'fs';
import { yamlReader } from '../src/yamlreader';

test("疎通", () => {
  const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
  expect(() => { yamlReader(yamlData); }).not.toThrow();
});

test("不正フィールド", () => {
  const yamlData = fs.readFileSync('tests/__data__/errorfield.yaml', 'utf8');
  expect(() => { yamlReader(yamlData); }).toThrow();
});