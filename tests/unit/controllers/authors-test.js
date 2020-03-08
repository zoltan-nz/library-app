import EmberObject from '@ember/object';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

const { spy } = sinon;

module('Unit | Controller | authors', function(hooks) {
  let controller;
  setupTest(hooks);

  hooks.beforeEach(function() {
    controller = this.owner.lookup('controller:authors');
  });

  test('editAuthor action', function(assert) {
    const author = EmberObject.create();
    controller.editAuthor(author);
    assert.ok(author.isEditing);
  });

  test('cancelAuthorEdit action', function(assert) {
    const rollbackAttributes = spy();
    const author = EmberObject.create({
      rollbackAttributes
    });
    controller.cancelAuthorEdit(author);
    assert.notOk(author.isEditing);
    assert.ok(rollbackAttributes.calledOnce);
  });

  test('saveAuthor action', function(assert) {
    const save = spy();
    const author = EmberObject.create({
      isEditing: true,
      isNotValid: true,
      save
    });
    controller.saveAuthor(author);
    assert.expect(4);
    assert.ok(author.isEditing);
    assert.ok(save.notCalled);
    save.resetHistory();

    author.set('isNotValid', false);
    controller.saveAuthor(author);
    assert.notOk(author.isEditing);
    assert.ok(save.calledOnce);
  });
});
