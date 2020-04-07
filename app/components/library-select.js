import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class LibrarySelectComponent extends Component {
  default = this.args.default;
  libraries = this.args.libraries;
  book = this.args.book;

  //pass an action to override
  onChange = this.args.onChange;

  @action
  change(event) {
    const selectedLibraryId = event.target.value;
    const selectedLibrary = this.libraries.find((record) => record.id === selectedLibraryId);
    this.onChange(selectedLibrary, this.book);
  }
}
