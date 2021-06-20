
export const randomIntBetwen = (min: number, max: number, rand = Math.random): number => {
  return min + Math.floor(rand() * (max + 1 - min));
};