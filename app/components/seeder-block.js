import Component from '@ember/component';
import { action } from '@ember/object';
import { and, lte, not, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const MAX_VALUE = 100;

export default class SeederBlockComponent extends Component {
  @service('seeder') seederService;
  @tracked counter = null;
  @tracked readyMessage;

  @lte('counter', MAX_VALUE) isCounterValid;
  @not('isCounterValid') isCounterNotValid;

  placeholder = `Max ${MAX_VALUE}`;

  @or('isCounterNotValid', 'generateInProgress', 'deleteInProgress') generateIsDisabled;
  @or('generateInProgress', 'deleteInProgress') deleteIsDisabled;

  @action
  generate() {
    if (this.counter && this.isCounterValid) {
      this.seederFn(this.counter);
    }
  }

  @action
  delete() {
    this.destroyerFn();
  }
}
