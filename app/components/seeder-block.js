import Ember from 'ember';

const MAX_VALUE = 100;

export default Ember.Component.extend({

  counter: null,

  isCounterValid: Ember.computed.lte('counter', MAX_VALUE),
  placeholder: `Max ${MAX_VALUE}`,

  createReady: false,
  deleteReady: false,

  actions: {

    generateAction() {
      if (this.get('isCounterValid')) {

        // Action up to Seeder Controller with the requested amount
        this.sendAction('generateAction', this.get('counter'));
      }
    },

    deleteAction() {
      this.sendAction('deleteAction');
    }

  }
});
