import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.createRecord('library');
  },

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Create a new library');
    controller.set('buttonLabel', 'Create');
  },

  renderTemplate() {
    this.render('libraries/form');
  },

  actions: {
    saveLibrary: function (newLibrary) {
      var _that = this;

      newLibrary.save().then(function () {
        _that.transitionTo('libraries');
      });
    },

    willTransition: function () {
      var model = this.controller.get('model');
      if (model.get('isNew')) {
        model.destroyRecord();
      }
    }
  }
});
