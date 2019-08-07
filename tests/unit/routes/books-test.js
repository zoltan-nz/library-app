import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

const { stub } = sinon;

module('Unit | Route | books', hooks => {
  setupTest(hooks);

  test('model hook', async function(assert) {
    const model = {
      books: 'books',
      authors: 'authors',
      libraries: 'libraries'
    };
    const findAll = stub()
      .onFirstCall().returns('books')
      .onSecondCall().returns('authors')
      .onThirdCall().returns('libraries');
    const route = this.owner.factoryFor('route:books').create({
      store: {
        findAll
      }
    });
    assert.expect(4);
    assert.deepEqual(await route.model(), model);
    assert.ok(findAll.calledWith('book'));
    assert.ok(findAll.calledWith('author'));
    assert.ok(findAll.calledWith('library'));
  });

});
