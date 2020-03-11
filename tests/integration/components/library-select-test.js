import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import libraries from '../../fixtures/libraries';
import book from '../../fixtures/book';

module('Integration | Component | library-select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      libraries,
      book,
    });

    await render(hbs`{{library-select libraries=libraries default=book.library}}`);

    const component = this.element.querySelector('select');

    assert.expect(3);
    assert.dom(component).hasClass('form-control', 'component renders with assigned CSS class');
    assert.equal(
      component.options[component.selectedIndex].text,
      'Jerde - Bogisich Library',
      'component renders with default library selected',
    );

    await fillIn('.form-control', '2');

    assert.equal(
      component.options[component.selectedIndex].text,
      'Gerlach and Sons Library',
      'component renders changed selection',
    );
  });
});
