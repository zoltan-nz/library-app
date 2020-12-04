import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

const { spy } = sinon;

module('Unit | Component | library-item-form', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.component = this.owner.lookup('component:library-item-form');
  });

  skip('default action exists', function (assert) {
    assert.expect(1);
    assert.equal(this.component.handleClick, undefined);
  });

  skip('buttonClicked action', function (assert) {
    const { component } = this;
    component.set('handleClick', spy());
    component.send('buttonClicked', 'test');
    assert.expect(1);
    assert.ok(component.handleClick.calledOnceWith('test'));
  });
});
