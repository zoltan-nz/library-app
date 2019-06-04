import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

const { stub } = sinon;

module('Unit | Route | admin/contacts', hooks => {
  setupTest(hooks);

  test('model hook', function(assert) {
    const route = this.owner.factoryFor('route:admin/contacts').create({
      store: {
        findAll: stub().returns('contacts')
      }
    });
    assert.expect(2);
    assert.equal(route.model(), 'contacts');
    assert.ok(route.store.findAll.calledOnceWith('contact'));
  });
});
