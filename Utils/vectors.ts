
export type Vec2 = [number, number];

export const Vec2 = {
  from: (x: number, y: number): Vec2 => [x, y],
  add: ([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2 => [x1 + x2, y1 + y2],
  sub: ([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2 => [x1 - x2, y1 - y2],
  len: ([x, y]: Vec2) => Math.sqrt(x * x + y * y),
  dot: ([x1, y1]: Vec2, [x2, y2]: Vec2) => x1 * x2 + y1 * y2,
};

export type Vec3 = [number, number, number];

export const Vec3 = {
  from: (x: number, y: number, z: number): Vec3 => [x, y, z],
  add: ([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Vec3 => [x1 + x2, y1 + y2, z1 + z2],
  sub: ([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Vec3 => [x1 - x2, y1 - y2, z1 - z2],
  len: ([x, y, z]: Vec3) => Math.sqrt(x * x + y * y + z * z),
  dot: ([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3) => x1 * x2 + y1 * y2 + z1 * z2,
  cross: ([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Vec3 => [
    y1 * z2 - z1 * y2,
    z1 * x2 - x1 * z2,
    x1 * y2 - y1 * x2
  ],
};