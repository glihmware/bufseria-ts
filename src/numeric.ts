
class BufCtx
{
    public idx: number;
    public buf: Uint8Array;
    public dv: DataView;

    constructor(buf: Uint8Array)
    {
        this.idx = 0;
        this.dv = new DataView(buf.buffer);
        this.buf = buf;
    }

}

// for both signed and unsigned can be the same with pure shift.
// until 32 -> should be ok with pure shifting.
// for 64, if ES2020 -> can use BigInt, if not, put the number into a string...!
// else > check to use the 256*i trick.


function Uint16ToBuf(v: number)
: Uint8Array
{
    let res = new Uint8Array(2);
    let dv = new DataView(res.buffer);
    dv.setUint16(0, v, true);

    console.log(v & 0xff);
    console.log(v >> 8 & 0xff);

    return res;
}

function Int16ToBuf(v: number)
: Uint8Array
{
    let res = new Uint8Array(2);
    let dv = new DataView(res.buffer);
    dv.setInt16(0, v, true);

    console.log(v & 0xff);
    console.log(v >> 8 & 0xff);

    return res;
}


function BufToUint16(ctx: BufCtx)
: number
{
    let res = ctx.dv.getUint16(ctx.idx, true);
    ctx.idx += 2;

    return res;
}

function BufToInt16(ctx: BufCtx)
: number
{
    let res = ctx.dv.getInt16(ctx.idx, true);
    ctx.idx += 2;

    return res;
}

function BufToUint32(ctx: BufCtx)
: number
{
    let res = ctx.dv.getUint32(ctx.idx, true);
    ctx.idx += 4;

    return res;
}

function BufToInt32(ctx: BufCtx)
: number
{
    let res = ctx.dv.getInt32(ctx.idx, true);
    ctx.idx += 4;

    return res;
}

// ES2020...!! NOT THAT PORTABLE YET.
function BufToUint644(ctx: BufCtx)
: bigint
{
    let res = ctx.dv.getBigUint64(ctx.idx, true);
    ctx.idx += 8;

    return res;
}

function BufToUint64(ctx: BufCtx)
: number
{
let b64Buf = ctx.buf.subarray(ctx.idx, ctx.idx + 8);
let res = 0;
b64Buf.forEach((val, i) => { res += val * 256 ** i; });
ctx.idx += 8;
return res;
}


// ES2020...!! NOT THAT PORTABLE YET.
function BufToInt644(ctx: BufCtx)
: bigint
{
    let res = ctx.dv.getBigInt64(ctx.idx, true);
    ctx.idx += 8;

    return res;
}


function BufToInt64(ctx: BufCtx)
: number
{
let b64Buf = ctx.buf.subarray(ctx.idx, ctx.idx + 8);
let res = 0;
    b64Buf.forEach((val, i) => { res += (255 - val) * 256 ** i });
    res = res * -1 - 1;
    ctx.idx += 8;
return res;
}


// max uint16 65535
// max uint32 4294967295

let b;
let dv;

let buf = new Uint8Array([
    252,255,
    252, 255,
    0xFF, 0xFF, 0xFF, 0xFF,
    0x6C, 0x12, 0x94, 0xFE,
    0xA8, 0xFF, 0xFF, 0xFF, 0x63, 0x00, 0x00, 0x00,
    0x3A, 0x00, 0x00, 0x00, 0x9C, 0xFF, 0xFF, 0xFF,
    0x04, 0x41, 0x42, 0x43, 0x44]);
dv = new DataView(buf.buffer);


let ctx = new BufCtx(buf);

console.log(BufToUint16(ctx));
console.log(BufToInt16(ctx));
console.log(BufToUint32(ctx));
console.log(BufToInt32(ctx));
console.log(BufToUint644(ctx));
//console.log(BufToUint64(ctx));
console.log(BufToInt644(ctx));
//console.log(BufToInt64(ctx));


// need decode length -> function for that...!
console.log(ctx.buf[ctx.idx]);
console.log(ctx.buf[ctx.idx+1]);
console.log(ctx.buf[ctx.idx+2]);
console.log(ctx.buf[ctx.idx+3]);
console.log(ctx.buf[ctx.idx+4]);

let lll = ctx.buf.subarray(ctx.idx + 1, ctx.idx + 5)
var string = new TextDecoder("utf-8").decode(lll);
console.log(string)


console.log(Uint16ToBuf(65532));
console.log(Int16ToBuf(65532));
