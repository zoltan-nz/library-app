import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    return this.store.findRecord('library', params.library_id);
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

      if (model.get('hasDirtyAttributes')) {
        var confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
