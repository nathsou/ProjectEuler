import { groupBy, insertMapArray } from "../Utils/arrays";
import { occurences } from "../Utils/functions";
import { all, filter, map, max, takeWhile, zip } from "../Utils/iters";
import { squares } from "../Utils/math";
import { consume, words } from "../Utils/streams";
import { chars } from "../Utils/strings";

const collectAnagrams = (words: string[]): string[][] => {
  const hash = (word: string) => chars(word).sort().join('');
  const anagrams = new Map<string, string[]>();

  words.forEach(word => {
    insertMapArray(anagrams, hash(word), word);
  });

  return [...filter(anagrams.values(), ws => ws.length > 1)];
};

const substitution = (a: string, b: string): Map<string, string> => {
  const subst = new Map<string, string>();
  for (const [c1, c2] of zip(chars(a), chars(b))) {
    subst.set(c1, c2);
  }

  return subst;
};

const substitute = (word: string, subst: Map<string, string>): string => {
  return [...map(chars(word), c => subst.get(c))].join('');
};

const pb98 = async () => {
  const ws = await consume(words('p098_words.txt'));
  const anagramsByLen = groupBy(collectAnagrams(ws), ([word]) => word.length);
  const longestAnagram = max(anagramsByLen.keys()).value;
  const sqs = [...takeWhile(map(squares(), n => `${n}`), n => n.length <= longestAnagram)];
  const anagramicSquaresByLen = groupBy(collectAnagrams(sqs), ([s]) => s.length);

  // only keep anagramic squares with non-repeating digits
  for (const [key, squares] of anagramicSquaresByLen) {
    anagramicSquaresByLen.set(
      key,
      [...filter(squares, ([a]) => all(occurences(chars(a)).values(), t => t.length === 1))]
    );
  }

  let largestSquare = 0;

  for (const [length, anagrams] of anagramsByLen) {
    for (const group of anagramicSquaresByLen?.get(length) ?? []) {
      for (const square of group) {
        for (const [anagram1, anagram2] of anagrams) {
          const subst1 = substitution(anagram1, `${square}`);
          const s1 = substitute(anagram2, subst1);

          if (group.includes(s1)) {
            largestSquare = Math.max(largestSquare, parseInt(s1), parseInt(square));
          }

          const subst2 = substitution(anagram2, `${square}`);
          const s2 = substitute(anagram1, subst2);

          if (group.includes(s2)) {
            largestSquare = Math.max(largestSquare, parseInt(s2), parseInt(square));
          }
        }
      }
    }
  }

  return largestSquare;
};

(async () => {
  console.log(await pb98());
})();