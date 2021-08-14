import { uniq } from "../Utils/arrays";
import { all, filter, len, map, pairs, range } from "../Utils/iters";
import { combinations } from "../Utils/permutations";

const squares = [[0, 1], [0, 4], [0, 9], [1, 6], [2, 5], [3, 6], [4, 9], [6, 4], [8, 1]];

const hasDigit = (arrangement: Set<number>, d: number): boolean => {
  if (d === 6 || d === 9) return arrangement.has(6) || arrangement.has(9);
  return arrangement.has(d);
};

const isValidArrangement = ([as, bs]: [Set<number>, Set<number>]) =>
  all(squares, ([a, b]) => (hasDigit(as, a) && hasDigit(bs, b)) || (hasDigit(bs, a) && hasDigit(as, b)));

const hash = ([as, bs]: [Set<number>, Set<number>]): string => {
  const hasha = [...as].sort((a, b) => a - b).join('');
  const hashb = [...bs].sort((a, b) => a - b).join('');

  return hasha < hashb ? `${hasha}:${hashb}` : `${hashb}:${hasha}`;
};

const pb90 = () => {
  const arrangements = [...map(combinations(range(0, 9), 6), vals => new Set(vals))];
  return len(uniq(filter(pairs(arrangements, arrangements), isValidArrangement), hash));
};

console.log(pb90());