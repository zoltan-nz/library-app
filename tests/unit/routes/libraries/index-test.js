import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

const { stub } = sinon;

module('Unit | Route | libraries/index', hooks => {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.findAll = stub().returns('libraries');
    this.query = stub().returns('libraries');
    this.route = this.owner.factoryFor('route:libraries/index').create({
      store: {
        findAll: this.findAll,
        query: this.query,
      },
    });
  });

  test('queryParams property', function(assert) {
    assert.expect(2);
    assert.equal(this.route.queryParams.limit.refreshModel, true);
    assert.equal(this.route.queryParams.letter.refreshModel, true);
  });

  test('model hook', function(assert) {
    const params = {
      limit: 'all',
    };

    const queryParams = {
      orderBy: 'name',
      startAt: params.letter,
      endAt: params.letter + '\uf8ff',
    };

    assert.expect(4);
    assert.equal(this.route.model(params), 'libraries');
    assert.ok(this.findAll.calledOnceWith('library'));

    assert.equal(this.route.model({}), 'libraries');
    assert.ok(this.query.calledOnceWith('library', queryParams));
  });
});
