import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

const { stub } = sinon;

module('Unit | Route | admin/invitations', function(hooks) {
  setupTest(hooks);

  test('model hook', function(assert) {
    const route = this.owner.factoryFor('route:admin/invitations').create({
      store: {
        findAll: stub().returns('invitations')
      }
    });
    assert.expect(2);
    assert.equal(route.model(), 'invitations');
    assert.ok(route.store.findAll.calledOnceWith('invitation'));
  });
});
