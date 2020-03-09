import { action } from '@ember/object';
import Route from '@ember/routing/route';

export default class LibrariesEditRoute extends Route {

  model(params) {
    return this.store.findRecord('library', params.library_id);
  }

  renderTemplate() {
    this.render('libraries/form');
  }

  @action
  willTransition(transition) {
    const model = this.controller.model;
    if (model.hasDirtyAttributes) {
      const confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");
      confirmation ? model.rollbackAttributes() : transition.abort();
    }
  }
}
