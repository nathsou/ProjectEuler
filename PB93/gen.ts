import { writeFile } from "fs/promises";
import { join } from "path";
import { first, uniq } from "../Utils/arrays";
import { filter, flatMap, map, range } from "../Utils/iters";
import { permutations } from "../Utils/permutations";

const isValid = (perm: string[]): boolean => {
  let stackSize = 0;

  for (const symb of perm) {
    if (symb >= 'a' && symb <= 'd') {
      stackSize++;
    } else {
      if (stackSize < 2) {
        return false;
      }

      stackSize--;
    }
  }

  return stackSize === 1;
};

const showPerm = (perm: string[]): string => {
  const stack: string[] = [];

  for (const symb of perm) {
    if (symb >= 'a' && symb <= 'd') {
      stack.push(symb);
    } else {
      const b = stack.pop();
      const a = stack.pop();

      // if the operator is commutative
      if (symb === '+' || symb === '*') {
        const [a_, b_] = [a, b].sort((a, b) => a < b ? -1 : (a === b) ? 0 : 1);
        stack.push(`(${a_} ${symb} ${b_})`);
      } else {
        stack.push(`(${a} ${symb} ${b})`);
      }
    }
  }

  return first(stack);
};

const digitToSymb = {
  '0': '+',
  '1': '-',
  '2': '*',
  '3': '/'
};

const operators = map(range(0, parseInt('333', 4)), n => n.toString(4).padStart(3, '0').split('').map(op => digitToSymb[op]));

const choices = 'export const expressions: ((a: number, b: number, c: number, d: number) => number)[] = [\n' + uniq(map(
  filter(flatMap(operators, ops => permutations(['a', 'b', 'c', 'd', ...ops])), isValid),
  perm => ` (a, b, c, d) => ${showPerm(perm)}`
)).join(',\n') + '\n];';

(async () => {
  await writeFile(join(__dirname, '/expressions.ts'), choices);
})();