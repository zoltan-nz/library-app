import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import sinon from 'sinon';

const { spy } = sinon;

module('Unit | Component | nav-link-to', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    const component = {
      qualifiedRouteName: 'index',
      models: [],
      loading: true,
      loadingHref: '#',
      _routing: {
        generateURL: spy()
      },
      queryParams: EmberObject.create({
        values: 'test'
      })

    };
    this.component = this
      .owner
      .factoryFor('component:nav-link-to')
      .create(component);
  });

  test('tagName property', function(assert) {
    assert.expect(1);
    assert.equal(this.component.tagName, 'li');
  });

  test('hrefForA computed property', function(assert) {
    const { component } = this;
    assert.expect(3);
    assert.equal(component.get('hrefForA'), '#');
    assert.notOk(component._routing.generateURL.called);
    component._routing.generateURL.resetHistory();

    component.setProperties({
      loading: false,
      qualifiedRouteName: 'libraries'
    });
    component.get('hrefForA');
    assert.ok(component._routing.generateURL.calledOnceWith(
      'libraries',
      [],
      'test'
    ));
  });
});
