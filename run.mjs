import { spawn } from 'child_process';
import { unlink } from 'fs/promises';

const run = cmd => {
  return new Promise((resolve, reject) => {
    const [name, ...args] = cmd.split(' ');
    const bundle = spawn(name, args);
    const allData = [];
    const allErr = [];

    bundle.stdout.on('data', data => {
      allData.push(data.toString());
    });

    bundle.stderr.on('data', data => {
      allErr.push(data.toString());
    });

    bundle.on('close', () => {
      resolve((allErr.length > 0 ? allErr : allData).join(''));
    });

    bundle.on('error', err => {
      reject(err);
    });
  });
};

if (process.argv.length !== 3) {
  console.log('usage: run {problem_number}');
  process.exit(1);
}

const [, , pb] = process.argv;

(async () => {
  const tmpFile = '__tmp__.js'
  process.chdir(`PB${pb}`);
  console.log('bundling...');
  await run(`npx esbuild pb${pb}.ts --bundle --outfile=${tmpFile}`, parseInt(pb));
  console.log('running...');

  const answer = await run(`node ${tmpFile}`);
  await unlink(tmpFile);

  console.clear();
  console.log(answer);
})();