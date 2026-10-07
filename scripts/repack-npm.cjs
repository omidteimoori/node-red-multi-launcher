const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const tar = require('tar');

const version = '11.21.0';
const integrity = 'sha512-Zov8KhamNneiLdELtj5YALtNmJW4L4fCLTzjfpzXG2w6MSHcf0UxgdlK5uloCuksWT+7mGUU7wi79cO6RqivPg==';

async function main() {
  const root = path.resolve(__dirname, '..');
  const work = await fs.mkdtemp(path.join(os.tmpdir(), 'npm-unbundle-'));
  try {
    const response = await fetch(`https://registry.npmjs.org/npm/-/npm-${version}.tgz`, {
      signal: AbortSignal.timeout(60000)
    });
    if (!response.ok) throw new Error(`npm download failed: HTTP ${response.status}`);
    const original = Buffer.from(await response.arrayBuffer());
    const actual = 'sha512-' + crypto.createHash('sha512').update(original).digest('base64');
    assert.equal(actual, integrity, 'Upstream npm archive failed its integrity check');
    const input = path.join(work, 'upstream.tgz');
    await fs.writeFile(input, original);
    await tar.x({
      file: input,
      cwd: work,
      strict: true,
      filter: name => name !== 'package/node_modules' && !name.startsWith('package/node_modules/')
    });
    const manifest = path.join(work, 'package', 'package.json');
    const metadata = JSON.parse(await fs.readFile(manifest, 'utf8'));
    assert.equal(metadata.name, 'npm');
    assert.equal(metadata.version, version);
    delete metadata.bundleDependencies;
    delete metadata.bundledDependencies;
    await fs.writeFile(manifest, JSON.stringify(metadata, null, 2) + '\n');
    const vendor = path.join(root, 'vendor');
    await fs.mkdir(vendor, { recursive: true });
    const output = path.join(vendor, `npm-${version}-unbundled.tgz`);
    await tar.c({
      file: output,
      cwd: work,
      gzip: { mtime: 0 },
      portable: true,
      mtime: new Date(0),
      jobs: 1
    }, ['package']);
    const rebuilt = await fs.readFile(output);
    console.log(path.relative(root, output));
    console.log('SHA-256: ' + crypto.createHash('sha256').update(rebuilt).digest('hex'));
  } finally {
    await fs.rm(work, { recursive: true, force: true });
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
