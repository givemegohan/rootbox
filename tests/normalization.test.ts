import { expect, jest, test } from '@jest/globals';
import * as fs from 'fs';
import { yamlReader } from '../src/yamlreader';
import { normalizeConfig } from '../src/normalization';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

test("疎通", () => {
  const yamlData = fs.readFileSync('tests/__data__/basic.yaml', 'utf8');
  const parsedData = yamlReader(yamlData);
  const normalizedData = normalizeConfig(parsedData);
  console.log(JSON.stringify(normalizedData, null, '  '));
  //expect(() => {yamlReader(yamlData);}).not.toThrow();
});