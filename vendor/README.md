# npm security dependency

`npm-11.21.0-unbundled.tgz` is required by the launcher to fix known vulnerabilities in npm's bundled libraries. npm 11.21.0 is the latest npm release compatible with the launcher's Node.js 25 runtime; npm 12 requires newer supported Node.js releases.

The archive comes from the official npm 11.21.0 distribution. All npm code, documentation, and license files are retained unchanged. Only its `node_modules` directory and the `bundleDependencies`/`bundledDependencies` manifest fields are removed. Its dependencies are then installed normally, with patched versions enforced by the root `package.json` overrides and `package-lock.json`.

Upstream archive: <https://registry.npmjs.org/npm/-/npm-11.21.0.tgz>

Verified upstream integrity:

```text
sha512-Zov8KhamNneiLdELtj5YALtNmJW4L4fCLTzjfpzXG2w6MSHcf0UxgdlK5uloCuksWT+7mGUU7wi79cO6RqivPg==
```

Repacked archive SHA-256:

```text
f632c21577302501028182c9dbf772bd8435fbb8b4f2aad1cd604f82d14bf347
```

To reproduce the archive after installing the project dependencies:

```sh
node scripts/repack-npm.cjs
```

The script verifies the upstream integrity before extracting files, removes the bundle, and normalizes archive timestamps. A fresh `npm ci` and `npm audit` must pass after any update. Remove this workaround when a compatible upstream npm release ships patched bundled libraries.
