import Model, { attr } from '@ember-data/model';

export default class InvitationModel extends Model {
  @attr('string') email;
}
