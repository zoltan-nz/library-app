import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const { spy, stub } = sinon;

module('Unit | Route | authors', hooks => {
  setupTest(hooks);


  hooks.beforeEach(function() {
    this.findAll = stub().returns('authors');
    this.route = this.owner.factoryFor('route:authors').create({
      store: { findAll: this.findAll }
    });
  });

  test('model hook', function(assert) {
    assert.expect(2);
    assert.equal(this.route.model(), 'authors');
    assert.ok(this.findAll.calledOnceWith('author'));
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
