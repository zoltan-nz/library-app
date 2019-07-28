import Controller from '@ember/controller';

export default Controller.extend({
  buttonLabel: 'Save changes',
  title: 'Edit library',

  actions: {
    saveLibrary(newLibrary) {
      newLibrary.save().then(() => this.transitionToRoute('libraries'));
    }
  }
});
