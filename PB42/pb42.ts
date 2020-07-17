import { map } from '../Utils/asyncIters';
import { compose } from '../Utils/functions';
import { count, max, takeWhile } from '../Utils/iters';
import { sum, triangles } from '../Utils/math';
import { consume, words } from '../Utils/streams';
import { alphabetIndices } from '../Utils/strings';

const pb42 = async () => {
    const ws = await consume(map(words('words.txt'), compose(sum, alphabetIndices)));
    const maxWord = max(ws).value;
    const tris = new Set([...takeWhile(triangles(), tri => tri < maxWord)]);
    return count(ws, w => tris.has(w));
};

(async () => {
    console.log(await pb42());
})();