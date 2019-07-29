import Component from '@ember/component';

export default Component.extend({

  buttonLabel: 'Save',

  // pass an action to override
  handleClick() {},

  actions: {
    buttonClicked(param) {
      this.handleClick(param);
    }
  }
});
