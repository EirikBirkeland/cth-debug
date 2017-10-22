const globToRegexp = require('glob-to-regexp')

/**
 * @param scopename
 * @returns {log}
 */
function createNewDebugger(scopename) {
    const handler = {
        get(target, propKey, receiver) {
            const origMethod = target[propKey];
            return function (...args) {

                if (!localStorage['cth-debug']) {
                    return
                }

                const pattern = globToRegexp(localStorage['cth-debug'])
                if (scopename.match(pattern)) {
                    const result = origMethod.apply(this, args);
                    return result
                    // Return warn and error always, regardless of settings.
                } else if (propKey === 'warn' || propKey === 'error') {
                    const result = origMethod.apply(this, args);
                    return result
                }
            }
        }
    }

    return new Proxy(console, handler)
}

module.exports = createNewDebugger