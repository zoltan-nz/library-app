import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.createRecord('library');
  },

  actions: {
    saveLibrary: function (newLibrary) {
      var _that = this;

      newLibrary.save().then(function (response) {
        _that.transitionTo('libraries');
      })
    },

    willTransition: function (transition) {
      var model = this.controller.get('model');
      if (model.get('isNew')) {
        model.destroyRecord();
      }
    }
  }
});
