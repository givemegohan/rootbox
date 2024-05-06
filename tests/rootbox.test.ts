import { expect, jest, test } from '@jest/globals';
import * as fs from 'fs';
import { Rootbox } from '../src/rootbox';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

describe('ガチャ', () => {
  test("ガチャ疎通", () => {
    const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
    const rootbox = new Rootbox(yamlData);
    expect(() => { rootbox.gacha(); }).not.toThrow();
  });

  test("ガチャ10連", () => {
    const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
    const rootbox = new Rootbox(yamlData);
    expect(() => { rootbox.gacha(undefined, 10); }).not.toThrow();
  });

  test("ガチャ星4以上のみ10連", () => {
    const yamlData = fs.readFileSync('tests/__data__/gs.yaml', 'utf8');
    const rootbox = new Rootbox(yamlData);
    expect(() => { rootbox.gacha(2, 10); }).not.toThrow();
  });
});

describe("確率表", () => {
  test("確率疎通", () => {
    const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
    const rootbox = new Rootbox(yamlData);
    expect(() => { rootbox.getDropRates(); }).not.toThrow();
  });

  test("確率星4確定", () => {
    const yamlData = fs.readFileSync('tests/__data__/gs.yaml', 'utf8');
    const rootbox = new Rootbox(yamlData);
    expect(() => { rootbox.getDropRates(2); }).not.toThrow();
  });

  test("確率高精度", () => {
    const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
    const rootbox = new Rootbox(yamlData);
    expect(() => { rootbox.getDropRates(undefined, 15); }).not.toThrow();
  });
});

describe("部品エラーケース", () => {
  test("YAML不正", () => {
    const yamlData = fs.readFileSync('tests/__data__/errorfield.yaml', 'utf8');
    expect(() => { new Rootbox(yamlData); }).toThrow();
  });
});