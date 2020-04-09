import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import letters from '../../fixtures/alphabet';

module('Integration | Component | abc-buttons', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{abc-buttons}}`);

    const components = this.element.querySelectorAll('.btn');

    assert.expect(27);
    assert.equal(components.length, 26);
    components.forEach((component, i) => assert.dom(component).hasText(letters[i]));
  });
});
