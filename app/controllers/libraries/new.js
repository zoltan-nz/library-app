import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LibrariesNewController extends Controller {
  @service router;

  buttonLabel = 'Create';
  title = 'Create a new library';

  @action
  async saveLibrary(newLibrary) {
    await newLibrary.save();
    this.router.transitionTo('libraries.index');
  }
}
