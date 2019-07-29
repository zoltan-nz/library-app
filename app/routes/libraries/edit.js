import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    return this.store.findRecord('library', params.library_id);
  },

  renderTemplate() {
    this.render('libraries/form');
  },

  actions: {
    willTransition(transition) {
      const model = this.controller.get('model');
      if (model.get('hasDirtyAttributes')) {
        const confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");
        confirmation ? model.rollbackAttributes() : transition.abort();
      }
    }
  }
});
