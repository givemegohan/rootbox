export function getDropRates(config: NormalizedConfig, minTier: number = NaN, precision: number = 10): DropRates {
    let globalRatioSum: bigint;
    if (isNaN(minTier)) {
        globalRatioSum = config.globalRatioSum;
    }
    else {
        globalRatioSum = config.ranks.reduce((sum, item) => {
            if (item.tier <= minTier) {
                return sum + item.collections.reduce((csum, citem) => csum += citem.globalRatio, 0n);
            }
            else {
                return sum;
            }
        }, 0n);
    }

    let ranksRatioSum: bigint;
    if (isNaN(minTier)) {
        ranksRatioSum = config.ranksRatioSum;
    }
    else {
        ranksRatioSum = config.ranks.reduce((sum, item) => {
            return item.tier <= minTier ? sum + item.normalizedRatio : sum;
        }, 0n);
    }

    const dropRateRanks: DropRateRank[] = config.ranks.filter((rank) => isNaN(minTier) || rank.tier <= minTier).map((rank) => {
        const dropRateCollections: DropRateCollection[] = rank.collections.map((collection) => {
            return {
                itemId: collection.itemId,
                dropRate: divideBigint(collection.globalRatio, globalRatioSum, precision)
            }
        });

        return {
            rankId: rank.rankId,
            tier: rank.tier,
            dropRate: divideBigint(rank.normalizedRatio, ranksRatioSum, precision),
            collections: dropRateCollections
        };
    });

    return { ranks: dropRateRanks };
}

function divideBigint(a: bigint, b: bigint, prec: number): number {
    const power: number = 10 ** prec;
    return Number((a * BigInt(power)) / b) / (power);
}