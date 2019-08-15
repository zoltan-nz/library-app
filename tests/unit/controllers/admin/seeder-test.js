import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { next } from '@ember/runloop';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const { spy, stub } = sinon;

module('Unit | Controller | admin/seeder', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    const controller = {
      _destroyAll: stub().resolves(),
      _saveRandomLibrary: stub().resolves(),
      _saveRandomAuthor: stub().resolves('newAuthor'),
      _generateSomeBooks: stub().resolves('books'),
      authors: 'authors',
      books: 'books',
      libraries: 'libraries'
    };
    this.controller = this.owner.factoryFor('controller:admin/seeder').create(controller);
  });

  test('generateLibraries action', function(assert) {
    const done = assert.async();
    const { controller } = this;
    controller.send('generateLibraries', 10);
    assert.expect(4);
    assert.equal(controller.get('generateLibrariesInProgress'), true);
    assert.equal(controller._saveRandomLibrary.callCount, 10);

    next(() => {
      assert.equal(controller.get('generateLibrariesInProgress'), false);
      assert.equal(controller.get('libDone'), true);
      done();
    });
  });

  test('deleteLibraries action', function(assert) {
    const done = assert.async();
    const { controller } = this;
    controller.send('deleteLibraries');
    assert.expect(4);
    assert.equal(controller.get('deleteLibrariesInProgress'), true);
    assert.ok(controller._destroyAll.calledOnceWith('libraries'));

    next(() => {
      assert.equal(controller.get('libDelDone'), true);
      assert.equal(controller.get('deleteLibrariesInProgress'), false);
      done();
    });
  });

  test('generateBooksAndAuthors action', function(assert) {
    const done = assert.async();
    const { controller } = this;
    controller.send('generateBooksAndAuthors', 10);
    assert.expect(5);
    assert.equal(controller.get('generateBooksInProgress'), true);
    assert.equal(controller._saveRandomAuthor.callCount, 10);

    next(() => {
      assert.ok(controller._generateSomeBooks.calledWith('newAuthor'));
      assert.equal(controller.get('authDone'), true);
      assert.equal(controller.get('generateBooksInProgress'), false);
      done();
    });
  });

  test('deleteBooksAndAuthors action', function(assert) {
    const done = assert.async();
    const { controller } = this;
    controller.send('deleteBooksAndAuthors');
    assert.expect(4);
    assert.equal(controller.get('deleteBooksInProgress'), true);

    next(() => {
      assert.deepEqual(controller._destroyAll.args, [['authors'], ['books']]);
      assert.equal(controller.get('authDelDone'), true);
      assert.equal(controller.get('deleteBooksInProgress'), false);
      done();
    });
  });

  module('private methods', function(hooks) {
    hooks.beforeEach(function() {
      const save = spy();
      const randomize = stub().returns({ save });
      const createRecord = stub().returns({ randomize });
      const controller = {
        store: { createRecord }
      };
      this.controller = this.owner.factoryFor('controller:admin/seeder').create(controller);
    });

    test('_saveRandomLibrary function', function(assert) {
      const { controller } = this;
      controller._saveRandomLibrary();
      assert.expect(3);
      assert.ok(controller.store.createRecord.calledWith('library'));
      assert.ok(controller.store.createRecord().randomize.calledOnce);
      assert.ok(controller.store.createRecord().randomize().save.calledOnce);
    });

    test('_saveRandomAuthor function', function(assert) {
      const { controller } = this;
      controller._saveRandomAuthor();
      assert.expect(3);
      assert.ok(controller.store.createRecord.calledWith('author'));
      assert.ok(controller.store.createRecord().randomize.calledOnce);
      assert.ok(controller.store.createRecord().randomize().save.calledOnce);
    });

    test('_generateSomeBooks function', function(assert) {
      const done = assert.async();
      const { controller } = this;
      const author = { save: spy() };
      const library = { save: spy() };
      const save = stub().resolves();
      const randomize = stub().returns({ save });
      const createRecord = stub().returns({ randomize });
      controller.setProperties({
        _selectRandomLibrary: stub().returns(library),
        store: { createRecord }
      });
      controller._generateSomeBooks(author);
      assert.expect(5);

      next(() => {
        assert.ok(createRecord.calledWith('book'));
        assert.ok(randomize.calledWith(author, library));
        assert.ok(save.called);
        assert.ok(author.save.called);
        assert.ok(library.save.called);
        done();
      });
    });

    test('_selectRandomLibrary function', function(assert) {
      const { controller } = this;
      controller.set('libraries', EmberObject.create(
        { length: 2, objectAt: spy() }
      ));
      controller._selectRandomLibrary();
      assert.expect(1);
      assert.ok(controller.libraries.objectAt.calledOnce);
    });

    test('_destroyAll function', function(assert) {
      const { controller } = this;
      const destroyRecord = spy();
      const records = [{ destroyRecord }, { destroyRecord }];
      controller._destroyAll(records);
      assert.expect(1);
      assert.ok(destroyRecord.calledTwice);
    });
  });
});
