
import * as yaml from 'yaml';
import Ajv, { JSONSchemaType } from 'ajv';

export function yamlReader(yamlData: string): BaseConfig {

    // YAMLをパースする
    const parsedData = yaml.parse(yamlData);

    // JSON Schema
    const schema: JSONSchemaType<BaseConfig> = {
        type: 'object',
        properties: {
            ranks: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        rankId: { type: 'string' },
                        tier: { type: 'number' },
                        ratio: { type: 'number' },
                        collections: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    itemId: { type: 'string' },
                                    ratio: { type: 'number' }
                                },
                                "additionalProperties": false,
                                required: ['itemId', 'ratio']
                            }
                        }
                    },
                    "additionalProperties": false,
                    required: ['rankId', 'tier', 'ratio', 'collections']
                }
            }
        },
        "additionalProperties": false,
        required: ['ranks']
    };

    // JSON Schemaのバリデーション器を作成
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    // バリデーションを実行
    const isValid = validate(parsedData);
    if (!isValid) {
        throw new Error('Invalid configuration\n' + JSON.stringify(validate.errors, null, '  '));
    }
    return parsedData;
}