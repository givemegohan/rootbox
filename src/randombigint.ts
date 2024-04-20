import { randomBytes } from 'crypto';

export function randomBigInt(min: bigint, max: bigint): bigint {
    // 最小値と最大値の差を計算
    const range = max - min;
    if (range <= 0n) {
        throw new Error("Invalid range: max must be greater than min");
    }

    // rangeを2進数表現の桁数に変換
    let numBits = range.toString(2).length;

    // 乱数生成のためのバイト数を計算
    const numBytes = Math.ceil(numBits / 8);

    // 最大許容値を計算
    const maxAllowed = (1n << BigInt(numBits)) - 1n;

    // 乱数を生成して、最大値を超える場合は再試行する
    let randomValue;
    do {
        const randomBytesBuffer = randomBytes(numBytes);
        randomValue = BigInt(`0x${randomBytesBuffer.toString('hex')}`) & maxAllowed;
    } while (randomValue > range);

    // 最小値に乱数を加算して返す
    return min + randomValue;
}