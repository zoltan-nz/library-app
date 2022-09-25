import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { service } from '@ember/service';

export default class BooksRoute extends Route {
  @service store;

  model() {
    return hash({
      books: this.store.findAll('book'),
      authors: this.store.findAll('author'),
      libraries: this.store.findAll('library'),
    });
  }
}
