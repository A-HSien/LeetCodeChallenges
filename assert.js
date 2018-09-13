function assert(expected, result) {
    if (expected !== null && typeof expected === 'object') expected = JSON.stringify(expected);
    if (result !== null && typeof result === 'object') result = JSON.stringify(result);
    console.log(JSON.stringify(expected === result) + ', result: ' + result);
    if (expected !== result) console.warn(`expected: ${expected} , but your result: ${result}`);
};