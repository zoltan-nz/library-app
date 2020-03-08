import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class LibrariesNewController extends Controller {
  buttonLabel = 'Create';
  title = 'Create a new library';

  @action
  saveLibrary(newLibrary) {
    newLibrary.save().then(() => this.transitionToRoute('libraries'));
  }
}
