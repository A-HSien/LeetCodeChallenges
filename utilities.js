
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


function safetyWhile(conditionFunc, contentFunc) {
    const timeout = safetyWhile.timeout || 1 * 1000;
    const begin = Date.now();
    const checkTime = () => {
        const result = (Date.now() - begin) < timeout;
        if (!result) console.warn('timeout')
        return result;
    };
    while (conditionFunc() && checkTime()) {
        contentFunc();
    };
};
safetyWhile.timeout = 1 * 1000;

function getQueryString(field, url) {
    const href = url ? url : window.location.href;
    const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    const string = reg.exec(href);
    return string ? decodeURIComponent(string[1]) : null;
};


function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
};

/** 
 * @param {Array} array
 * */
function arrayToTree(array) {
    if (!array || array.length === 0) return null;
    const root = new TreeNode(array.shift());

    let nodes = [root];
    while (array.length > 0) {
        const nextLevel = [];
        nodes.forEach(n => {
            if (array.length > 0) {
                const left = array.shift();
                n.left = left !== null ? new TreeNode(left) : left;
            }
            if (array.length > 0) {
                const right = array.shift();
                n.right = right !== null ? new TreeNode(right) : right;
            }

            nextLevel.push(n.left);
            nextLevel.push(n.right);
        });
        nodes = nextLevel;
    };
    return root;
};