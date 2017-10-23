# cth-debug
A console proxy wrapper for the browser, with localStorage-based configurable scoping

Usage:
```js
const debug = require('cth-debug')('scopeA')

// All console methods are available:
debug.log("foo") // foo
debug.info("foo") // foo
debug.warn("foo") // foo

localStorage['cth-debug'] = 'scopeB'

// scopeA is now out of scope, but warn and error methods are still printed:
debug.log("foo") // <no logging>
debug.info("foo") // <no logging>
debug.warn("foo") // foo

// glob (*) to match all scopes, giving you global log output
localStorage['cth-debug'] = '*'

debug.log("foo") // foo
debug.info("foo") // foo
debug.warn("foo") // foo
```

I personally use this to selectively suppress output from parts of large web apps. I was originally using the `debug` module, but it didn't fit my needs since it's mainly Node-oriented, so I rewrote something that's lightweight and lets me use the original console object with all its methods.
