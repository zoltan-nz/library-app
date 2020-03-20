import Model, { attr, hasMany } from '@ember-data/model';
import { empty } from '@ember/object/computed';
import Faker from 'faker';

export default class AuthorModel extends Model {
  @attr('string') name;
  @hasMany('book', { inverse: 'author', async: true }) books;

  @empty('name') isNotValid;

  randomize() {
    this.name = Faker.name.findName();

    // With returning the author instance, the function can be chainable,
    // for example `this.store.createRecord('author').randomize().save()`,
    // check in Seeder Controller.
    return this;
  }
}
