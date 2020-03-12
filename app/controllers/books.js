import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BooksController extends Controller {
  @tracked authors = this.model.authors;
  @tracked books = this.model.books;
  @tracked libraries = this.model.libraries;

  @action
  editBook(book) {
    book.isEditing = true;
  }

  @action
  cancelBookEdit(book) {
    book.isEditing = false;
    book.rollbackAttributes();
  }

  @action
  saveBook(book) {
    book.isEditing = false;
    book.save();
  }

  @action
  editAuthor(book) {
    book.isAuthorEditing = true;
  }

  @action
  cancelAuthorEdit(book) {
    book.isAuthorEditing = false;
    book.rollbackAttributes();
  }

  @action
  saveAuthor(author, book) {
    book.author = author;
    book.save();
    book.isAuthorEditing = false;
  }

  @action
  editLibrary(book) {
    book.isLibraryEditing = true;
  }

  @action
  cancelLibraryEdit(book) {
    book.isLibraryEditing = false;
    book.rollbackAttributes();
  }

  @action
  saveLibrary(library, book) {
    book.library = library;
    book.save();
    book.isLibraryEditing = false;
  }
}
