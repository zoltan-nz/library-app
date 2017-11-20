import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  atoz: computed(function() {

    // Source: http://stackoverflow.com/questions/12376870/create-an-array-of-characters-from-specified-range
    return Array.apply(null, { length: 26 }).map((x, i) => String.fromCharCode(97 + i).toUpperCase());
  })
});
