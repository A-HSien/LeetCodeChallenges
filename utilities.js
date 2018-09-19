
const Logger = {
    $logger: null,
    queue: [],

    init() {
        const logger = document.createElement('ul');
        logger.className = 'logger';
        document.body.appendChild(logger);

        const messages = Logger.queue;
        delete Logger.queue;
        messages.forEach(msg => {
            Logger.writeToPage(msg);
        });
    },

    log(message) {
        console.log(message);
        Logger.writeToPage(message);
    },

    warn(message) {
        console.warn(message);
        Logger.writeToPage(message);
    },

    writeToPage(message) {
        const logger = Logger.$logger =
            Logger.$logger ||
            document.querySelector('body .logger');

        if (!logger) {
            Logger.queue.push(message);
            return;
        }
        logger.innerHTML += `<li>${message}</li>`;
    }
};
document.addEventListener("DOMContentLoaded", Logger.init);



function assert(expected, result) {
    if (expected !== null && typeof expected === 'object') expected = JSON.stringify(expected);
    if (result !== null && typeof result === 'object') result = JSON.stringify(result);
    Logger.log(JSON.stringify(expected === result) + ', result: ' + result);
    if (expected !== result) Logger.warn(`expected: ${expected} , but your result: ${result}`);
};


function safetyWhile(conditionFunc, contentFunc, timeout) {
    timeout = timeout || 5000;
    const begin = Date.now();
    while ((Date.now() - begin) < timeout && conditionFunc()) {
        contentFunc();
    };
};

function getQueryString(field, url) {
    const href = url ? url : window.location.href;
    const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    const string = reg.exec(href);
    return string ? decodeURIComponent(string[1]) : null;
};