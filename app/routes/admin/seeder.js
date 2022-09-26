import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { service } from '@ember/service';

export default class SeederRoute extends Route {
  @service store;

  // You can use these lines to experiment with route hooks.
  // Uncomment these and comment out the real implementation below.
  // Open inspection console in your browser and check how Ember call
  // each hook automatically.
  //
  //init() {
  //  debugger;
  //},
  //
  //beforeModel() {
  //  debugger;
  //},
  //
  //model() {
  //  debugger;
  //},
  //
  //afterModel() {
  //  debugger;
  //},
  //
  //setupController() {
  //  debugger;
  //},
  //
  //renderTemplate() {
  //  debugger;
  //},
  //
  //activate() {
  //  debugger;
  //}

  model() {
    return hash({
      libraries: this.store.findAll('library'),
      books: this.store.findAll('book'),
      authors: this.store.findAll('author'),
    });
  }
}
