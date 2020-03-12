import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LibrarySelectComponent extends Component {
  @tracked default = this.args.default;
  @tracked libraries = this.args.libraries;
  @tracked book = this.args.book;

  //pass an action to override
  @tracked onChange = this.args.onChange;

  @action
  change(event) {
    const selectedLibraryId = event.target.value;
    const selectedLibrary = this.libraries.find(record => record.id === selectedLibraryId);
    this.onChange(selectedLibrary, this.book);
  }
}
