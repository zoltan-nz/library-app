import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LibrariesEditController extends Controller {
  @service router;

  buttonLabel = 'Save changes';
  title = 'Edit library';

  @action
  async saveLibrary(newLibrary) {
    await newLibrary.save();
    this.router.transitionTo('libraries.index');
  }
}
