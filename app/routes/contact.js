import { action } from '@ember/object';
import Route from '@ember/routing/route';

export default class ContactRoute extends Route {
  model() {
    return this.store.createRecord('contact');
  }

  @action
  willTransition() {
    let model = this.controllerFor('contact').get('model');

    if (model.isNew) {
      model.destroyRecord();
    }

    this.controllerFor('contact').set('responseMessage', false);
  }
}
