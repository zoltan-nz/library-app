import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import libraries from '../../fixtures/libraries';
import book from '../../fixtures/book';

module('Integration | Component | library-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(5);

    const saveLibrary = (libraryRecord, bookRecord) => {
      assert.deepEqual(libraryRecord, libraries[1], 'action called with proper library');
      assert.deepEqual(bookRecord, book, 'action called with proper book');
    };

    this.setProperties({
      book,
      libraries,
      saveLibrary,
    });

    await render(
      hbs`
        <LibrarySelect
          @libraries={{libraries}}
          @book={{book}}
          @default={{book.library}}
          @onChange={{action saveLibrary}}
        />
      `
    );

    const component = this.element.querySelector('select');

    assert.dom(component).hasClass('form-control', 'component renders with assigned CSS class');
    assert.equal(
      component.options[component.selectedIndex].text,
      'Jerde - Bogisich Library',
      'component renders with default library selected'
    );

    await fillIn('.form-control', '2');

    assert.equal(
      component.options[component.selectedIndex].text,
      'Gerlach and Sons Library',
      'component renders changed selection'
    );
  });
});
