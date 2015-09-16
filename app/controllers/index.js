import Ember from 'ember';

export default Ember.Controller.extend({

  headerMessage: 'Coming Soon',
  responseMessage: '',
  emailAddress: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),

  actions: {
    sendInvitation: function() {
      var email = this.get('emailAddress');
      alert('Sending in progress... To: ' + email);
      this.set('responseMessage', "Thank you! We've just sent an email to the following address: " + email);
      this.set('emailAddress', '');
    }
  }

});
