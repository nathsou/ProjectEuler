import { map } from "./iters";

export const alphabetIndices = (str: string): number[] => {
    return [...map(str, char => char.charCodeAt(0) - 64)];
};