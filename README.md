# testing-library-breaks-vitest-browser-mode

This is a minimal project to reproduce a bug.

This bug reproduction was refactored, at Great Expense and Inconvenience, from a large production monorepo.

This is a minimal working project which uses [vitest in Browser Mode](https://vitest.dev/guide/browser.html) to test its awesome code.

But when the unsuspecting developer executes `npm install @testing-library/angular@latest` she is suddenly thrust into a cataclysmic fight against the evil forces of `SyntaxError: ambiguous indirect export: __vi_inject__` anf the survival of humanity itself hangs in the balance...

# TL;DR

When you add `@testing-library/angular` to a working project that uses `vitest` to run its tests, in Browser Mode, the tests will break and start failing with fairly cryptic error messages. However, they will break in such a way that it may not be noticeable until after the first time the `node_modules` folder is deleted and recreated.

The tests will actually (and insidiously) keep passing until that happens, thereby obfuscating what change introduced the breakage. (**SPOILER ALERT**: It was adding `@testing-library/angular`.)

## Steps to reproduce

1. Check out the repo, and stay on the `main` branch.

2. Run `npm run test` (or `npx vitest`) from the root directory.

3. Observe the tests that the tests pass, and rejoice.

4. Add `@testing-library/angular` to the `package.json` file, like this: `npm install @testing-library/angular@latest`

5. Immediately run the tests again, with `npm run test` (or `npx vitest`) from the root directory, and bask in the green successfulness of them. Congratulate yourself for your own awesomeness.

6. Do `rm -rf node_modules`. If on a Mac with Apple Silicon, do it over and over until their are no weird errors due to your OS's inability to delete files.

7. Start thinking about all the awesome stuff you are gonna do tonight, and maybe consider ending work early today — you deserve it!

8. But just in case, run those tests one more time, with `npm run test` (or `npx vitest`) from the root directory.

9. 😱 😱 😱 😱 😱 😱 😱 😱 😱 😱 😱

10. Note that the tests do not, in fact, pass. They fail with the error below. Feel the confidence you gained earlier, in step 5, slowly morph into existential dread about software development specifically, but also life itself, generally.

11. ???

12. Profit!

## Pathological level of detail, with bonus thoughts

```shell
# ahem!

➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ npm run test # A.) THIS IS GONNA WORK

> testing-library-breaks-vitest-browser-mode@1.0.0 test
> npx vitest


 DEV  v0.34.3 /Users/mason/testing-library-breaks-vitest-browser-mode
      Browser runner started at http://localhost:63318

 ✓ Foo.spec.ts (1)
   ✓ Foo (1)
     ✓ should work

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  22:57:49
   Duration  2.04s (transform 0ms, setup 0ms, collect 17ms, tests 9ms, environment 0ms, prepare 0ms)


 PASS  Waiting for file changes...
       press h to show help, press q to quit
Cancelling test run. Press CTRL+c again to exit forcefully.

➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ npm install @testing-library/angular@latest

added 61 packages, and audited 550 packages in 12s

133 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ npm run test # B.) THIS IS STILL GONNA WORK!

> testing-library-breaks-vitest-browser-mode@1.0.0 test
> npx vitest


 DEV  v0.34.3 /Users/mason/testing-library-breaks-vitest-browser-mode
      Browser runner started at http://localhost:63318

 ✓ Foo.spec.ts (1)
   ✓ Foo (1)
     ✓ should work

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:08:00
   Duration  1.96s (transform 0ms, setup 0ms, collect 15ms, tests 15ms, environment 0ms, prepare 0ms)


 PASS  Waiting for file changes...
       press h to show help, press q to quit
Cancelling test run. Press CTRL+c again to exit forcefully.

➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # OK SO IT WORKS SO FAR, BUT WATCH THIS!
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ rm -rf node_modules package-lock.json || rm -rf node_modules package-lock.json && npm install --force && npm test
npm WARN using --force Recommended protections disabled.
npm WARN deprecated @vitest/coverage-c8@0.33.0: v8 coverage is moved to @vitest/coverage-v8 package

added 552 packages, and audited 553 packages in 34s

133 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> testing-library-breaks-vitest-browser-mode@1.0.0 test
> npx vitest


 DEV  v0.34.3 /Users/mason/testing-library-breaks-vitest-browser-mode
      Browser runner started at http://localhost:63318


⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Error ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
SyntaxError: The requested module '/node_modules/@vitest/snapshot/node_modules/pretty-format/build/index.js?v=257e3fdb' does not provide an export named '__vi_inject__'
This error originated in "Foo.spec.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 Test Files  no tests
      Tests  no tests
     Errors  1 error
   Start at  23:10:32
   Duration  1.96s (transform 0ms, setup 0ms, collect 0ms, tests 0ms, environment 0ms, prepare 0ms)


 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
Cancelling test run. Press CTRL+c again to exit forcefully.

➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # HOLY SCIENCE! IT ONLY FAILS AFTER node_modules IS REMOVED ONCE!
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # BUT THEN IT FAILS FOREVERAFTER, UNTIL package.json IS UPDATED
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # TO REMOVE @testing-library/angular AND (AND!!!!) node_modules IS
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # DELETED FROM THE FACE OF THIS EARTH AND RECREATED. 😐
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # DELETE "@testing-library/angular" FROM THE package.json FILE:
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ sed '/testing-library/d' package.json > yourmom.zip && mv yourmom.zip package.json
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ npm run test

> test
> npx vitest


 DEV  v0.34.3 /Users/mason/testing-library-breaks-vitest-browser-mode
      Browser runner started at http://localhost:63318


⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Error ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
SyntaxError: The requested module '/node_modules/@vitest/snapshot/node_modules/pretty-format/build/index.js?v=ebd55365' does not provide an export named '__vi_inject__'
This error originated in "Foo.spec.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 Test Files  no tests
      Tests  no tests
     Errors  1 error
   Start at  23:30:40
   Duration  2.03s (transform 0ms, setup 0ms, collect 0ms, tests 0ms, environment 0ms, prepare 0ms)


 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
Cancelling test run. Press CTRL+c again to exit forcefully.

➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # SEE IT STILL FAILS!!! SO WE FIRST THOUGHT
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # `oh weah weah wah, nothing to do with testing-library!`
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ #
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # BUT!!!! BEHOLD:
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ rm -rf node_modules package-lock.json || rm -rf node_modules package-lock.json && npm install --force && npm test
npm WARN using --force Recommended protections disabled.
npm WARN deprecated @vitest/coverage-c8@0.33.0: v8 coverage is moved to @vitest/coverage-v8 package

added 488 packages, and audited 489 packages in 32s

95 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> test
> npx vitest


 DEV  v0.34.3 /Users/mason/testing-library-breaks-vitest-browser-mode
      Browser runner started at http://localhost:63318

 ✓ Foo.spec.ts (1)
   ✓ Foo (1)
     ✓ should work

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:32:15
   Duration  1.89s (transform 0ms, setup 0ms, collect 20ms, tests 5ms, environment 0ms, prepare 0ms)


 PASS  Waiting for file changes...
       press h to show help, press q to quit
Cancelling test run. Press CTRL+c again to exit forcefully.

➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # HOLY F*CKING SCIENCE, BATMAN! THE `rm -rf node_modules` WAS
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # (*** ONCE AGAIN!!!! ***) THE KEY TO THE CLUSTERF*CK!༼;´༎ຶ ۝ ༎ຶ༽༽
➜  testing-library-breaks-vitest-browser-mode git:(main) ✗ # (T_T)
```

以上
