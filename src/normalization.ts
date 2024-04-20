export function normalizeConfig(input: BaseConfig): NormalizedConfig {
    const normalizedRanks: NormalizedRank[] = input.ranks.map((baseRank) => {
        const normalizedCollections: NormalizedCollection[] = baseRank.collections.map((baseCollection) => {
            return {
                ...baseCollection,
                normalizedRatio: 0n,
                globalRatio: 0n
            };
        });

        return {
            ...baseRank,
            normalizedRatio: 0n,
            collectionRatioSum: 0n,
            collections: normalizedCollections
        };
    });

    const output: NormalizedConfig = { ranks: normalizedRanks, ranksRatioSum: 0n, globalRatioSum: 0n };

    // collectionsのnormalizedRatioとsumを求める
    for (const rank of output.ranks) {
        // 小数を補整するための倍数を求める
        const maxDecimalPlaces = rank.collections.reduce((maxDigits, item) => {
            const decimalPlaces = item.ratio.toString().split('.')[1]?.length || 0;
            return Math.max(maxDigits, decimalPlaces);
        }, 0);
        const ratioMultiplier = 10 ** maxDecimalPlaces;;

        // 最小比にするための最大公約数を求める
        const gcdValue: bigint = rank.collections.reduce((prev, current) => gcd(prev, BigInt(current.ratio * ratioMultiplier)), 0n);

        // 最終結果を求める
        const convertedCollections = rank.collections.map(item => {
            const convertedRatio = BigInt(item.ratio * ratioMultiplier) / gcdValue;
            return { ...item, normalizedRatio: convertedRatio };
        });

        rank.collections = convertedCollections;
        rank.collectionRatioSum = rank.collections.reduce((sum, item) => sum += item.normalizedRatio, 0n);
    }

    // ranksのnormalizedRatioとsumを求める
    // 小数を補整するための倍数を求める
    const maxDecimalPlaces = output.ranks.reduce((maxDigits, item) => {
        const decimalPlaces = item.ratio.toString().split('.')[1]?.length || 0;
        return Math.max(maxDigits, decimalPlaces);
    }, 0);
    const ratioMultiplier = 10 ** maxDecimalPlaces;

    // 最小比にするための最大公約数を求める
    const gcdValue: bigint = output.ranks.reduce((prev, current) => gcd(prev, BigInt(current.ratio * ratioMultiplier)), 0n);

    // 最終結果を求める
    const convertedRanks = output.ranks.map(item => {
        const convertedRatio = BigInt(item.ratio * ratioMultiplier) / gcdValue;
        return { ...item, normalizedRatio: convertedRatio };
    });

    output.ranks = convertedRanks;
    output.ranksRatioSum = output.ranks.reduce((sum, item) => sum += item.normalizedRatio, 0n);

    // globalRatioを求める
    // まず整数化するための倍数を求める
    const lcmValue = output.ranksRatioSum * output.ranks.reduce((prev, current) => lcm(prev, current.collectionRatioSum), 1n);

    // 全ての比率を調整する
    let globalSum: bigint = 0n
    for (const rank of output.ranks) {
        const globalCollections = rank.collections.map(item => {
            const globalRatio = item.normalizedRatio * lcmValue / rank.collectionRatioSum * rank.normalizedRatio / output.ranksRatioSum;
            return { ...item, globalRatio: globalRatio };
        });
        rank.collections = globalCollections;
        globalSum += rank.collections.reduce((sum, item) => sum += item.globalRatio, 0n);
    }
    output.globalRatioSum = globalSum;

    return output;
}

function gcd(a: bigint, b: bigint): bigint {
    if (b === 0n) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

function lcm(a: bigint, b: bigint): bigint {
    const g = (n: bigint, m: bigint): bigint => m ? g(m, n % m) : n;
    return a * b / g(a, b);
}
