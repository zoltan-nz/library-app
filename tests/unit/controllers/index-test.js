import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const { stub } = sinon;

module('Unit | Controller | index', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.controller = this.owner.lookup('controller:index');
  });

  test('headerMessage, responseMessage and emailAddress', function (assert) {
    const { controller } = this;
    assert.expect(3);
    assert.equal(controller.headerMessage, 'Demo Home Page');
    assert.equal(controller.responseMessage, '');
    assert.equal(controller.emailAddress, '');
  });

  test('saveInvitation action', function (assert) {
    const { controller } = this;
    const responseMessage = 'Thank you! We saved your email address with the following id: 1';
    const response = EmberObject.create({ id: 1 });
    const save = stub().returns({ then: stub().yields(response) });
    const createRecord = stub().returns({ save });
    controller.set('store', { createRecord });
    controller.set('emailAddress', 'test@test.com');

    controller.send('saveInvitation');

    assert.expect(3);
    assert.ok(createRecord.calledOnceWith('invitation', { email: 'test@test.com' }));
    assert.equal(controller.responseMessage, responseMessage);
    assert.equal(controller.emailAddress, '');
  });
});
