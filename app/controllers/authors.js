import Controller from '@ember/controller';
import {action} from '@ember/object';

export default class AuthorsController extends Controller {

  @action
  editAuthor(author) {
    author.set('isEditing', true);
  }

  @action
  cancelAuthorEdit(author) {
    author.set('isEditing', false);
    author.rollbackAttributes();
  }

  @action
  saveAuthor(author) {
    if (author.get('isNotValid')) {
      return;
    }

    author.set('isEditing', false);
    author.save();
  }
}
