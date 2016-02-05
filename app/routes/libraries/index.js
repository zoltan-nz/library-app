import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    limit: { refreshModel: true },
    letter: { refreshModel: true }
  },

  model(params) {

    if (params.limit === 'all') {
      return this.store.findAll('library');
    }

    return this.store.query('library', {
      orderBy: 'name',
      startAt: params.letter,
      endAt: params.letter+"\uf8ff"
    });
  },

  actions: {

    deleteLibrary(library) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        library.destroyRecord();
      }
    }
  }

});
