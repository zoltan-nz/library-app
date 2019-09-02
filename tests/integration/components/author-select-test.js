import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import authors from '../../fixtures/authors';
import book from '../../fixtures/book';

module('Integration | Component | author-select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.setProperties({
      authors,
      book
    });

    await render(hbs`{{author-select authors=authors default=book.author}}`);

    const component = this.element.querySelector('select');

    assert.expect(3);
    assert.ok(
      component.classList.contains('form-control'),
      'component renders with assigned CSS class'
    );
    assert.equal(
      component.options[component.selectedIndex].text,
      'Rodrick Connelly',
      'component renders with default author selected'
    );

    await fillIn('.form-control', '2');

    assert.equal(
      component.options[component.selectedIndex].text,
      'Ruthe Fisher',
      'component renders changed selection'
    );
  });
});
