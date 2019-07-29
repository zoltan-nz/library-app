import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

const { spy, stub } = sinon;

module('Unit | Controller | libraries/edit', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.controller = this.owner.lookup('controller:libraries/edit');
  });

  test('label and title', function(assert) {
    const { controller } = this;
    assert.expect(2);
    assert.equal(controller.get('buttonLabel'), 'Save changes');
    assert.equal(controller.get('title'), 'Edit library');
  });

  test('saveLibrary action', function(assert) {
    const { controller } = this;
    const save = stub().returns({ then: stub().yields() });
    controller.set('transitionToRoute', spy());
    controller.send('saveLibrary', { save });
    assert.expect(2);
    assert.ok(save.calledOnce);
    assert.ok(controller.transitionToRoute.calledOnceWith('libraries'));
  });
});
