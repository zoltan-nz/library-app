import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['filter'],
  search: '',

  filteredList: Ember.computed('model.@each.name', 'filter', function() {

    var results = this.get('model');
    const query = this.get('filter');

    if (!!query) {
      // Playing with regular expressions use this website: http://www.regexr.com/
      // Split the query at spaces and join them to get like this: /(word1)+.*(word2)+.*(word3)+.*/ig
      const regexString = '(' + query.split(' ').join(')+.*(') + ')+.*';
      // i: case insensitive, g: global
      const regex = new RegExp(regexString, 'ig');

      results =  results.filter(function(item) {
        return item.get('name').match(regex);
      });
    }

    return results;
  })

});
