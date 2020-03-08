import Controller from '@ember/controller';
import { action } from '@ember/object';
import { equal } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class LibrariesIndexController extends Controller {

  @tracked queryParams = ['filter', 'limit', 'letter'];
  @tracked filter = '';
  @tracked letter = '';
  @tracked limit = 'all';

  @equal('limit', 'all') limitAll;

  get filteredList() {

    let results = this.model;
    const query = this.filter;

    if (query) {
      // One of the best regular expression website: http://www.regexr.com/
      // Split the query at spaces and join them to get like this: /(word1)+.*(word2)+.*(word3)+.*/ig
      const regexString = '(' + query.split(' ').join(')+.*(') + ')+.*';
      // i: case insensitive, g: global
      const regex = new RegExp(regexString, 'ig');

      results = results.filter((item) => item.name.match(regex));
    }

    return results.sortBy('name');
  }

  @action
  deleteLibrary(library) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      library.destroyRecord();
    }
  }
}
