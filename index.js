const globToRegexp = require('glob-to-regexp')

/**
 * @param scopename - the local scopename
 * @returns {Object} - a Proxy for console
 */
function createNewDebugger(scopename, opts) {
    const handler = {
        get(target, propKey, receiver) {
            const origMethod = target[propKey];
            return function (...args) {

                if (localStorage) {
                    if (!localStorage['cth-debug']) {
                        const result = origMethod.apply(this, args);
                        return result
                    }
                } else {
                    throw new Error("Your environment does not have localStorage")
                }

                const pattern = globToRegexp(localStorage['cth-debug'])
                if (pattern.test(scopename)) {
                    if (opts.quiet) {
                        return
                    }
                    const result = origMethod.apply(this, args);
                    return result
                    // Return warn and error always, regardless of settings.
                } else if (propKey === 'warn' || propKey === 'error') {
                    if (opts.quiet) {
                        return
                    }
                    const result = origMethod.apply(this, args);
                    return result
                } else {
                    // Experimental: return null in order for unit tests to know what's up
                    return null
                }
            }
        }
    }
    return new Proxy(console, handler)
}

module.exports = createNewDebugger