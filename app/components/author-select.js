import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'select',
  classNames: ['form-control'],
  authors: [],
  book: null,

  change(event) {
    const selectedAuthorId = event.target.value;
    const selectedAuthor = this.get('authors').find((record) => record.id === selectedAuthorId);

    this.sendAction('action', selectedAuthor, this.get('book'));
  }
});
