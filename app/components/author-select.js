import Component from '@ember/component';

export default Component.extend({

  tagName: 'select',
  classNames: ['form-control'],
  authors: null,
  book: null,

  change(event) {
    const selectedAuthorId = event.target.value;
    const selectedAuthor = this.get('authors').find((record) => record.id === selectedAuthorId);

    this.sendAction('action', selectedAuthor, this.get('book'));
  }
});
