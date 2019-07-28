import Controller from '@ember/controller';

export default Controller.extend({
  buttonLabel: 'Create',
  title: 'Create a new library',

  actions: {
    saveLibrary(newLibrary) {
      newLibrary.save().then(() => this.transitionToRoute('libraries'));
    }
  }
});
