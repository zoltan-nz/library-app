import Controller from '@ember/controller';
import { action } from '@ember/object';
import { match, not } from '@ember/object/computed';

export default class HomeController extends Controller {

  headerMessage = 'Demo Home Page';
  responseMessage = '';
  emailAddress = '';

  @match('emailAddress', /^.+@.+\..+$/) isValid;
  @not('isValid') isDisabled;

  @action
  saveInvitation() {
    const newInvitation = this.store.createRecord('invitation', { email: this.emailAddress });

    newInvitation.save().then((response) => {
      this.set('responseMessage', `Thank you! We saved your email address with the following id: ${ response.id }`);
      this.set('emailAddress', '');
    });
  }
}
