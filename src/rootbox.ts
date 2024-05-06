import { yamlReader } from './yamlreader';
import { normalizeConfig } from './normalization';
import { gacha } from './gacha';
import { getDropRates } from './getdroprates';

export class Rootbox {
    private bConfig: BaseConfig
    private nConfig: NormalizedConfig

    constructor(yaml: string) {
        this.bConfig = yamlReader(yaml);
        this.nConfig = normalizeConfig(this.bConfig);
    }

    getDropRates(minTier: number = NaN, precision: number = 10): DropRates {
        return getDropRates(this.nConfig, minTier, precision);
    }

    gacha(minTier: number = NaN, count: number = 1): GachaResult[] {
        return gacha(this.nConfig, minTier, count);
    }
}