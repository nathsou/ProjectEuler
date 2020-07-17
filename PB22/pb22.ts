import { sum } from '../Utils/math';
import { consume, words } from '../Utils/streams';

const pb22 = async () => {
    const names = [...await consume(words('names.txt'))].sort();

    const stringScore = (str: string): number => {
        let score = 0;
        for (const char of str) {
            score += char.charCodeAt(0) - 64;
        }

        return score;
    };

    const scores = names.map((name, pos) => stringScore(name) * (pos + 1));

    return sum(scores);
};

(async () => {
    console.log(await pb22());
})();

