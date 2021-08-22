
// a ** b % mod
export const modPow = (a: number, b: number, mod: number): number => {
  if (b === 0) return 1;
  if (b === 1) return a % mod;

  let n = b;
  let p = 1;
  let res = 1;

  while (n !== 0) {
    n = n >> 1;
    res *= (a ** p) % mod;
    p *= 2;
  }

  return res % mod;
};

// a * b % mod
export const modProduct = (a: number, b: number, mod: number): number => {
  const amodn = a % mod;
  if (amodn === 0) return 0;

  return amodn * (b % mod);
};

export const modProductB = (a: bigint, b: bigint, mod: bigint): bigint => {
  const amodn = a % mod;
  if (amodn === 0n) return 0n;

  return amodn * (b % mod);
};