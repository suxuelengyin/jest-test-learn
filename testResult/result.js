const stripAnsi = require('strip-ansi');
const typeOf = (obj) => {
    return Object.prototype.toString.call(obj)
}
const deal = (obj) => {
    let copy;
    if (typeOf(obj) === '[object Object]') {
        copy = {}
        for (let key in obj) {
            copy[key] = deal(obj[key]);
        }
    } else if (typeOf(obj) === '[object Function]') {
        copy = obj.bind();
    } else if (typeOf(obj) === '[object Array]') {
        copy = obj.map((item) => {
            return deal(item);
        })
    } else if (typeof obj === "string") {
        copy = stripAnsi(obj);
    } else {
        copy = obj
    }
    return copy
}
module.exports = deal