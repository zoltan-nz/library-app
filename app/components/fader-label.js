import { later, cancel } from '@ember/runloop';
import { observer } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',

  classNames: ['label label-success label-fade'],
  classNameBindings: ['isShowing:label-show'],

  isShowing: false,

  isShowingChanged: observer('isShowing', function() {

    // User can navigate away from this page in less than 3 seconds, so this component will be destroyed,
    // however our "setTimeout" task try to run.
    // We save this task in a local variable, so we can clean up during the destroy process.
    // Otherwise you will see a "calling set on destroyed object" error.
    this._runLater = later(() => this.set('isShowing', false), 3000);
  }),

  resetRunLater() {
    this.set('isShowing', false);
    cancel(this._runLater);
  },

  willDestroy() {
    this.resetRunLater();
    this._super(...arguments);
  }
});
