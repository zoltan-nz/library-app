import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('contact');
  },

  actions: {

    sendMessage: function(newContactMessage) {

      const controller = this.get('controller');

      newContactMessage.save().then(() => {
        controller.set('responseMessage', true);
      });
    }
  }
});
