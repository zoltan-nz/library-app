import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Faker from 'faker';
import { all } from 'rsvp';
import { action } from '@ember/object';
import _ from 'lodash';
import { later } from '@ember/runloop';

export default class SeederService extends Service {

  @tracked doneMessage;

  @tracked seedingLibrariesInProgress;
  @tracked deletingLibrariesInProgress;
  @tracked seedingAuthorsInProgress;
  @tracked deletingAuthorsInProgress;

  @action
  showDone(message) {
    this.doneMessage = message;
    later(() => (this.doneMessage = ''), 3000);
  }

  @action
  async seedRandomLibraries(volume) {
    this.seedingLibrariesInProgress = true;

    const counter = parseInt(volume, 10);
    const listOfNewRandomLibraryPromises = _.range(counter).map(() => this._createAndSaveRandomLibrary());

    await all(listOfNewRandomLibraryPromises);

    this.seedingLibrariesInProgress = false;
    this.showDone('Libraries are generated.');
  }

  @action
  async deleteLibraries(libraryRecords) {
    this.deletingLibrariesInProgress = true;

    await this._destroyAll(libraryRecords);

    this.deletingLibrariesInProgress = false;
    this.showDone('Libraries are deleted.');
  }

  @action
  async seedRandomAuthorsWithBooks(volume, libraryRecords) {
    this.seedingAuthorsInProgress = true;

    const counter = parseInt(volume, 10);
    const listOfNewRandomAuthorPromises = _.range(counter).map(() => this._createAndSaveRandomAuthor());
    const newAuthors = await all(listOfNewRandomAuthorPromises);

    const listOfNewBookPromises = newAuthors.map(author => this._createAndSaveRandomBooksForAuthorInLibraries(author, libraryRecords));
    await all(listOfNewBookPromises);

    this.seedingAuthorsInProgress = false;
    this.showDone('Authors with books are generated.');
  }

  @action
  async deleteAuthorsAndTheirBooks(authorRecords) {
    this.deletingAuthorsInProgress = true;

    const destroyBookPromises = authorRecords.map(author => this._destroyAll(author.books));
    await all(destroyBookPromises);

    await this._destroyAll(authorRecords);

    this.deletingAuthorsInProgress = false;
    this.showDone('Authors with books are deleted.');
  }

  // Create a new library record, it uses our randomize function from our LibraryModel, which generates some fake data in
  // the new record. The save method is a Promise, so we return a Promise. For this reason the function can be async.
  async _createAndSaveRandomLibrary() {
    return this.store
      .createRecord('library')
      .randomize()
      .save();
  }

  async _createAndSaveRandomAuthor() {
    return this.store
      .createRecord('author')
      .randomize()
      .save();
  }

  async _createAndSaveRandomBook(author, library) {
    return this.store
      .createRecord('book')
      .randomize(author, library)
      .save();
  }

  async _createAndSaveRandomBooksForAuthorInLibraries(author, libraries) {
    const bookCounter = Faker.random.number(10);

    const newBookPromises = _.range(bookCounter).map(async () => {
      const selectedLibrary = this._selectRandomLibrary(libraries);

      await this._createAndSaveRandomBook(author, selectedLibrary);
      await author.save();
      await selectedLibrary.save();
    })

    return all(newBookPromises);
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
    const recordsAreDestroying = records.map(item => item.destroyRecord());

    // Wrap all Promise in one common Promise, RSVP.all is our best friend in this process. ;)
    return all(recordsAreDestroying);
  }
}
