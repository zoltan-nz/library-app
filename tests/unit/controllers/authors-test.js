import {module, test} from 'qunit';
import {setupTest} from 'ember-qunit';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const {spy} = sinon;

module('Unit | Controller | authors', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:authors');
    assert.ok(controller);
  });

  test('editAuthor action', function(assert) {
    const author = EmberObject.create();
    this.route.send('editAuthor', author);
    assert.ok(author.get('isEditing'));
  });

  test('cancelAuthorEdit action', function(assert) {
    const rollbackAttributes = spy();
    const author = EmberObject.create({
      rollbackAttributes
    });
    this.route.send('cancelAuthorEdit', author);
    assert.notOk(author.get('isEditing'));
    assert.ok(rollbackAttributes.calledOnce);
  });

  test('saveAuthor action', function(assert) {
    const save = spy();
    const author = EmberObject.create({
      isEditing: true,
      isNotValid: true,
      save
    });
    this.route.send('saveAuthor', author);
    assert.expect(4);
    assert.ok(author.get('isEditing'));
    assert.ok(save.notCalled);
    save.resetHistory();

    author.set('isNotValid', false);
    this.route.send('saveAuthor', author);
    assert.notOk(author.get('isEditing'));
    assert.ok(save.calledOnce);
  });
});
