import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

const { stub } = sinon;

module('Unit | Controller | contact', function(hooks) {
  setupTest(hooks);

  test('sendMessage action', function(assert) {
    const controller = this.owner.lookup('controller:contact');
    const save = stub().returns({ then: stub().yields() });
    const newContactMessage = { save };

    controller.sendMessage(newContactMessage);

    assert.expect(2);
    assert.ok(save.calledOnce);
    assert.ok(controller.responseMessage);
  });
});
