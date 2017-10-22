// a simple localStorage mock with value stringification
module.exports = function () {
    const handler = {
        get(target, propKey, receiver) {
            const origMethod = target[propKey];
            return function (...args) {
                const result = origMethod.apply(this, args);
                return result
            }
        },
        set(target, propKey, value, receiver) {
            target[propKey] = value.toString()
            return true
        },
    }
    return new Proxy({}, handler)
}