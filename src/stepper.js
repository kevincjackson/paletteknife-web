const R = require('ramda');

// Step from start to end in i steps.
// (Number, Number, Positive Int) -> [Number]
// @example
//     step(10, 20, 1) => [ 10, 20 ]
//     step(10, 20, 2) => [ 10, 15, 20 ]
//     step(10, 20, 5) => [ 10, 12, 14, 16, 18, 20 ]
function step(start, end, steps = 1) {

    // Guard: require positive steps
    if (steps < 1) {
        throw (
            "Error: step() expected a positive Int for steps, got " + steps
        );
    }

    const arr = R.range(0, steps + 1);  
    const delta = (end - start) / steps;

    return R.map(i => start + (delta * i), arr);
}

// Step over arrays.
// ([a], [a], i) -> [a]
// @example 
//     stepA([ 10 ], [ 20 ], 1) => [ [ 10 ], [ 20 ] ]
//     stepA([ 10 ], [ 20 ], 2) => [ [ 10 ], [ 15 ], [ 20 ] ]
//     stepA([ 0, 2, 4 ], [ 10, 12, 14 ], 2) =>
//           [ [ 0, 2, 4 ], [ 5, 7, 9 ], [ 10, 12, 14 ] ] 
function stepA(a, b, steps) {
    return R.compose(
        R.transpose,
        R.map(arr => step(arr[0], arr[1], steps)),
        R.transpose
    )([a,b])
}

// Step over objects.
// ({k: v}, {k: v}, i) -> [{k, v}]
// @example
//   stepO({ a: 1, b: 2 }, { a: 2, b: 3 }, 2) =>
//      [ { a: 1, b: 2 }, { a: 1.5, b: 2.5 }, { a: 2, b: 3 } ]
function stepO(a, b, steps) {
    const keys = R.keys(a);
    const vals = stepA(R.values(a), R.values(b), steps); 

    return R.map(vs => fromPairsA(keys, vs))(vals);
}

// Create an object from arrays of keys and values.
// ([a], [b]) -> [{a: b}]
// @example
//     fromPairsA([ 'a', 'b' ], [ 1, 2 ]) => { a: 1, b: 2 }
function fromPairsA(keys, values) {
    return R.compose(
        R.fromPairs,
        R.transpose
    )([keys,values]);
} 

module.exports.step = step;
module.exports.stepA = stepA;
module.exports.stepO = stepO;
module.exports.fromPairsA = fromPairsA;
