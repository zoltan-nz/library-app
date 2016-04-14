import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Faker from 'faker';
import Ember from 'ember';

export default Model.extend({

  name: attr('string'),
  books: hasMany('book', {inverse: 'author', async: true}),

  isNotValid: Ember.computed.empty('name'),

  randomize() {
    this.set('name', Faker.name.findName());
    return this;
  }

});
