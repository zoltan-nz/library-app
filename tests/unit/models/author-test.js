import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | author', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const model = run(
      () => this.owner.lookup('service:store').createRecord('author')
    );
    assert.expect(1);
    assert.equal(
      model.randomize().constructor.modelName,
      'author'
    );
  });
});
