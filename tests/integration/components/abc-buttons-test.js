import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import letters from '../../fixtures/alphabet';

module('Integration | Component | abc-buttons', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{abc-buttons}}`);

    const component = this.element.querySelector('div');
    const children = [...component.children];

    assert.expect(28);
    assert.dom(component).hasClass('btn-group');
    assert.equal(component.childElementCount, 26);
    children.forEach((child, i) => assert.dom(child).hasText(letters[i]));
  });
});
