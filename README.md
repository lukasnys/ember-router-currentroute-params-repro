# router-params-repro

Minimal reproduction: `router.currentRoute` keeps **empty params** after a route's `beforeModel` runs `transition.abort()` and then `router.transitionTo(name, model)` on initial load.

## Run

```sh
pnpm install
pnpm test
```

## Expected vs actual

`tests/acceptance/current-route-params-test.js` visits `/parent/1/child`, whose `beforeModel` aborts and redirects to `parent.other` with the `parent` model.

- `currentRouteName` is `parent.other` and `currentURL` is `/parent/1/other`, as expected.
- `router.currentRoute.parent.params` is `{}`; expected `{ "id": "1" }`.

The control test does the same redirect with the id (`/parent/1/child-by-id`) and passes.

## Versions

Fails on ember-source `7.4.0` (pinned here), `6.12.0` and `7.5.0-alpha.5`.

## Files

- `app/router.js`: `parent` (`/parent/:id`) with `child`, `child-by-id` and `other`
- `app/routes/parent.js`: returns `{ id }` as the model
- `app/routes/parent/child.js`: abort, then redirect with the model
- `app/routes/parent/child-by-id.js`: abort, then redirect with the id
