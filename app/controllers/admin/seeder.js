import { all } from 'rsvp';
import Controller from '@ember/controller';
import Faker from "faker";

export default Controller.extend({

  actions: {

    generateLibraries(volume) {

      // Progress flag, data-down to seeder-block where our lovely button will show a spinner...
      this.set('generateLibrariesInProgress', true);

      const counter = parseInt(volume);
      let savedLibraries = [];

      for (let i = 0; i < counter; i++) {

        // Collect all Promise in an array
        savedLibraries.push(this._saveRandomLibrary());
      }

      // Wait for all Promise to fulfill so we can show our label and turn off the spinner.
      all(savedLibraries)
        .then(() => {
          this.set('generateLibrariesInProgress', false);
          this.set('libDone', true)
        });
    },

    deleteLibraries() {

      // Progress flag, data-down to seeder-block button spinner.
      this.set('deleteLibrariesInProgress', true);

      // Our local _destroyAll return a promise, we change the label when all records destroyed.
      this._destroyAll(this.get('libraries'))

        // Data down via seeder-block to fader-label that we ready to show the label.
        // Change the progress indicator also, so the spinner can be turned off.
        .then(() => {
          this.set('libDelDone', true);
          this.set('deleteLibrariesInProgress', false);
        });
    },

    generateBooksAndAuthors(volume) {

      // Progress flag, data-down to seeder-block button spinner.
      this.set('generateBooksInProgress', true);

      const counter = parseInt(volume);
      let booksWithAuthors = [];

      for (let i = 0; i < counter; i++) {

        // Collect Promises in an array.
        const books = this._saveRandomAuthor().then(newAuthor => this._generateSomeBooks(newAuthor));
        booksWithAuthors.push(books);
      }

      // Let's wait until all async save resolved, show a label and turn off the spinner.
      all(booksWithAuthors)

        // Data down via seeder-block to fader-label that we ready to show the label
        // Change the progress flag also, so the spinner can be turned off.
        .then(() => {
          this.set('authDone', true);
          this.set('generateBooksInProgress', false);
        });
    },

    deleteBooksAndAuthors() {

      // Progress flag, data-down to seeder-block button to show spinner.
      this.set('deleteBooksInProgress', true);

      const authors = this.get('authors');
      const books = this.get('books');

      // Remove authors first and books later, finally show the label.
      this._destroyAll(authors)
        .then(() => this._destroyAll(books))

        // Data down via seeder-block to fader-label that we ready to show the label
        // Delete is finished, we can turn off the spinner in seeder-block button.
        .then(() => {
          this.set('authDelDone', true);
          this.set('deleteBooksInProgress', false);
        });
    }
  },

  // Private methods

  // Create a new library record and uses the randomizator, which is in our model and generates some fake data in
  // the new record. After we save it, which is a promise, so this returns a promise.
  _saveRandomLibrary() {
    return this.store.createRecord('library').randomize().save();
  },

  _saveRandomAuthor() {
    return this.store.createRecord('author').randomize().save();
  },

  _generateSomeBooks(author) {
    const bookCounter = Faker.random.number(10);
    let books = [];

    for (let j = 0; j < bookCounter; j++) {
      const library = this._selectRandomLibrary();

      // Creating and saving book, saving the related records also are take while, they are all a Promise.
      const bookPromise =
        this.store.createRecord('book')
          .randomize(author, library)
          .save()
          .then(() => author.save())

          // guard library in case if we don't have any
          .then(() => library && library.save());
      books.push(bookPromise)
    }

    // Return a Promise, so we can manage the whole process on time
    return all(books);
  },

  _selectRandomLibrary() {

    // Please note libraries are records from store, which means this is a DS.RecordArray object, it is extended from
    // Ember.ArrayProxy. If you need an element from this list, you cannot just use libraries[3], we have to use
    // libraries.objectAt(3)
    const libraries = this.get('libraries');
    const size = libraries.get('length');

    // Get a random number between 0 and size-1
    const randomItem = Faker.random.number(size - 1);
    return libraries.objectAt(randomItem);
  },

  _destroyAll(records) {

    // destroyRecord() is a Promise and will be fulfilled when the backend database is confirmed the delete
    // lets collect these Promises in an array
    const recordsAreDestroying = records.map(item => item.destroyRecord());

    // Wrap all Promise in one common Promise, RSVP.all is our best friend in this process. ;)
    return all(recordsAreDestroying);
  }
});
