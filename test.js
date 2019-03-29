'use strict';
const assert = require('assert');
const semver = require('semver');
const urlToOptions = require('./');

const URL = require(semver.satisfies(process.version, '>= 6') ? 'universal-url' : 'whatwg-url').URL;



// Copied from https://github.com/nodejs/node/blob/master/test/parallel/test-whatwg-url-properties.js

const urlObj = new URL('http://user:pass@foo.bar.com:21/aaa/zzz?l=24#test');
const opts = urlToOptions(urlObj);
assert.strictEqual(opts instanceof URL, false);
assert.strictEqual(opts.protocol, 'http:');
assert.strictEqual(opts.auth, 'user:pass');
assert.strictEqual(opts.hostname, 'foo.bar.com');
assert.strictEqual(opts.port, 21);
assert.strictEqual(opts.path, '/aaa/zzz?l=24');
assert.strictEqual(opts.pathname, '/aaa/zzz');
assert.strictEqual(opts.search, '?l=24');
assert.strictEqual(opts.hash, '#test');

const { hostname } = urlToOptions(new URL('http://[::1]:21'));
assert.strictEqual(hostname, '::1');

// If a WHATWG URL object is copied, it is possible that the resulting copy
// contains the Symbols that Node uses for brand checking, but not the data
// properties, which are getters. Verify that urlToOptions() can handle such
// a case.
const copiedUrlObj = Object.assign({}, urlObj);
const copiedOpts = urlToOptions(copiedUrlObj);
assert.strictEqual(copiedOpts instanceof URL, false);
assert.strictEqual(copiedOpts.protocol, undefined);
assert.strictEqual(copiedOpts.auth, undefined);
assert.strictEqual(copiedOpts.hostname, undefined);
assert.strictEqual(copiedOpts.port, NaN);
assert.strictEqual(copiedOpts.path, '');
assert.strictEqual(copiedOpts.pathname, undefined);
assert.strictEqual(copiedOpts.search, undefined);
assert.strictEqual(copiedOpts.hash, undefined);
assert.strictEqual(copiedOpts.href, undefined);
