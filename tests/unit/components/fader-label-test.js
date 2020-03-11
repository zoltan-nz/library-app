import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { later } from '@ember/runloop';
import sinon from 'sinon';

const { spy } = sinon;

module('Unit | Component | fader-label', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.component = this.owner.lookup('component:fader-label');
  });

  test('tagName property', function(assert) {
    assert.expect(1);
    assert.equal(this.component.get('tagName'), 'span');
  });

  test('classNames property', function(assert) {
    assert.expect(1);
    assert.deepEqual(this.component.get('classNames'), ['label label-success label-fade']);
  });

  test('classNameBindings property', function(assert) {
    assert.expect(1);
    assert.deepEqual(this.component.get('classNameBindings'), ['isShowing:label-show']);
  });

  test('isShowing property', function(assert) {
    assert.expect(1);
    assert.equal(this.component.get('isShowing'), false);
  });

  test('isShowingChanged observer', function(assert) {
    const done = assert.async();
    const { component } = this;
    component.set('isShowing', true);
    assert.expect(1);
    later(() => {
      assert.equal(component.get('isShowing'), false);
      done();
    }, 3100);
  });

  test('resetRunLater function', function(assert) {
    const { component } = this;
    component.set('isShowing', true);
    component.resetRunLater();
    assert.expect(1);
    assert.equal(component.get('isShowing'), false);
  });

  test('willDestroy hook', function(assert) {
    const { component } = this;
    component.set('resetRunLater', spy());
    component.willDestroy();
    assert.expect(1);
    assert.ok(component.resetRunLater.calledOnce);
  });
});
