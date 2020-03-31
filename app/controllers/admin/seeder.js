import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SeederController extends Controller {
  @service('seeder') seederService;

  @tracked authors = this.model.authors;
  @tracked libraries = this.model.libraries;
  @tracked books = this.model.books;
}
