// -*- coding: utf-8, tab-width: 2 -*-

import mustBe from 'typechecks-pmb/must-be.js';
import promisedFs from 'nofs';


function parsePrimitiveOpts(o) {
  const t = typeof o;
  if (t === 'string') { return { path: o }; }
  if (t === 'number') { return { path: o }; }
  return (o || false);
}


async function pReadar(origOpts) {
  const opt = parsePrimitiveOpts(origOpts);
  const path = mustBe.tProp('opts', opt, 'nonEmpty str | num', 'path', 0);
  let data;
  try {
    data = await (opt.fs || promisedFs).readFile(path, opt.enc || 'UTF-8');
  } catch (cannotRead) {
    const un = opt.ifUnreadable;
    if (un === undefined) { throw cannotRead; }
    data = un;
  }
  if (!Array.isArray(data)) {
    data = String(data || '');
    if ((!opt.keepBOM) && data.startsWith('\uFEFF')) { data = data.slice(1); }
    data = data.split(opt.eolRgx || /\r?\n/);
  }
  if (opt.map) { data = data.map(opt.map); }
  if (opt.filter) { data = data.filter(opt.filter); }
  if (!opt.keepELL) {
    const n = data.length;
    if ((n >= 1) && (!data[n - 1])) { data = data.slice(0, -1); }
  }
  if (!data.length) {
    const em = opt.ifEmpty;
    if (em !== undefined) { data = em; }
  }
  return data;
}


export default pReadar;
