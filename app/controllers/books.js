import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class BooksController extends Controller {
  @alias('model.authors') authors;
  @alias('model.books') books;
  @alias('model.libraries') libraries;

  @action
  editBook(book) {
    book.set('isEditing', true);
  }

  @action
  cancelBookEdit(book) {
    book.set('isEditing', false);
    book.rollbackAttributes();
  }

  @action
  saveBook(book) {
    if (book.isNotValid) {
      return;
    }

    book.set('isEditing', false);
    book.save();
  }

  @action
  editAuthor(book) {
    book.set('isAuthorEditing', true);
  }

  @action
  cancelAuthorEdit(book) {
    book.set('isAuthorEditing', false);
    book.rollbackAttributes();
  }

  @action
  saveAuthor(author, book) {
    // Firebase adapter is buggy, we have to manually remove the previous relation
    book.author.then(previousAuthor => {
      previousAuthor.books.then(previousAuthorBooks => {
        previousAuthorBooks.removeObject(book);
        previousAuthor.save();
      });
    });

    // Setup the new relation
    book.set('author', author);
    book.save().then(() => author.save());
    book.set('isAuthorEditing', false);
  }

  @action
  editLibrary(book) {
    book.set('isLibraryEditing', true);
  }

  @action
  cancelLibraryEdit(book) {
    book.set('isLibraryEditing', false);
    book.rollbackAttributes();
  }

  @action
  saveLibrary(library, book) {
    // Firebase adapter is buggy, we have to manually remove the previous relation.
    // You don't need this callback mess when your adapter properly manages relations.
    // If Firebase fix this bug, we can remove this part.
    book.library.then(previousLibrary => {
      previousLibrary.books.then(previousLibraryBooks => {
        previousLibraryBooks.removeObject(book);
        previousLibrary.save();
      });
    });

    book.set('library', library);
    book.save().then(() => library.save());
    book.set('isLibraryEditing', false);
  }
}
