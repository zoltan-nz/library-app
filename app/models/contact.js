import { match, gte, and, not } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({

  email: DS.attr('string'),
  message: DS.attr('string'),

  isValidEmail: match('email', /^.+@.+\..+$/),
  isMessageEnoughLong: gte('message.length', 5),

  isValid: and('isValidEmail', 'isMessageEnoughLong'),
  isNotValid: not('isValid')
});
