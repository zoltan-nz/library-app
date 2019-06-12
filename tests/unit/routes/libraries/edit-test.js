import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const { spy, stub } = sinon;

module('Unit | Route | libraries/edit', hooks => {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.controller = EmberObject.create({
      model: EmberObject.create({
        hasDirtyAttributes: true,
        rollbackAttributes: spy()
      })
    });
    this.route = this.owner.factoryFor('route:libraries/edit').create({
      controller: this.controller,
      render: spy(),
      store: {
        findRecord: stub().returns('library')
      },
      transitionTo: spy()
    });
  });

  test('model hook', function(assert) {
    const params = {
      library_id: 42
    };
    assert.expect(2);
    assert.equal(this.route.model(params), 'library');
    assert.ok(this.route.store.findRecord.calledOnceWith('library', 42));
  });

  test('setupController function', function(assert) {
    const { controller, route } = this;
    route.setupController(controller);
    assert.expect(2);
    assert.equal(controller.get('title'), 'Edit library');
    assert.equal(controller.get('buttonLabel'), 'Save changes');
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
    const { controller, route } = this;
    const transition = {
      abort: spy()
    };
    stub(window, 'confirm').returns(true);
    route.send('willTransition', transition);
    assert.expect(5);
    assert.ok(confirm.calledOnceWith('Your changes haven\'t saved yet. Would you like to leave this form?'));
    assert.ok(controller.get('model').rollbackAttributes.calledOnce);
    assert.ok(transition.abort.notCalled);
    controller.get('model').rollbackAttributes.resetHistory();
    confirm.resetHistory();

    confirm.returns(false);
    route.send('willTransition', transition);
    assert.ok(controller.get('model').rollbackAttributes.notCalled);
    assert.ok(transition.abort.calledOnce);
    confirm.restore();
  });
});
