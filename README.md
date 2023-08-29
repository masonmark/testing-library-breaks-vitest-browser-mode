# testing-library-breaks-vitest-browser-mode

This is a minimal project to reproduce a bug.

This bug reproduction was refactored, at Great Expense and Inconvenience, from a large production monorepo.

This is a minimal working project which uses [vitest in Browser Mode](https://vitest.dev/guide/browser.html) to test its awesome code.

But when the unsuspecting developer executes `npm install @testing-library/angular@latest` she is suddenly thrust into a cataclysmic fight against the evil forces of `SyntaxError: ambiguous indirect export: __vi_inject__` anf the survival of humanity itself hangs in the balance...

以上
