import { expect, jest, test } from '@jest/globals';
import * as fs from 'fs';
import { yamlReader } from '../src/yamlreader';
import { normalizeConfig } from '../src/normalization';
import { getDropRates } from '../src/getdroprates';
import { gacha } from '../src/gacha';

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

interface measurement {
    calcRate : number;
    execCount : number;
    execRate : number;
}

test("10万回テスト", () => {
    const yamlData = fs.readFileSync('tests/__data__/gs.yaml', 'utf8');
    const parsedData = yamlReader(yamlData);
    const normalizedData = normalizeConfig(parsedData);
    const dropRates = getDropRates(normalizedData);
    const gachaResults = gacha(normalizedData, undefined, 100000);
    let rankMeasurement: {[key: string]: measurement} = {};
    let itemMeasurement: {[key: string]: measurement} = {};
    for (const rank of dropRates.ranks) {
        rankMeasurement[rank.rankId] = {calcRate: rank.dropRate, execCount: 0, execRate: 0};
        for (const collection of rank.collections) {
            itemMeasurement[collection.itemId] = {calcRate: collection.dropRate, execCount: 0, execRate: 0};
        }
    }
    for (const gache of gachaResults) {
        rankMeasurement[gache.rankId].execCount++;
        itemMeasurement[gache.itemId].execCount++;
    }
    for (const rank of Object.values(rankMeasurement)) {
        rank.execRate = rank.execCount / 100000;
    }
    for (const item of Object.values(itemMeasurement)) {
        item.execRate = item.execCount / 100000;
    }
    console.log(JSON.stringify(itemMeasurement, null, '  '));
    console.log(JSON.stringify(rankMeasurement, null, '  '));

});

test("星4確定10万回テスト", () => {
    const yamlData = fs.readFileSync('tests/__data__/gs.yaml', 'utf8');
    const parsedData = yamlReader(yamlData);
    const normalizedData = normalizeConfig(parsedData);
    const dropRates = getDropRates(normalizedData, 2);
    const gachaResults = gacha(normalizedData, 2, 100000);
    let rankMeasurement: {[key: string]: measurement} = {};
    let itemMeasurement: {[key: string]: measurement} = {};
    for (const rank of dropRates.ranks) {
        rankMeasurement[rank.rankId] = {calcRate: rank.dropRate, execCount: 0, execRate: 0};
        for (const collection of rank.collections) {
            itemMeasurement[collection.itemId] = {calcRate: collection.dropRate, execCount: 0, execRate: 0};
        }
    }
    for (const gache of gachaResults) {
        rankMeasurement[gache.rankId].execCount++;
        itemMeasurement[gache.itemId].execCount++;
    }
    for (const rank of Object.values(rankMeasurement)) {
        rank.execRate = rank.execCount / 100000;
    }
    for (const item of Object.values(itemMeasurement)) {
        item.execRate = item.execCount / 100000;
    }
    console.log(JSON.stringify(itemMeasurement, null, '  '));
    console.log(JSON.stringify(rankMeasurement, null, '  '));

});