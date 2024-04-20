
import { randomBigInt } from './randombigint';

export function gacha(config: NormalizedConfig, minTier: number = NaN, count: number = 1): GachaResult[] {
    const weightTable = getWeightTable(config, minTier);
    let result: GachaResult[] = [];
    for (let i = 0; i < count; i++) {
        const targetWeight = randomBigInt(1n, weightTable.totalWeight);
        result.push(binarySearch(weightTable, targetWeight));
    }

    return result;
}

function getWeightTable(config: NormalizedConfig, minTier: number = NaN): WeightTable {
    let totalWeight: bigint;
    if (isNaN(minTier)) {
        totalWeight = config.globalRatioSum;
    }
    else {
        totalWeight = config.ranks.reduce((sum, item) => {
            if (item.tier <= minTier) {
                return sum + item.collections.reduce((csum, citem) => csum += citem.globalRatio, 0n);
            }
            else {
                return sum;
            }
        }, 0n);
    }

    let cumulativeWeight: bigint = 0n;
    let items: WeightItem[] = [];
    items = config.ranks.filter((rank) => isNaN(minTier) || rank.tier <= minTier).reduce((prev, cur) => {
        const itemsInRank: WeightItem[] = cur.collections.map((collection) => {
            cumulativeWeight += collection.globalRatio;
            return {
                rankId: cur.rankId,
                tier: cur.tier,
                itemId: collection.itemId,
                weight: collection.globalRatio,
                cumulativeWeight: cumulativeWeight
            }
        })
        return prev.concat(itemsInRank);
    }, items);

    return { totalWeight: totalWeight, items: items }
}

function binarySearch(table: WeightTable, targetWeight: bigint): WeightItem {
    let left = 0;
    let right = table.items.length - 1;
    let result = null;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const low = (mid > 0) ? table.items[mid-1].cumulativeWeight : 0;
        const high = table.items[mid].cumulativeWeight;

        if (low <= targetWeight && targetWeight < high){
            result = table.items[mid];
            break;
        }
        else if (high <= targetWeight) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if (result == null) {
        throw new Error('binarySearch error');
    }

    return result;
}