import { uniq } from "../Utils/arrays";
import { filter, len, quadruplets, range } from "../Utils/iters";
import { Vec2, Vec3 } from "../Utils/vectors";

const hash = ([x1, y1, x2, y2]: [number, number, number, number]): string => {
  const hash1 = `${x1}:${y1}`;
  const hash2 = `${x2}:${y2}`;

  return hash1 < hash2 ? `${hash1}:${hash2}` : `${hash2}:${hash1}`;
};

const triangleArea = ([x1, y1]: Vec2, [x2, y2]: Vec2): number => {
  return 0.5 * Vec3.len(Vec3.cross([x1, y1, 0], [x2, y2, 0]));
};

const pb91 = (n = 50) => {
  const coords = quadruplets(range(0, n), range(0, n), range(0, n), range(0, n));
  return len(uniq(filter(coords, ([x1, y1, x2, y2]) => {
    const OP: Vec2 = [x1, y1];
    const OQ: Vec2 = [x2, y2];
    const PQ = Vec2.sub(OQ, OP);
    const isTriangle = triangleArea(OP, OQ) > 0;

    return isTriangle && (Vec2.dot(OP, OQ) === 0 || Vec2.dot(OP, PQ) === 0 || Vec2.dot(PQ, OQ) === 0);
  }), hash));
};

console.log(pb91());