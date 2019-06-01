import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

const { spy, stub } = sinon;

module('Unit | Route | libraris/index', hooks => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.findAll = stub().returns('libraries');
    this.query = stub().returns('libraries');
    this.route = this.owner.factoryFor('route:libraries/index').create({
      store: {
        findAll: this.findAll,
        query: this.query
      }
    });
  });

  test('queryParams property', function(assert) {
    assert.expect(2);
    assert.equal(this.route.queryParams.limit.refreshModel, true);
    assert.equal(this.route.queryParams.letter.refreshModel, true);
  });

  test('model hook', function(assert) {
    const params = {
      limit: 'all'
    };

    const queryParams = {
      orderBy: 'name',
      startAt: params.letter,
      endAt: params.letter+"\uf8ff"
    };

    assert.expect(4);
    assert.equal(this.route.model(params), 'libraries');
    assert.ok(this.findAll.calledOnceWith('library'));

    assert.equal(this.route.model({}), 'libraries');
    assert.ok(this.query.calledOnceWith('library', queryParams));
  });

  test('deleteLibrary action', function (assert) {
    const library = { destroyRecord: spy() };
    stub(window, 'confirm').returns(true);

    this.route.send('deleteLibrary', library);
    assert.expect(4);
    assert.ok(confirm.calledOnceWith('Are you sure?'));
    assert.ok(library.destroyRecord.calledOnce);
    library.destroyRecord.resetHistory();
    confirm.resetHistory();

    confirm.returns(false);
    this.route.send('deleteLibrary', library);
    assert.ok(confirm.calledOnceWith('Are you sure?'));
    assert.ok(library.destroyRecord.notCalled);
    confirm.restore();
  });
});
