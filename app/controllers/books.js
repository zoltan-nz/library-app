import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  authors: alias('model.authors'),
  books: alias('model.books'),
  libraries: alias('model.libraries'),

  actions: {
    editBook(book) {
      book.set('isEditing', true);
    },

    cancelBookEdit(book) {
      book.set('isEditing', false);
      book.rollbackAttributes();
    },

    saveBook(book) {
      if (book.get('isNotValid')) {
        return;
      }

      book.set('isEditing', false);
      book.save();
    },

    editAuthor(book) {
      book.set('isAuthorEditing', true);
    },

    cancelAuthorEdit(book) {
      book.set('isAuthorEditing', false);
      book.rollbackAttributes();
    },

    saveAuthor(author, book) {
      // Firebase adapter is buggy, we have to manually remove the previous relation
      book.get('author').then((previousAuthor) => {
        previousAuthor.get('books').then((previousAuthorBooks) => {
          previousAuthorBooks.removeObject(book);
          previousAuthor.save();
        });
      });

      // Setup the new relation
      book.set('author', author);
      book.save().then(() => author.save());
      book.set('isAuthorEditing', false);
    },

    editLibrary(book) {
      book.set('isLibraryEditing', true);
    },

    cancelLibraryEdit(book) {
      book.set('isLibraryEditing', false);
      book.rollbackAttributes();
    },

    saveLibrary(library, book) {
      // Firebase adapter is buggy, we have to manually remove the previous relation.
      // You don't need this callback mess when your adapter properly manages relations.
      // If Firebase fix this bug, we can remove this part.
      book.get('library').then((previousLibrary) => {
        previousLibrary.get('books').then((previousLibraryBooks) => {
          previousLibraryBooks.removeObject(book);
          previousLibrary.save();
        });
      });

      book.set('library', library);
      book.save().then(() => library.save());
      book.set('isLibraryEditing', false);
    }
  }
});
