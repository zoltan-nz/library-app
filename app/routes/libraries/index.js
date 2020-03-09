import Route from '@ember/routing/route';

export default class LibrariesIndexRoute extends Route {

  queryParams = {
    limit: { refreshModel: true },
    letter: { refreshModel: true }
  }

  model(params) {

    if (params.limit === 'all') {
      return this.store.findAll('library');
    }

    return this.store.query('library', {
      orderBy: 'name',
      startAt: params.letter,
      endAt: params.letter+"\uf8ff"
    });
  }
}
