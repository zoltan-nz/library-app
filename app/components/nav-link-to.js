import { computed } from '@ember/object';
import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({

  tagName: 'li',

  hrefForA: computed('models', 'qualifiedRouteName', function computeLinkToComponentHref() {
    let qualifiedRouteName = this.get('qualifiedRouteName');
    let models = this.get('models');

    if (this.get('loading')) {
      return this.get('loadingHref');
    }

    let routing = this.get('_routing');
    let queryParams = this.get('queryParams.values');
    return routing.generateURL(qualifiedRouteName, models, queryParams);
  })
});
