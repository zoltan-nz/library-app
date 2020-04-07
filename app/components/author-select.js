import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class AuthorSelectComponent extends Component {
  default = this.args.default;
  authors = this.args.authors;
  book = this.args.book;

  //pass an action to override
  onChange = this.args.onChange;

  @action
  change(event) {
    const selectedAuthorId = event.target.value;
    const selectedAuthor = this.authors.find((record) => record.id === selectedAuthorId);
    this.onChange(selectedAuthor, this.book);
  }
}
