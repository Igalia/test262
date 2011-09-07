// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split (separator, limit) returns an Array object into which substrings of the result of converting this object to a string have
 * been stored. If separator is a regular expression then
 * inside of SplitMatch helper the [[Match]] method of R is called giving it the arguments corresponding
 *
 * @id: S15.5.4.14_A4_T25;
 * @section: 15.5.4.14;
 * @description: Argument is RegExp('[a-z]'), and instance is String("abc");
 */

var __string = new String("abc");

var __re = new RegExp('[a-z]');

var __split = __string.split(__re);

var __expected = ["","","",""];

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__split.constructor !== Array) {
  $ERROR('#1: __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.length !== __expected.length) {
  $ERROR('#2: __split.length === __expected.length. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
for(var index=0; index<__expected.length; index++) {
  if (__split[index] !== __expected[index]) {
    $ERROR('#3.'+index+': __split['+index+'] === '+__expected[index]+'. Actual: '+__split[index] );
  }
}
//
//////////////////////////////////////////////////////////////////////////////
