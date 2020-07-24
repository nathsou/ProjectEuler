import { cubes } from "../Utils/math";

const pb62 = (m = 5) => {
    const memo = new Map<string, number[]>();
    let len = 1;

    for (const c of cubes()) {
        const key = `${c}`.split('').sort().join('');
        if (key.length > len) {
            len = key.length;
            memo.clear();
        }

        if (!memo.has(key)) {
            memo.set(key, [c]);
        } else {
            const perms = memo.get(key);
            perms.push(c);
            if (perms.length === m) {
                return perms[0];
            }
        }
    }
};

console.log(pb62());