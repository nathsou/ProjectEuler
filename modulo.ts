
// (a ** b) % m
export const modPow = (b: number, e: number, m: number): number => {
  if (e === 0) return 1;
  if (e === 1) return b % m;
  if (m === 1) return 0;

  let res = 1;

  while (e > 0) {
    if (e % 2 === 1) {
      res = (res * b) % m;
    }

    e = e >> 1;
    b = (b ** 2) % m;
  }

  return res;
};

// (a * b) % m
export const modProduct = (a: number, b: number, m: number): number => {
  const amodn = a % m;
  if (amodn === 0) return 0;

  return (amodn * (b % m)) % m;
};

export const modProductB = (a: bigint, b: bigint, mod: bigint): bigint => {
  const amodn = a % mod;
  if (amodn === 0n) return 0n;

  return (amodn * (b % mod)) % mod;
};