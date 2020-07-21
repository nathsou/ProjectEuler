import { map, It } from "./iters";

export const alphabetIndices = (str: string): number[] => {
    return [...map(str, char => char.charCodeAt(0) - 64)];
};

export const ascii = (str: string): It<number> => {
    return map(str, char => char.charCodeAt(0));
};