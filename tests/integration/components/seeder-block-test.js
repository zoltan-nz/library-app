import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | seeder-block', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders valid input', async function(assert) {

    await render(hbs`
      {{seeder-block
        sectionTitle="Libraries"
      }}
    `);

    const component = this.element.querySelector('div');
    const sectionTitle = component.querySelector('h3').textContent;
    const formGroup = component.querySelector('.form-group');
    const input = component.querySelector('.form-control');
    const [
      generateBtn,
      deleteBtn
    ] = component.querySelectorAll('button');

    await fillIn(input, 1);
    click(generateBtn);
    click(deleteBtn);

    assert.expect(7);
    assert.equal(sectionTitle, 'Libraries');
    assert.dom(formGroup).hasNoClass('has-error');
    assert.equal(input.placeholder, 'Max 100');
    assert.dom(generateBtn).hasText('Generate Libraries');
    assert.notOk(generateBtn.disabled);
    assert.dom(deleteBtn).hasText('Delete All Libraries');
    assert.notOk(deleteBtn.disabled);
  });

  test('it renders invalid input', async function(assert) {

    await render(hbs`{{seeder-block}}`);

    const component = this.element.querySelector('div');
    const formGroup = component.querySelector('.form-group');
    const input = component.querySelector('.form-control');
    const [
      generateBtn,
      deleteBtn
    ] = component.querySelectorAll('button');

    await fillIn(input, 101);
    assert.dom(formGroup).hasClass('has-error');
    assert.ok(generateBtn.disabled);
    assert.notOk(deleteBtn.disabled);
  });

  test('it renders generate and delete in progress buttons', async function(assert) {

    await render(hbs`
      {{seeder-block
        sectionTitle="Authors with Books"
        generateInProgress=true
        deleteInProgress=true
      }}
    `);

    const component = this.element.querySelector('div');
    const sectionTitle = component.querySelector('h3').textContent;
    const [
      generateBtn,
      deleteBtn
    ] = component.querySelectorAll('button');

    assert.expect(3);
    assert.equal(sectionTitle, 'Authors with Books');
    assert.dom(generateBtn).hasText('Generating...');
    assert.dom(deleteBtn).hasText('Deleting...');
  });

  test('it renders generated and deleted labels', async function(assert) {

    await render(hbs`
      {{seeder-block
        generateReady=true
        deleteReady=true
      }}
    `);

    const component = this.element.querySelector('div');
    const [
      createdLabel,
      deletedLabel
    ] = component.querySelectorAll('span');

    assert.expect(2);
    assert.dom(createdLabel).hasText('Created!');
    assert.dom(deletedLabel).hasText('Deleted!');
  });
});
