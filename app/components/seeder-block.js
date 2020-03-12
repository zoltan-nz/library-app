import Component from '@ember/component';
import { action } from '@ember/object';
import { lte, not, or } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

const MAX_VALUE = 100;

export default class SeederBlockComponent extends Component {
  @tracked counter = null;

  @lte('counter', MAX_VALUE) isCounterValid;
  @not('isCounterValid') isCounterNotValid;

  placeholder = `Max ${MAX_VALUE}`;

  @or('isCounterNotValid', 'generateInProgress', 'deleteInProgress') generateIsDisabled;
  @or('generateInProgress', 'deleteInProgress') deleteIsDisabled;

  // pass actions to override
  handleGenerate() {}
  handleDelete() {}

  @action
  generate() {
    if (this.isCounterValid) {
      this.handleGenerate(this.counter);
    }
  }

  @action
  delete() {
    this.handleDelete();
  }
}
