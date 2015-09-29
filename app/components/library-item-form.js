import Ember from 'ember';

export default Ember.Component.extend({
  buttonLabel: 'Save',

  actions: {
    buttonClicked: function(param){
      this.sendAction('action', param);
    }
  }
});
