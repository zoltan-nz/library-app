import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const { spy, stub } = sinon;

module('Unit | Route | libraries/new', hooks => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.controller = EmberObject.create({
      model: {
        rollbackAttributes: spy()
      }
    });
    this.route = this.owner.factoryFor('route:libraries/new').create({
      controller: this.controller,
      render: spy(),
      store: {
        createRecord: stub().returns('library')
      },
      transitionTo: spy()
    });
  });

  test('model hook', function(assert) {
    assert.expect(2);
    assert.equal(this.route.model(), 'library');
    assert.ok(this.route.store.createRecord.calledOnceWith('library'));
  });

  test('setupController function', function(assert) {
    const { controller } = this;
    this.route.setupController(controller);
    assert.expect(2);
    assert.equal(controller.get('title'), 'Create a new library');
    assert.equal(controller.get('buttonLabel'), 'Create');
  });

  test('renderTemplate function', function(assert) {
    this.route.renderTemplate();
    assert.expect(1);
    assert.ok(this.route.render.calledOnceWith('libraries/form'));
  });

  test('saveLibrary action', function(assert) {
    const save = stub().returns({ then: stub().yields() });
    const newLibrary = { save };
    this.route.send('saveLibrary', newLibrary);
    assert.expect(2);
    assert.ok(save.calledOnce);
    assert.ok(this.route.transitionTo.calledOnceWith('libraries'));
  });

  test('willTransition action', function(assert) {
    this.route.send('willTransition');
    assert.expect(1);
    assert.ok(this.controller.get('model').rollbackAttributes.calledOnce);
  });
});
