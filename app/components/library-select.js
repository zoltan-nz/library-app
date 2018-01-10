import Component from '@ember/component';

export default Component.extend({

  tagName: 'select',
  classNames: ['form-control'],
  libraries: null,
  book: null,

  change(event) {
    const selectedLibraryId = event.target.value;
    const selectedLibrary = this.get('libraries').find((record) => record.id === selectedLibraryId);

    this.sendAction('action', selectedLibrary, this.get('book'));
  }
});
