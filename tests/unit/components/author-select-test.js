import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import authors from '../../fixtures/authors';
import book from '../../fixtures/book';

const { spy } = sinon;

module('Unit | Component | author-select', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.component = this.owner.lookup('component:author-select');
  });

  test('default action exists', function(assert) {
    assert.expect(1);
    assert.equal(this.component.onChange(), undefined);
  });

  test('change handler function', function(assert) {
    const { component } = this;
    const event = {
      target: { value: '2' }
    };
    component.setProperties({
      authors,
      book,
      onChange: spy()
    });
    const {
      authors: authorRecord,
      book: bookRecord,
      onChange
    } = component;
    component.change(event);
    assert.expect(1);
    assert.ok(onChange.calledOnceWith(authorRecord[1], bookRecord));
  });
});
