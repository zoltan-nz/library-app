import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    generateAction() {
      this.sendAction('generateAction');
    },

    deleteAction() {
      this.sendAction('deleteAction');
    }
  }
});
