import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LibrariesEditRoute extends Route {
  @service router;
  @service store;

  showConfirmation = async (transition) => {
    if (!transition.to.find((route) => route.name === 'libraries.edit')) {
      const model = this.controller.model;
      if (model.hasDirtyAttributes) {
        const confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");
        confirmation ? model.rollbackAttributes() : transition.abort();
      }
    }
  };

  activate() {
    this.router.on('routeWillChange', this.showConfirmation);
  }

  deactivate() {
    this.router.off('routeWillChange', this.showConfirmation);
  }

  model(params) {
    return this.store.findRecord('library', params.library_id);
  }
}
