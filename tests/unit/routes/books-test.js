import { module, skip, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const { spy, stub } = sinon;

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

  test('setupController function', function(assert) {
    const controller = EmberObject.create();
    const model = {
      books: 'books',
      authors: 'authors',
      libraries: 'libraries'
    };
    const route = this.owner.lookup('route:books');
    assert.expect(2);
    route.setupController(controller, model);
    assert.equal(controller.get('authors'), 'authors');
    assert.equal(controller.get('libraries'), 'libraries');
  });

  module('actions', () => {

    hooks.beforeEach(function() {
      const rollbackAttributes = spy();
      const save = spy();
      this.book = EmberObject.create({
        rollbackAttributes,
        save
      });
      this.route = this.owner.lookup('route:books');
    });

    test('editBook', function(assert) {
      this.route.send('editBook', this.book);
      assert.expect(1);
      assert.equal(this.book.get('isEditing'), true);
    });

    test('cancelBookEdit', function(assert) {
      const { book } = this;
      this.route.send('cancelBookEdit', book);
      assert.expect(2);
      assert.equal(book.get('isEditing'), false);
      assert.ok(book.rollbackAttributes.calledOnce);
    });

    test('saveBook', function(assert) {
      const { book } = this;
      this.route.send('saveBook', book);
      assert.expect(4);
      assert.equal(book.get('isEditing'), false);
      assert.ok(book.save.calledOnce);
      book.save.resetHistory();

      book.setProperties({
        isEditing: true,
        isNotValid: true
      });
      this.route.send('saveBook', book);
      assert.ok(book.get('isEditing'));
      assert.notOk(book.save.calledOnce);
    });

    test('editAuthor', function(assert) {
      this.route.send('editAuthor', this.book);
      assert.expect(1);
      assert.equal(this.book.get('isAuthorEditing'), true);
    });

    test('cancelAuthorEdit', function(assert) {
      const { book } = this;
      this.route.send('cancelAuthorEdit', book);
      assert.expect(2);
      assert.equal(book.get('isAuthorEditing'), false);
      assert.ok(book.rollbackAttributes.calledOnce);
    });

    skip('saveAuthor', function(assert) {
      // TODO: check if firebase adapter has been fixed
      assert.ok(false);
    });

    test('editLibrary', function(assert) {
      this.route.send('editLibrary', this.book);
      assert.expect(1);
      assert.equal(this.book.get('isLibraryEditing'), true);
    });

    test('cancelLibraryEdit', function(assert) {
      const { book } = this;
      this.route.send('cancelLibraryEdit', book);
      assert.expect(2);
      assert.equal(book.get('isLibraryEditing'), false);
      assert.ok(book.rollbackAttributes.calledOnce);
    });

    skip('saveLibrary', function(assert) {
      // TODO: check if firebase adapter has been fixed
      assert.ok(false);
    });
  });
});
