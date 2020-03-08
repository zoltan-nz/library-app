import {module, test} from 'qunit';
import {setupTest} from 'ember-qunit';
import sinon from 'sinon';

const {stub} = sinon;


module('Unit | Route | authors', hooks => {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.findAll = stub().returns('authors');
    this.route = this.owner.factoryFor('route:authors').create({
      store: {findAll: this.findAll}
    });
  });

  test('model hook', function(assert) {
    assert.expect(2);
    assert.equal(this.route.model(), 'authors');
    assert.ok(this.findAll.calledOnceWith('author'));
  });
});
