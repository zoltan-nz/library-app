import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LibrariesNewRoute extends Route {
  @service router;
  @service store;

  deleteEmptyLibraryOnRouteChange = async (transition) => {
    if (!transition.to.find((route) => route.name === 'libraries.new')) {
      const model = this.controller.model;
      if (model.isNew) {
        await model.destroyRecord();
        return this.router.transitionTo(transition.to.name);
      }
    }
  };

  activate() {
    this.router.on('routeWillChange', this.deleteEmptyLibraryOnRouteChange);
  }

  deactivate() {
    this.router.off('routeWillChange', this.deleteEmptyLibraryOnRouteChange);
  }

  model() {
    return this.store.createRecord('library');
  }
}
