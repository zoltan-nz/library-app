import Model, { attr } from '@ember-data/model';
import { and, gte, match, not } from '@ember/object/computed';
import classic from 'ember-classic-decorator';

@classic
export default class ContactModel extends Model {
  @attr('string') email;
  @attr('string') message;

  @match('email', /^.+@.+\..+$/) isValidEmail;
  @gte('message.length', 5) isMessageLongEnough;

  @and('isValidEmail', 'isMessageLongEnough') isValid;
  @not('isValid') isNotValid;
}
