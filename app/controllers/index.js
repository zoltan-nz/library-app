import { match, not } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({

  headerMessage: 'Demo Home Page',
  responseMessage: '',
  emailAddress: '',

  isValid: match('emailAddress', /^.+@.+\..+$/),
  isDisabled: not('isValid'),

  actions: {

    saveInvitation() {
      const email = this.emailAddress;

      const newInvitation = this.store.createRecord('invitation', {
        email: email
      });

      newInvitation.save().then((response) => {
        this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
        this.set('emailAddress', '');
      });

    }
  }

});
