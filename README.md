
<!--#echo json="package.json" key="name" underline="=" -->
p-readar
========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Read a text file entirely and return a promise for an array of text lines.
<!--/#echo -->


The package name is in honor of [astur](https://github.com/astur/readar/)'s
sync-reading [`readar`](https://github.com/astur/readar/) package.



API
---

This module exports one function:

### pReadar(string path | number fdNum | [object opts])

* Giving a string primitive `path` is an alias for `pReadar({ path })`.
* Giving a number primitive `fdNum` is an alias for `pReadar({ path: fdNum })`.

`opts` is an optional options object that supports these optional keys:

* `path`: Path (as string primitive)
  or file descriptor number (as number primitive)
  of the file to be read.
  * Giving `undefined` (also the default) is the same as `0`,
    the file descriptor number of stdin.
  * All other data types, including String objects and Number objects,
    will be refused.
* `eol`: The line-splitting RegExp. Default: `/\r?\n/`
  * Line-splitting will be skipped if the
* `enc`: Encoding. Default: `'UTF-8'`
* `map`: If truthy, a function to `.map()` the result lines with.
  Default: `undefined`
* `filter`: If truthy, a function to `.filter()` the result lines with.
  Default: `undefined`
* `ifUnreadable`: What to do in case the file cannot be read.
  * `undefined`: Reject the promise.
  * any other value: Pretend this value would have been the result of reading
    the file contents.
* `ifEmpty`: What to do in case the results array is empty after `filter`.
  * `undefined`: Return the exact results array anyway.
    Even though empty, the `filter` may have modified it in other ways.
  * any other value: Return that exact value.








Usage
-----

see [test/usage.js](test/usage.js). :TODO:



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
