import { expect, jest, test } from '@jest/globals';
import * as fs from 'fs';
import { yamlReader } from '../src/yamlreader';
import { normalizeConfig } from '../src/normalization';
import { getDropRates } from '../src/getdroprates';

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

test("疎通", () => {
    const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
    const parsedData = yamlReader(yamlData);
    const normalizedData = normalizeConfig(parsedData);
    const dropRates = getDropRates(normalizedData);
    console.log(JSON.stringify(dropRates, null, '  '));
    //expect(() => {yamlReader(yamlData);}).not.toThrow();
});

test("星4確定", () => {
    const yamlData = fs.readFileSync('tests/__data__/gs.yaml', 'utf8');
    const parsedData = yamlReader(yamlData);
    const normalizedData = normalizeConfig(parsedData);
    const dropRates = getDropRates(normalizedData, 2);
    console.log(JSON.stringify(dropRates, null, '  '));
    //expect(() => {yamlReader(yamlData);}).not.toThrow();
});

test("高精度", () => {
    const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
    const parsedData = yamlReader(yamlData);
    const normalizedData = normalizeConfig(parsedData);
    const dropRates = getDropRates(normalizedData, undefined, 15);
    console.log(JSON.stringify(dropRates, null, '  '));
    //expect(() => {yamlReader(yamlData);}).not.toThrow();
});