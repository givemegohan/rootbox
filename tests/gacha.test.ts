import { expect, jest, test } from '@jest/globals';
import * as fs from 'fs';
import { yamlReader } from '../src/yamlreader';
import { normalizeConfig } from '../src/normalization';
import { gacha } from '../src/gacha';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

test("疎通", () => {
  const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
  const parsedData = yamlReader(yamlData);
  const normalizedData = normalizeConfig(parsedData);
  const gachaResults = gacha(normalizedData);
  console.log(JSON.stringify(gachaResults, null, '  '));
  //expect(() => {yamlReader(yamlData);}).not.toThrow();
});

test("10連", () => {
  const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
  const parsedData = yamlReader(yamlData);
  const normalizedData = normalizeConfig(parsedData);
  const gachaResults = gacha(normalizedData, undefined, 10);
  console.log(JSON.stringify(gachaResults, null, '  '));
  //expect(() => {yamlReader(yamlData);}).not.toThrow();
});

test("星4以上のみ10連", () => {
  const yamlData = fs.readFileSync('tests/__data__/gs.yaml', 'utf8');
  const parsedData = yamlReader(yamlData);
  const normalizedData = normalizeConfig(parsedData);
  const gachaResults = gacha(normalizedData, 2, 10);
  console.log(JSON.stringify(gachaResults, null, '  '));
  //expect(() => {yamlReader(yamlData);}).not.toThrow();
});