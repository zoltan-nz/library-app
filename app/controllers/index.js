import Controller from '@ember/controller';
import { action } from '@ember/object';
import { match, not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {

  headerMessage = 'Demo Home Page';
  @tracked responseMessage = '';
  @tracked emailAddress = '';

  @match('emailAddress', /^.+@.+\..+$/) isValid;
  @not('isValid') isDisabled;

  @action
  saveInvitation() {
    const newInvitation = this.store.createRecord('invitation', { email: this.emailAddress });

    newInvitation.save().then(response => {
      this.responseMessage = `Thank you! We saved your email address with the following id: ${ response.id }`;
      this.emailAddress = '';
    });
  }
}
