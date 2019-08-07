import { module, skip, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const { spy } = sinon;

module('Unit | Controller | books', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    const rollbackAttributes = spy();
    const save = spy();
    this.book = EmberObject.create({
      rollbackAttributes,
      save
    });
    this.controller = this.owner.lookup('controller:books');
  });

  test('aliased model properties', function(assert) {
    const { controller } = this;
    controller.set('model', {
      authors: 'authors',
      books: 'books',
      libraries: 'libraries'
    });
    assert.expect(3);
    assert.equal(controller.get('authors'), 'authors');
    assert.equal(controller.get('books'), 'books');
    assert.equal(controller.get('libraries'), 'libraries');
  });

  test('editBook', function(assert) {
    const { book, controller } = this;
    controller.send('editBook', book);
    assert.expect(1);
    assert.equal(book.get('isEditing'), true);
  });

  test('cancelBookEdit', function(assert) {
    const { book, controller } = this;
    controller.send('cancelBookEdit', book);
    assert.expect(2);
    assert.equal(book.get('isEditing'), false);
    assert.ok(book.rollbackAttributes.calledOnce);
  });

  test('saveBook', function(assert) {
    const { book, controller } = this;
    controller.send('saveBook', book);
    assert.expect(4);
    assert.equal(book.get('isEditing'), false);
    assert.ok(book.save.calledOnce);
    book.save.resetHistory();

    book.setProperties({
      isEditing: true,
      isNotValid: true
    });
    controller.send('saveBook', book);
    assert.ok(book.get('isEditing'));
    assert.notOk(book.save.calledOnce);
  });

  test('editAuthor', function(assert) {
    const { book, controller } = this;
    controller.send('editAuthor', book);
    assert.expect(1);
    assert.equal(book.get('isAuthorEditing'), true);
  });

  test('cancelAuthorEdit', function(assert) {
    const { book, controller } = this;
    controller.send('cancelAuthorEdit', book);
    assert.expect(2);
    assert.equal(book.get('isAuthorEditing'), false);
    assert.ok(book.rollbackAttributes.calledOnce);
  });

  skip('saveAuthor', function(assert) {
    // TODO: check if firebase adapter has been fixed
    assert.ok(false);
  });

  test('editLibrary', function(assert) {
    const { book, controller } = this;
    controller.send('editLibrary', book);
    assert.expect(1);
    assert.equal(book.get('isLibraryEditing'), true);
  });

  test('cancelLibraryEdit', function(assert) {
    const { book, controller } = this;
    controller.send('cancelLibraryEdit', book);
    assert.expect(2);
    assert.equal(book.get('isLibraryEditing'), false);
    assert.ok(book.rollbackAttributes.calledOnce);
  });

  skip('saveLibrary', function(assert) {
    // TODO: check if firebase adapter has been fixed
    assert.ok(false);
  });
});
