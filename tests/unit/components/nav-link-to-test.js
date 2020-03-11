import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

const { spy } = sinon;

module('Unit | Component | nav-link-to', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    const component = {
      route: 'index',
      _models: [],
      loading: true,
      loadingHref: '#',
      _routing: {
        generateURL: spy(),
      },
      _query: 'query',
    };
    this.component = this.owner.factoryFor('component:nav-link-to').create(component);
  });

  test('tagName property', function(assert) {
    assert.expect(1);
    assert.equal(this.component.tagName, 'li');
  });

  test('hrefForA computed property', function(assert) {
    const { component } = this;
    assert.expect(3);
    assert.equal(component.hrefForA, '#');
    assert.notOk(component._routing.generateURL.called);
    component._routing.generateURL.resetHistory();

    component.setProperties({
      loading: false,
      route: 'libraries',
    });
    component.hrefForA;
    assert.ok(component._routing.generateURL.calledOnceWith('libraries', [], 'query'));
  });
});
