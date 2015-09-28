import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.findAll('library');
  },

  actions: {
    deleteLibrary: function(library) {
      var confirmation = confirm('Are you sure?');

      if (confirmation) {
        library.destroyRecord();
      }
    }
  }

})
