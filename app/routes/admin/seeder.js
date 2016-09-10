import Ember from 'ember';

export default Ember.Route.extend({

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
    return Ember.RSVP.hash({
      libraries: this.store.findAll('library'),
      books: this.store.findAll('book'),
      authors: this.store.findAll('author')
    });
  },

  // Finally, I just created aliases in the Seeder Controller, so we can comment this out now.
  // setupController(controller, model) {
  //   controller.set('libraries', model.libraries);
  //   controller.set('books', model.books);
  //   controller.set('authors', model.authors);
  // }
});
