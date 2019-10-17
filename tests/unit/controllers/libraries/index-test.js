import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Controller | libraries/index', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.controller = this.owner.lookup('controller:libraries/index');
  });

  test('queryParams, filter, letter and limit', function(assert) {
    const { controller } = this;
    assert.expect(4);
    assert.deepEqual(controller.queryParams, ['filter', 'limit', 'letter']);
    assert.equal(controller.filter, '');
    assert.equal(controller.letter, '');
    assert.equal(controller.limit, 'all');
  });

  test('filteredList computed property', function(assert) {
    const { controller } = this;
    controller.model = [
      EmberObject.create({ name: 'Breitenberg LLC Library' }),
      EmberObject.create({ name: 'Douglas Inc Library' }),
    ];

    assert.expect(2);
    assert.deepEqual(
      controller.get('filteredList'),
      controller.model,
      'no filter'
    );

    controller.set('filter', 'berg');
    assert.deepEqual(
      controller.get('filteredList'),
      [controller.model.objectAt(0)],
      'filter by `berg`'
    );
  });
});
