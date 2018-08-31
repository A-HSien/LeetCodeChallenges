function assert(expected, result) {
    console.log(JSON.stringify(expected === result) + ', result: ' + result);
    if (expected !== result) console.warn('expected: ' + expected);
};