interface BaseConfig {
    ranks: BaseRank[];
}
interface BaseRank {
    rankId: string;
    tier: number;
    ratio: number;
    collections: BaseCollection[];
}
interface BaseCollection {
    itemId: string;
    ratio: number;
}

interface NormalizedConfig extends BaseConfig {
    ranks: NormalizedRank[];
    ranksRatioSum: bigint;
    globalRatioSum: bigint;
}
interface NormalizedRank extends BaseRank {
    normalizedRatio: bigint;
    collectionRatioSum: bigint;
    collections: NormalizedCollection[];
}
interface NormalizedCollection extends BaseCollection {
    normalizedRatio: bigint;
    globalRatio: bigint;
}

interface DropRates {
    ranks: DropRateRank[];
}
interface DropRateRank {
    rankId: string;
    tier: number;
    dropRate: number;
    collections: DropRateCollection[];
}
interface DropRateCollection {
    itemId: string;
    dropRate: number;
}

interface WeightTable {
    totalWeight: bigint;
    items: WeightItem[];
}
interface WeightItem {
    rankId: string;
    tier: number;
    itemId: string;
    weight: bigint;
    cumulativeWeight: bigint;
}

interface GachaResult {
    rankId: string;
    tier: number;
    itemId: string;
}