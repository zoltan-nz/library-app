import Component from '@ember/component';

export default Component.extend({

  tagName: 'select',
  classNames: ['form-control'],
  libraries: null,
  book: null,

  //pass an action to override
  onChange() {},

  change(event) {
    const selectedLibraryId = event.target.value;
    const selectedLibrary = this.libraries.find((record) => record.id === selectedLibraryId);
    this.onChange(selectedLibrary, this.book);
  }
});
