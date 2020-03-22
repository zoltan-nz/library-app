import { later, cancel } from '@ember/runloop';
// eslint-disable-next-line ember/no-observers
import { observer } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/component';
import { action } from '@ember/object';

export const FADER_LABEL_LATENCY = 3000;

export default class FaderLabelComponent extends Component {

  @tracked isShowing = false;
  @tracked faderLabelLatency = FADER_LABEL_LATENCY;

  @action
  showLabel = this.args.showLabel(this.isShowing);

  // // eslint-disable-next-line ember/no-observers
  // isShowingChanged: observer('isShowing', function() {
  //   // User can navigate away from this page in less than 3 seconds, so this component will be destroyed,
  //   // however our "setTimeout" task try to run.
  //   // We save this task in a local variable, so we can clean up during the destroy process.
  //   // Otherwise you will see a "calling set on destroyed object" error.
  //   this._runLater = later(() => this.set('isShowing', false), this.faderLabelLatency);
  // }),

  resetRunLater() {
    this.set('isShowing', false);
    cancel(this._runLater);
  }

  willDestroy() {
    this.resetRunLater();
    this._super(...arguments);
  }
};
