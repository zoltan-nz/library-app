import Component from '@ember/component';
import { action } from '@ember/object';
import { lte, not, or } from '@ember/object/computed';
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

  @or('isCounterNotValid', 'seedingInProgress', 'deletingInProgress') generateIsDisabled;
  @or('seedingInProgress', 'deletingInProgress') deleteIsDisabled;

  @action
  generate() {
    if (this.counter && this.isCounterValid) {
      this.seederTask.perform(this.counter);
    }
  }

  @action
  delete() {
    this.destroyerTask.perform();
  }
}
