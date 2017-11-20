import Component from '@ember/component';

export default Component.extend({

  buttonLabel: 'Save',

  actions: {

    buttonClicked(param) {
      this.sendAction('action', param);
    }

  }
});
