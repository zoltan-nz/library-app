import Route from '@ember/routing/route';

export default class ContactsRoute extends Route {
  model() {
    return this.store.findAll('contact');
  }
}
