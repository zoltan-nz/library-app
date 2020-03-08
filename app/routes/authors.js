import Route from '@ember/routing/route';

export default class AuthorsRoute extends Route {

  model() {
    return this.store.findAll('author');
  }
}
