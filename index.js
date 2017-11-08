const globToRegexp = require('glob-to-regexp')

// TODO: Make it faster
// TODO: add support for arbitrary global variable (or env variable?)
// TODO: Allow user to pass options as multiple parameters or as a single opts object

/**
 * @param scopename - the local scopename
 * @returns {Object} - a Proxy for console
 */
function createNewDebugger(scopename, opts = {}) {
    const handler = {

        get(target, propKey, receiver) {

            return function (...args) {

                const origMethod = target[propKey];

                // Always return immediately all but the specified console methods.
                if (!propKey.match(/debug|log|info|group|groupEnd/)) {
                    if(opts.quiet) {return}
                    const result = origMethod.apply(this, args);
                    return result
                }
                
                if (typeof localStorage === "undefined") {
                    // "Your environment does not have localStorage"
                    return
                } else if (!localStorage['cth-debug']) {
                    // Returning because no cth-debug variable is set
                    return
                }

                const pattern = globToRegexp(localStorage['cth-debug'])

                if (pattern.test(scopename)) {
                    if(opts.quiet) {return}
                    const result = origMethod.apply(this, args);
                    return result
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