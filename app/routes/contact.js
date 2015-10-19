import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.createRecord('contact');
  },

  actions: {

    sendMessage: function(newContactMessage) {

      var _that = this;

      newContactMessage.save().then(function() {
        _that.controller.set('responseMessage', true);
      });
    },

    willTransition: function() {

      var model = this.controller.get('model');

      if (model.get('isNew')) {
        model.destroyRecord();
      }

      this.controller.set('responseMessage', false);
    }
  }
});
