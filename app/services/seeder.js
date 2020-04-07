import { action } from '@ember/object';
import { cancel, later } from '@ember/runloop';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Faker from 'faker';
import { range } from 'lodash';

const DONE_MESSAGE_VISIBILITY_TIME_MS = 3000;

export default class SeederService extends Service {
  @service() store;

  @tracked doneMessage;

  @tracked seedingLibrariesInProgress;
  @tracked deletingLibrariesInProgress;
  @tracked seedingAuthorsInProgress;
  @tracked deletingAuthorsInProgress;

  visibilityTimer = DONE_MESSAGE_VISIBILITY_TIME_MS;

  @action
  showDone(message) {
    this.doneMessage = message;

    // Cancel a previously triggered event, so the latest message will stay visible for the given time.
    cancel(this._runLater);
    this._runLater = later(() => (this.doneMessage = ''), this.visibilityTimer);
  }

  @action
  async seedRandomLibraries(volume) {
    this.seedingLibrariesInProgress = true;

    const counter = parseInt(volume, 10);
    const listOfNewRandomLibraryPromises = range(counter).map(() => this._createAndSaveRandomLibrary());

    await Promise.all(listOfNewRandomLibraryPromises);

    this.seedingLibrariesInProgress = false;
    this.showDone('Libraries are generated.');
  }

  @action
  async deleteLibraries() {
    this.deletingLibrariesInProgress = true;

    const libraryRecords = await this.store.findAll('library');
    await this._destroyAll(libraryRecords);

    this.deletingLibrariesInProgress = false;
    this.showDone('Libraries are deleted.');
  }

  @action
  async seedRandomAuthorsWithBooks(volume) {
    let libraryRecords = await this.store.findAll('library');

    // Generate at least one Library if there isn't any.
    if (!libraryRecords.length) libraryRecords = [await this._createAndSaveRandomLibrary()];

    this.seedingAuthorsInProgress = true;

    const counter = parseInt(volume, 10);
    const listOfNewRandomAuthorPromises = range(counter).map(() => this._createAndSaveRandomAuthor());
    const newAuthors = await Promise.all(listOfNewRandomAuthorPromises);

    const listOfNewBookPromises = newAuthors.map((author) =>
      this._createAndSaveRandomBooksForAuthorInLibraries(author, libraryRecords)
    );
    await Promise.all(listOfNewBookPromises);

    this.seedingAuthorsInProgress = false;
    this.showDone('Authors with books are generated.');
  }

  @action
  async deleteAuthorsAndTheirBooks() {
    this.deletingAuthorsInProgress = true;

    const authorRecords = await this.store.findAll('author');
    const destroyBookPromises = authorRecords.map((author) => this._destroyAll(author.books));
    await Promise.all(destroyBookPromises);

    await this._destroyAll(authorRecords);

    this.deletingAuthorsInProgress = false;
    this.showDone('Authors with books are deleted.');
  }

  // Create a new library record, it uses our randomize function from our LibraryModel, which generates some fake data in
  // the new record. The save method is a Promise, so we return a Promise. For this reason the function can be async.
  async _createAndSaveRandomLibrary() {
    return this.store.createRecord('library').randomize().save();
  }

  async _createAndSaveRandomAuthor() {
    return this.store.createRecord('author').randomize().save();
  }

  async _createAndSaveRandomBook(author, library) {
    return this.store.createRecord('book').randomize(author, library).save();
  }

  async _createAndSaveRandomBooksForAuthorInLibraries(author, libraries) {
    const bookCounter = Faker.random.number(10);

    const newBookPromises = range(bookCounter).map(async () => {
      const selectedLibrary = this._selectRandomLibrary(libraries);

      await this._createAndSaveRandomBook(author, selectedLibrary);
      await author.save();
      await selectedLibrary.save();
    });

    return Promise.all(newBookPromises);
  }

  _selectRandomLibrary(libraries) {
    // Please note libraries are records from store, which means this is a DS.RecordArray object, it is extended from
    // Ember.ArrayProxy. If you need an element from this list, you cannot just use libraries[3], we have to use
    // libraries.objectAt(3)
    const size = libraries.length;

    // Get a random number between 0 and size-1
    const randomItem = Faker.random.number(size - 1);
    return libraries.objectAt(randomItem);
  }

  async _destroyAll(records) {
    // destroyRecord() is a Promise and will be fulfilled when the backend database is confirmed the delete
    // lets collect these Promises in an array
    const recordsAreDestroying = records.map((item) => item.destroyRecord());

    // Wrap all Promise in one common Promise
    return Promise.all(recordsAreDestroying);
  }
}
