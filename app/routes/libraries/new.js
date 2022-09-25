import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LibrariesNewRoute extends Route {
  @service store;

  model() {
    return this.store.createRecord('library');
  }

  renderTemplate() {
    this.render('libraries/form');
  }

  @action
  willTransition() {
    // rollbackAttributes() removes the record from the store
    // if the model 'isNew'
    this.controllerFor('libraries.new').model.rollbackAttributes();
  }
}
