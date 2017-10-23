# cth-debug
A console proxy wrapper for the browser, with localStorage-based configurable scoping

Usage:
``` JavaScript
const debug = require('cth-debug')('alpha')

// All console methods are available:
debug.log("foo") // foo
debug.info("foo") // foo
debug.warn("foo") // foo

localStorage['cth-debug'] = 'beta'

// scopeA is now out of scope!
debug.log("foo") // null
debug.info("foo") // null
debug.warn("foo") // null

// glob (*) to match all scopes, giving you global log output
localStorage['cth-debug'] = '*'

debug.log("foo") // foo
debug.info("foo") // foo
debug.warn("foo") // foo
```
