import Ember from 'ember';

const MAX_VALUE = 100;

export default Ember.Component.extend({

  counter: null,

  isCounterValid: Ember.computed.lte('counter', MAX_VALUE),
  isCounterNotValid: Ember.computed.not('isCounterValid'),
  placeholder: `Max ${MAX_VALUE}`,

  generateReady: false,
  deleteReady: false,

  generateInProgress: false,
  deleteInProgress: false,

  generateIsDisabled: Ember.computed.or('isCounterNotValid', 'generateInProgress', 'deleteInProgress'),
  deleteIsDisabled: Ember.computed.or('generateInProgress', 'deleteInProgress'),

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
