const globToRegexp = require('glob-to-regexp')

/**
 * @param scopename - the local scopename
 * @returns {Object} - a Proxy for console
 */
function createNewDebugger(scopename, opts) {
    const handler = {

        get(target, propKey, receiver) {

            return function (...args) {

                const origMethod = target[propKey];
                
                if (propKey === 'warn' || propKey === 'error') {
                    if (opts.quiet) {
                        return
                    }
                    const result = origMethod.apply(this, args);
                    return result
                }


                if (typeof localStorage === "undefined") {
                    return
                } else {
                    // "Your environment does not have localStorage"
                }

                const pattern = globToRegexp(localStorage['cth-debug'])

                if (pattern.test(scopename)) {
                    if (opts.quiet) {
                        return
                    }
                    const result = origMethod.apply(this, args);
                    return result
                    // Return warn and error always, regardless of settings.
                } else {
                    // Return null when a call was rejected (mainly for unit tests)
                    return null
                }
            }
        }
    }
    return new Proxy(console, handler)
}

module.exports = createNewDebugger