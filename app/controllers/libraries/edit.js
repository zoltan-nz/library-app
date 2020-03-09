import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class LibrariesEditController extends Controller {
  buttonLabel = 'Save changes';
  title = 'Edit library';

  @action
  saveLibrary(newLibrary) {
    newLibrary.save().then(() => this.transitionToRoute('libraries'));
  }
}
