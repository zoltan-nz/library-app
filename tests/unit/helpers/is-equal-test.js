import { isEqual } from 'library-app/helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | is equal', function() {
  // Replace this with your real tests.
  test('is equal', function(assert) {
    let result = isEqual([42, 42]);
    assert.ok(result);
  });

  test('is not equal', function(assert) {
    let result = isEqual([42, 43]);
    assert.notOk(result);
  });
});
