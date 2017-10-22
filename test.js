const test = require('ava')
global.localStorage = require('./lib/localStorageMock')

const debug1 = require('./index')('myScope1', {quiet: true})
const debug2 = require('./index')('myScope2', {quiet: true})

/**
 *
 * Note: a successful log/info/warn/etc will return undefined, which is business as usual (the current debug 'instance' has a valid scope (e.g. myScope1)
 * An unsuccessful call, due to not being in scope, or not being a high priority call like info/warn, will return null.
 */

test('debug1 should be in scope', t => {
    localStorage['cth-debug'] = "myScope1"
    t.is(undefined, debug1.log("foo"))
    t.is(undefined, debug1.warn("foo"))
    t.is(undefined, debug1.error("foo"))
})

test('debug2 should not be in scope', t => {
    localStorage['cth-debug'] = "myScope1"
    t.is(null, debug2.log("foo"))
    t.is(undefined, debug2.warn("foo"))
    t.is(undefined, debug2.error("foo"))
})

test('debug1 and debug2 should be in scope', t => {
    localStorage['cth-debug'] = "*Scope*"
    t.is(undefined, debug1.log("foo"))
    t.is(undefined, debug1.warn("foo"))
    t.is(undefined, debug1.error("foo"))

    t.is(undefined, debug2.log("foo"))
    t.is(undefined, debug2.warn("foo"))
    t.is(undefined, debug2.error("foo"))
})