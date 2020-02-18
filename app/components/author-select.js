import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {action} from "@ember/object";

export default class AuthorSelectComponent extends Component {
  @tracked authors = this.args.authors;
  @tracked book = this.args.book;
  
  //pass an action to override
  @tracked onChange = this.args.onChange;

  @action
  change(event) {
    const selectedAuthorId = event.target.value;
    const selectedAuthor = this.authors.find((record) => record.id === selectedAuthorId);
    this.onChange(selectedAuthor, this.book);
  }
}
