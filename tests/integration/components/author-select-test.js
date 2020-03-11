import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import authors from '../../fixtures/authors';
import book from '../../fixtures/book';

module('Integration | Component | author-select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(5);

    const saveAuthor = (authorRecord, bookRecord) => {
      assert.deepEqual(authorRecord, authors[1], 'action called with proper author');
      assert.deepEqual(bookRecord, book, 'action called with proper book');
    };

    this.setProperties({
      authors,
      book,
      saveAuthor,
    });

    await render(
      hbs`
        <AuthorSelect
          @authors={{authors}}
          @book={{book}}
          @default={{book.author}}
          @onChange={{action saveAuthor}}
        />
      `,
    );

    const component = this.element.querySelector('select');

    assert.dom(component).hasClass('form-control', 'component renders with assigned CSS class');
    assert.equal(
      component.options[component.selectedIndex].text,
      'Tanya Gutmann',
      'component renders with default author selected',
    );

    await fillIn('.form-control', '2');

    assert.equal(
      component.options[component.selectedIndex].text,
      'Ruthe Fisher',
      'component renders changed selection',
    );
  });
});
