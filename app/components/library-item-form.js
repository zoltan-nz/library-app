import Ember from 'ember';

export default Ember.Component.extend({

  buttonLabel: 'Save',

  actions: {

    buttonClicked(param) {
      this.sendAction('action', param);
    }

  }
});
