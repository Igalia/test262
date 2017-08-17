// Copyright (C) 2017 Robin Templeton. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: BigInt.asIntN
esid: pending
features: [BigInt]
---*/

verifyNotEnumerable(BigInt, "asIntN");
verifyWritable(BigInt, "asIntN");
verifyConfigurable(BigInt, "asIntN");

assert.sameValue(BigInt.asIntN.length, 2);
verifyNotEnumerable(BigInt.asIntN, "length");
verifyNotWritable(BigInt.asIntN, "length");
verifyConfigurable(BigInt.asIntN, "length");

assert.sameValue(BitInt.asIntN.name, "asIntN");
verifyNotEnumerable(BitInt.asIntN, "name");
verifyNotWritable(BitInt.asIntN, "name");
verifyConfigurable(BitInt.asIntN, "name");

// ==========
// Arithmetic
// ==========

assert.sameValue(BigInt.asIntN(0, -2n), 0n);
assert.sameValue(BigInt.asIntN(0, -1n), 0n);
assert.sameValue(BigInt.asIntN(0,  0n), 0n);
assert.sameValue(BigInt.asIntN(0,  1n), 0n);
assert.sameValue(BigInt.asIntN(0,  2n), 0n);

assert.sameValue(BigInt.asIntN(1, -3n), -1n);
assert.sameValue(BigInt.asIntN(1, -2n),  0n);
assert.sameValue(BigInt.asIntN(1, -1n), -1n);
assert.sameValue(BigInt.asIntN(1,  0n),  0n);
assert.sameValue(BigInt.asIntN(1,  1n), -1n);
assert.sameValue(BigInt.asIntN(1,  2n),  0n);
assert.sameValue(BigInt.asIntN(1,  3n), -1n);
assert.sameValue(BigInt.asIntN(1, -123456789012345678901n), -1n);
assert.sameValue(BigInt.asIntN(1, -123456789012345678900n),  0n);
assert.sameValue(BigInt.asIntN(1,  123456789012345678900n),  0n);
assert.sameValue(BigInt.asIntN(1,  123456789012345678901n), -1n);

assert.sameValue(BigInt.asIntN(2, -3n),  1n);
assert.sameValue(BigInt.asIntN(2, -2n), -2n);
assert.sameValue(BigInt.asIntN(2, -1n), -1n);
assert.sameValue(BigInt.asIntN(2,  0n),  0n);
assert.sameValue(BigInt.asIntN(2,  1n),  1n);
assert.sameValue(BigInt.asIntN(2,  2n), -2n);
assert.sameValue(BigInt.asIntN(2,  3n), -1n);
assert.sameValue(BigInt.asIntN(2, -123456789012345678901n), -1n);
assert.sameValue(BigInt.asIntN(2, -123456789012345678900n),  0n);
assert.sameValue(BigInt.asIntN(2,  123456789012345678900n),  0n);
assert.sameValue(BigInt.asIntN(2,  123456789012345678901n),  1n);

// TODO: test large values for the bits argument.

// =================
// Argument handling
// =================

// Let bits be ? ToIndex(bits).
assert.sameValue(BigInt.asIntN(void 0, 1n), 0n);
assert.sameValue(BigInt.asIntN(null, 1n), 0n);
assert.sameValue(BigInt.asIntN("foo", 1n), 0n);
assert.sameValue(BigInt.asIntN(true, 1n), -1n);
assert.sameValue(BigInt.asIntN(false, 1n), 0n);
assert.sameValue(BigInt.asIntN({valueOf:()=>2}, 5n), 1n);
assert.sameValue(BigInt.asIntN("2", 5n), 1n);
assert.sameValue(BigInt.asIntN(NaN, 1n), 0n);
assert.sameValue(BigInt.asIntN(2.9, 5n), 1n);
assert.sameValue(BigInt.asIntN(-0.9, 1n), 0n);
assert.sameValue(BigInt.asIntN(-0.9, 1n), 0n);
assert.throws(RangeError, () => BigInt.asIntN(-1, 0n));
assert.throws(RangeError, () => BigInt.asIntN(Number.MAX_SAFE_INTEGER * 2, 0n));
assert.throws(RangeError, () => BigInt.asIntN(Infinity, 0n));

// Let bigint ? ToBigInt(bigint).
assert.sameValue(BigInt.asIntN(2, {valueOf:()=>5n}), 1n);
assert.throws(TypeError, () => BigInt.asIntN(0, undefined));
assert.throws(TypeError, () => BigInt.asIntN(0, null));
assert.sameValue(BigInt.asIntN(2, true), 1n);
assert.sameValue(BigInt.asIntN(2, false), 0n);
assert.throws(TypeError, () => BigInt.asIntN(0, 0));
assert.throws(SyntaxError, () => BigInt.asIntN(0, "foo"));
assert.sameValue(BigInt.asIntN(2, "5"), 1n);
assert.sameValue(BigInt.asIntN(2, "123456789012345678901"), 1n);
assert.throws(TypeError, () => BigInt.asIntN(0, Symbol("1")));

// Order of steps
(function() {
  var i = 0;
  BigInt.asIntN({valueOf() {
    assert.sameValue(i, 0);
    i++;
    return 0;
  }}, {valueOf() {
    assert.sameValue(i, 1);
    i++;
    return 0;
  }});
})();
