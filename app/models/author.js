import DS from 'ember-data';
import Faker from 'faker';

export default DS.Model.extend({

  name: DS.attr('string'),
  books: DS.hasMany('book', {inverse: 'author'}),

  isNotValid: Ember.computed.empty('name'),

  randomize() {
    this.set('name', Faker.name.findName());
    return this;
  }

});
