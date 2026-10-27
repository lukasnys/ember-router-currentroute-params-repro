import { settled, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'router-params-repro/tests/helpers';
import { module, test } from 'qunit';

// The initial transition is aborted by design, so visit() rejects with
// TransitionAborted; wait for the redirect transition instead.
async function visitThroughRedirect(url) {
  try {
    await visit(url);
  } catch (error) {
    if (error?.message !== 'TransitionAborted') {
      throw error;
    }
  }
  await settled();
}

module('Acceptance | currentRoute params', function (hooks) {
  setupApplicationTest(hooks);

  test('currentRoute keeps params after abort + model redirect on initial load', async function (assert) {
    await visitThroughRedirect('/parent/1/child');

    const router = this.owner.lookup('service:router');
    assert.strictEqual(router.currentRouteName, 'parent.other');
    assert.strictEqual(router.currentURL, '/parent/1/other');
    assert.strictEqual(
      JSON.stringify(router.currentRoute.parent.params),
      '{"id":"1"}',
    );
  });

  test('control: abort + id redirect on initial load', async function (assert) {
    await visitThroughRedirect('/parent/1/child-by-id');

    const router = this.owner.lookup('service:router');
    assert.strictEqual(router.currentRouteName, 'parent.other');
    assert.strictEqual(router.currentURL, '/parent/1/other');
    assert.strictEqual(
      JSON.stringify(router.currentRoute.parent.params),
      '{"id":"1"}',
    );
  });
});
