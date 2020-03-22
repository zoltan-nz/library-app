import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Faker from 'faker';
import { all } from 'rsvp';
import { inject as service } from '@ember/service';

export default class SeederController extends Controller {
  @service('seeder') seederService;

  @tracked authors = this.model.authors;
  @tracked libraries = this.model.libraries;
  @tracked books = this.model.books;

}
