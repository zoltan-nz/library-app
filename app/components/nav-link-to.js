import { computed } from '@ember/object';
import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({

  tagName: 'li',

  hrefForA: computed(
    '_currentRouterState',
    '_route',
    '_models',
    '_query',
    'tagName',
    'loading',
    'loadingHref',
    function computeLinkToComponentHref() {
      if (this.loading) {
        return this.loadingHref;
      }

      const { _route: route, _models: models, _query: query, _routing: routing } = this;

      return routing.generateURL(route, models, query);
    }
  )
});
