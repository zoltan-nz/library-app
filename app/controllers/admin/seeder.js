import Ember from 'ember';
import Faker from 'faker';

export default Ember.Controller.extend({

  libraries: [],
  books: [],
  authors: [],

  actions: {

    generateLibraries() {
      const counter = parseInt(this.get('librariesCounter'));

      for (let i = 0; i < counter; i++) {
        this.store.createRecord('library').randomize().save().then(() => {
          if (i === counter-1) {
            this.set('librariesCounter', 0);
            this.set('libDone', true);
          }
        });
      }
    },

    deleteLibraries() {
      this._destroyAll(this.get('libraries'));

      this.set('libDelDone', true);
    },

    generateBooksAndAuthors() {
      const counter = parseInt(this.get('authorCounter'));

      for (let i = 0; i < counter; i++) {
        let newAuthor = this.store.createRecord('author');
        newAuthor.randomize()
          .save().then(() => {
             if (i === counter-1) {
               this.set('authorCounter', 0);
               this.set('authDone', true);
             }
          }
        );

        this._generateSomeBooks(newAuthor);
      }
    },

    deleteBooksAndAuthors() {
      this._destroyAll(this.get('books'));
      this._destroyAll(this.get('authors'));

      this.set('authDelDone', true);
    }
  },

  // Private methods

  _generateSomeBooks(author) {
    const bookCounter = Faker.random.number(10);

    for (let j = 0; j < bookCounter; j++) {
      const library = this._selectRandomLibrary();
      this.store.createRecord('book')
        .randomize(author, library)
        .save();
      author.save();
      library.save();
    }
  },

  _selectRandomLibrary() {
    const libraries = this.get('libraries');
    const librariesCounter = libraries.get('length');

    // Create a new array form ids
    const libraryIds = libraries.map((lib) => {return lib.get('id');});
    const randomNumber = Faker.random.number(librariesCounter-1);

    const randomLibrary = libraries.findBy('id', libraryIds[randomNumber]);
    return randomLibrary;
  },

  _destroyAll(records) {
    records.forEach((item) => {
      item.destroyRecord();
    });
  }

});
