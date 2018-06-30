import { computed } from '@ember/object';
import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({

  tagName: 'li',

  hrefForA: computed('models', 'qualifiedRouteName', function computeLinkToComponentHref() {
    let qualifiedRouteName = this.qualifiedRouteName;
    let models = this.models;

    if (this.loading) {
      return this.loadingHref;
    }

    let routing = this._routing;
    let queryParams = this.get('queryParams.values');
    return routing.generateURL(qualifiedRouteName, models, queryParams);
  })
});
