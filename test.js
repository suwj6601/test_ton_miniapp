import { toNano } from "@ton/ton";

const test = toNano((Number(0.1) / 100000).toString());
console.log(test);
