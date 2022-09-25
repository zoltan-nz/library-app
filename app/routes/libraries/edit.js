import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LibrariesEditRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('library', params.library_id);
  }

  renderTemplate() {
    this.render('libraries/form');
  }

  @action
  willTransition(transition) {
    const model = this.controllerFor('libraries.edit').model;
    if (model.hasDirtyAttributes) {
      const confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");
      confirmation ? model.rollbackAttributes() : transition.abort();
    }
  }
}
