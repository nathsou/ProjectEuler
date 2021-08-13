import { lss } from "../Utils/functions";
import { map, takeWhile } from "../Utils/iters";
import { primes } from "../Utils/primes";

const pb87 = (N = 50 * 10 ** 6) => {
  const power2 = [...takeWhile(map(primes(), n => n ** 2), lss(N))];
  const power3 = [...takeWhile(map(primes(), n => n ** 3), lss(N))];
  const power4 = [...takeWhile(map(primes(), n => n ** 4), lss(N))];

  const nums = new Set<number>();

  for (const a of power2) {
    loopA:
    for (const b of power3) {
      const ab = a + b;
      if (ab > N) break loopA;
      loopB:
      for (const c of power4) {
        const abc = ab + c;
        if (abc > N) break loopB;
        nums.add(abc);
      }
    }
  }

  return nums.size;
};

console.log(pb87());