import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['filter', 'limit', 'letter'],
  filter: '',
  letter: '',
  limit: 'all',

  limitAll: Ember.computed.equal('limit', 'all'),

  filteredList: Ember.computed('model.@each.name', 'filter', function() {

    let results = this.get('model');
    const query = this.get('filter');

    if (!!query) {
      // One of the best regular expression website: http://www.regexr.com/
      // Split the query at spaces and join them to get like this: /(word1)+.*(word2)+.*(word3)+.*/ig
      const regexString = '(' + query.split(' ').join(')+.*(') + ')+.*';
      // i: case insensitive, g: global
      const regex = new RegExp(regexString, 'ig');

      results = results.filter((item) => item.get('name').match(regex));
    }

    return results.sortBy('name');
  })

});
