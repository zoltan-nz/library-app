import Model, { attr } from '@ember-data/model';
import { match, gte, and, not } from '@ember/object/computed';

export default Model.extend({

  email: attr('string'),
  message: attr('string'),

  isValidEmail: match('email', /^.+@.+\..+$/),
  isMessageLongEnough: gte('message.length', 5),

  isValid: and('isValidEmail', 'isMessageLongEnough'),
  isNotValid: not('isValid')
});
