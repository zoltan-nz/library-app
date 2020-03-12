import { tracked } from '@glimmer/tracking';
import Model, { attr, belongsTo } from '@ember-data/model';
import Faker from 'faker';

export default class Book extends Model {
  @attr('string') title;
  @attr('date') releaseYear;

  @belongsTo('author', { inverse: 'books', async: true }) author;
  @belongsTo('library', { inverse: 'books', async: true }) library;

  // For tracking editing state in Books Page
  @tracked isEditing = false;
  @tracked isAuthorEditing = false;
  @tracked isLibraryEditing = false;

  @tracked isNotValid;

  randomize(author, library) {
    this.set('title', this._bookTitle());
    this.set('author', author);
    this.set('releaseYear', this._randomYear());
    this.set('library', library);

    return this;
  }

  _bookTitle() {
    return `${Faker.commerce.productName()} Cookbook`;
  }

  _randomYear() {
    return new Date(this._getRandomArbitrary(1900, 2015).toPrecision(4));
  }

  _getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
