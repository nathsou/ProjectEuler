import { createReadStream, ReadStream } from "fs";
import { AsyncIt } from "./asyncIters";

export function read(
    path: string,
    encoding: BufferEncoding = 'utf-8',
    highWaterMark?: number
): ReadStream {
    return createReadStream(path, { encoding, highWaterMark });
}

export async function* words(path: string): AsyncIt<string> {
    for await (const str of read(path, 'utf-8')) {
        yield* str.split(',').map((name: string) => name.substr(1, name.length - 2));
    }
}

export async function* lines(path: string): AsyncIt<string> {
    for await (const str of read(path, 'utf-8')) {
        yield* str.split('\n');
    }
}

export const consume = async <T>(it: AsyncIt<T>): Promise<T[]> => {
    const vals: T[] = [];
    for await (const val of it) {
        vals.push(val);
    }

    return vals;
};