import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const { spy, stub } = sinon;

module('Unit | Route | contact', hooks => {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.createRecord = stub().returns('contact');
    this.destroyRecord = spy();
    this.route = this.owner.factoryFor('route:contact').create({
      controller: EmberObject.create({
        model: EmberObject.create({
          isNew: true,
          destroyRecord: this.destroyRecord
        })
      }),
      store: { createRecord: this.createRecord }
    });
  });

  test('model hook', function(assert) {
    assert.expect(2);
    assert.equal(this.route.model(), 'contact');
    assert.ok(this.createRecord.calledOnceWith('contact'));
  });

  test('willTransition action', function(assert) {
    const { destroyRecord, route } = this;
    route.send('willTransition');
    assert.expect(4);
    assert.ok(destroyRecord.calledOnce);
    assert.notOk(route.controller.get('responseMessage'));
    destroyRecord.resetHistory();

    route.controller.model.set('isNew', false);
    route.send('willTransition');
    assert.ok(destroyRecord.notCalled);
    assert.notOk(route.controller.get('responseMessage'));
  });
});
