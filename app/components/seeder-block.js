import Ember from 'ember';

const MAX_VALUE = 100;

export default Ember.Component.extend({

  counter: null,

  isCounterValid: Ember.computed.lte('counter', MAX_VALUE),
  placeholder: `Max ${MAX_VALUE}`,

  actions: {

    generateAction(volume) {
      if (this.get('isCounterValid')) {

        // Send down to fader-label component that we ready to show an info label
        this.set('showInfo', true);

        // Actions up to Seeder Controller, please create a few dummy record
        this.sendAction('generateAction', volume);
      }
    },

    deleteAction() {
      this.set('showInfo', true);
      this.sendAction('deleteAction');
    }

  }
});
