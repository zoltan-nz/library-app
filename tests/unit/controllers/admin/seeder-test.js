import { next } from '@ember/runloop';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

const { spy, stub } = sinon;

module('Unit | Controller | admin/seeder', function(hooks) {
  setupTest(hooks);
  test('generateLibraries action', async function(assert) {
    assert.expect(4);

    const controller = this.owner.lookup('controller:admin/seeder');
    controller._saveRandomLibrary = stub().resolves();

    controller.send('generateLibraries', 10);

    await assert.equal(controller.generateLibrariesInProgress, true);
    await assert.equal(controller._saveRandomLibrary.callCount, 10);
    await assert.equal(controller.generateLibrariesInProgress, false);
    await assert.equal(controller.libDone, true);
  });

  test('deleteLibraries action', async function(assert) {
    assert.expect(4);

    const controller = this.owner.lookup('controller:admin/seeder');
    controller._destroyAll = stub().resolves();
    controller.model = { libraries: 'libraryRecords' };

    controller.send('deleteLibraries');

    await assert.equal(controller.deleteLibrariesInProgress, true);
    await assert.ok(controller._destroyAll.calledOnceWith('libraryRecords'));
    await assert.equal(controller.libDelDone, true);
    await assert.equal(controller.deleteLibrariesInProgress, false);
  });

  test('generateBooksAndAuthors action', async function(assert) {
    assert.expect(5);

    const controller = this.owner.lookup('controller:admin/seeder');
    controller._saveRandomAuthor = stub().resolves('newAuthor');
    controller._generateSomeBooks = stub().resolves();

    controller.send('generateBooksAndAuthors', 10);

    await assert.equal(controller.generateBooksInProgress, true);
    await assert.equal(controller._saveRandomAuthor.callCount, 10);
    await assert.ok(controller._generateSomeBooks.calledWith('newAuthor'));

    next(async () => {
      await assert.equal(controller.authDone, true);
      await assert.equal(controller.generateBooksInProgress, false);
    });
  });

  test('deleteBooksAndAuthors action', async function(assert) {
    assert.expect(5);

    const controller = this.owner.lookup('controller:admin/seeder');
    controller._destroyAll = stub().resolves();
    controller.authors = 'authorRecords';
    controller.books = 'bookRecords';

    controller.send('deleteBooksAndAuthors');

    await assert.equal(controller.deleteBooksInProgress, true);

    next(async () => {
      await assert.ok(controller._destroyAll.calledWith('authorRecords'));
      await assert.ok(controller._destroyAll.calledWith('bookRecords'));
      await assert.equal(controller.authDelDone, true);
      await assert.equal(controller.deleteBooksInProgress, false);
    });
  });

  module('private methods', function() {
    test('_saveRandomLibrary function', function(assert) {
      assert.expect(3);

      const controller = this.owner.lookup('controller:admin/seeder');
      controller.store.createRecord = stub().returns({ randomize: stub().returns({ save: spy() }) });

      controller._saveRandomLibrary();

      assert.ok(controller.store.createRecord.calledWith('library'));
      assert.ok(controller.store.createRecord().randomize.calledOnce);
      assert.ok(controller.store.createRecord().randomize().save.calledOnce);
    });

    test('_saveRandomAuthor function', function(assert) {
      assert.expect(3);

      const controller = this.owner.lookup('controller:admin/seeder');
      controller.store.createRecord = stub().returns({ randomize: stub().returns({ save: spy() }) });

      controller._saveRandomAuthor();

      assert.ok(controller.store.createRecord.calledWith('author'));
      assert.ok(controller.store.createRecord().randomize.calledOnce);
      assert.ok(controller.store.createRecord().randomize().save.calledOnce);
    });

    test('_generateSomeBooks function', async function(assert) {
      assert.expect(5);

      const controller = this.owner.lookup('controller:admin/seeder');
      controller.store.createRecord = stub().returns({ randomize: stub().returns({ save: spy() }) });

      const author = { save: spy() };
      const library = { save: spy() };
      const save = stub().resolves();
      const randomize = stub().returns({ save });
      const createRecord = stub().returns({ randomize });
      controller.setProperties({
        _selectRandomLibrary: stub().returns(library),
        store: { createRecord },
      });

      controller._generateSomeBooks(author);

      await assert.ok(createRecord.calledWith('book'));
      await assert.ok(randomize.calledWith(author, library));
      await assert.ok(save.called);
      await assert.ok(author.save.called);
      await assert.ok(library.save.called);
    });

    test('_selectRandomLibrary function', function(assert) {
      assert.expect(1);

      const controller = this.owner.lookup('controller:admin/seeder');
      controller.libraries = { length: 2, objectAt: spy() };

      controller._selectRandomLibrary();

      assert.ok(controller.libraries.objectAt.calledOnce);
    });

    test('_destroyAll function', function(assert) {
      assert.expect(1);

      const controller = this.owner.lookup('controller:admin/seeder');
      const destroyRecord = spy();
      const records = [{ destroyRecord }, { destroyRecord }];

      controller._destroyAll(records);

      assert.ok(destroyRecord.calledTwice);
    });
  });
});
