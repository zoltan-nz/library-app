import Component from '@ember/component';

export default Component.extend({

  tagName: 'select',
  classNames: ['form-control'],
  authors: null,
  book: null,

  //pass an action to override
  onChange() {},

  change(event) {
    const selectedAuthorId = event.target.value;
    const selectedAuthor = this.authors.find((record) => record.id === selectedAuthorId);
    this.onChange(selectedAuthor, this.book);
  }
});
