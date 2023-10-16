export function concatTypedArrays(a: any, b: any) {
    var c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}

export const uint8toBytes = (num: number) => {
    let b = new ArrayBuffer(1);
    new DataView(b).setUint8(0, num);
    return new Uint8Array(b);
}

export const uint16toBytes = (num: number) => {
    let b = new ArrayBuffer(2);
    new DataView(b).setUint16(0, num);
    return new Uint8Array(b);
}

export const uint32toBytes = (num: number) => {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return new Uint8Array(b);
}

export function bigintToBuffer(bigintValue: bigint, byteLength: number) {
    if (bigintValue >= 0n) {
        // Convert BigInt to hexadecimal string
        let hexString = bigintValue.toString(16); 
        // Calculate padding
        const padding = byteLength * 2 - hexString.length; 
        // Add leading zeros for padding
        for (let i = 0; i < padding; i++) {
            hexString = '0' + hexString;
        }
        // Create Buffer from padded hexadecimal string
        return Buffer.from(hexString, 'hex'); 
    } else {
        // Handle negative BigInt
        const twosComplement = (BigInt(1) << BigInt(byteLength * 8)) + bigintValue;
        return bigintToBuffer(twosComplement, byteLength);
    }
}
