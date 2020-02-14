import Model, { attr, hasMany } from '@ember-data/model';
import { notEmpty } from '@ember/object/computed';
import Faker from 'faker';

export default Model.extend({

  name: attr('string'),
  address: attr('string'),
  phone: attr('string'),

  books: hasMany('book', { inverse: 'library', async: true }),

  isValid: notEmpty('name'),

  randomize() {
    this.set('name', Faker.company.companyName() + ' Library');
    this.set('address', this._fullAddress());
    this.set('phone', Faker.phone.phoneNumber());

    // If you would like to use in chain.
    return this;
  },

  _fullAddress() {
    return `${Faker.address.streetAddress()}, ${Faker.address.city()}`;
  }
});
