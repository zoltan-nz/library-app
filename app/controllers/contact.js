import Controller from '@ember/controller';
import { action } from '@ember/object';
import classic from 'ember-classic-decorator';

@classic
export default class ContactController extends Controller {
  @action
  sendMessage(newContactMessage) {
    newContactMessage.save().then(() => this.set('responseMessage', true));
  }
}
