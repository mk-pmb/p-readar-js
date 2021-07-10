// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';
import absdir from 'absdir';

import pReadar from '../p-readar.mjs';

const relPath = absdir(import.meta, '.');


test('Read package manifest', async(t) => {
  t.plan(2);
  const lines = await pReadar(relPath('../package.json'));
  t.same(lines.slice(0, 1), [
    '{ "name": "p-readar",',
  ]);
  t.same(lines.slice(-1), [
    '}',
  ]);
});


function upper(s) { return String(s || '').toUpperCase(); }

test('Map and filter', async(t) => {
  t.plan(2);
  const lines = await pReadar({
    path: relPath('../package.json'),
    map: upper,
    filter(s) { return s.endsWith(': {'); },
  });
  t.same(lines.slice(0, 1), [
    '  "REPOSITORY": {',
  ]);
  t.same(lines.slice(-1), [
    '  "DEVDEPENDENCIES": {',
  ]);
});



const unreadablePath = '/dev/null/should/have/no/subpaths';

test('ifUnreadable with array', async(t) => {
  t.plan(3);
  const tokenArray = [];
  tokenArray.wow = 'much doge';
  const result = await pReadar({
    path: unreadablePath,
    ifUnreadable: tokenArray,
  });
  t.same(result, tokenArray);
  t.ok(result === tokenArray);
  t.equal(result.wow, 'much doge');
});

test('ifUnreadable with object', async(t) => {
  t.plan(1);
  const tokenObj = { toString() { return 'much\ndoge\n'; } };
  const result = await pReadar({
    path: unreadablePath,
    ifUnreadable: tokenObj,
  });
  t.same(result, [
    'much',
    'doge',
  ]);
});


const emptyFilePath = '/dev/null';

test('ifEmpty with array', async(t) => {
  t.plan(3);
  const tokenArray = [];
  tokenArray.wow = 'much doge';
  const result = await pReadar({
    path: emptyFilePath,
    ifEmpty: tokenArray,
  });
  t.same(result, tokenArray);
  t.ok(result === tokenArray);
  t.equal(result.wow, 'much doge');
});

test('ifEmpty with object', async(t) => {
  t.plan(2);
  const tokenObj = { toString() { return 'much\ndoge\n'; } };
  const result = await pReadar({
    path: emptyFilePath,
    ifEmpty: tokenObj,
  });
  t.same(result, tokenObj);
  t.ok(result === tokenObj);
});






/* scroll */
