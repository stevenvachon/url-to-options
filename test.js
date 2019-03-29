'use strict';
const assert = require('assert');
const semver = require('semver');
const urlToOptions = require('./');

const URL = require(semver.satisfies(process.version, '>= 6') ? 'universal-url' : 'whatwg-url').URL;



// Copied from https://github.com/nodejs/node/blob/master/test/parallel/test-whatwg-url-properties.js

const opts = urlToOptions(new URL('http://user:pass@foo.bar.com:21/aaa/zzz?l=24#test'));
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
