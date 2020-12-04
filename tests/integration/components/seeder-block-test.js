import { click, fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test, skip } from 'qunit';
import sinon from 'sinon';

module('Integration | Component | seeder-block', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.spy = sinon.spy();
  });

  test('it renders', async function (assert) {
    await render(hbs`<SeederBlock @sectionTitle="Dummy"/>`);
    assert.equal(this.element.querySelector('h3').textContent, 'Dummy');
  });

  skip('it renders valid input', async function (assert) {
    this.set('dummyTask', { perform: this.spy });

    await render(hbs`
      <SeederBlock
        @sectionTitle="Libraries"
        @seederTask={{this.dummyTask}}
        @destroyerTask={{this.dummyTask}}
      />
    `);

    const component = this.element.querySelector('div');
    const sectionTitle = component.querySelector('h3').textContent;
    const formGroup = component.querySelector('.form-group');
    const input = component.querySelector('.form-control');
    const [generateBtn, deleteBtn] = component.querySelectorAll('button');

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

  test('it renders invalid input', async function (assert) {
    await render(hbs`
      <SeederBlock
        @sectionTitle="Libraries"
      />
    `);

    const component = this.element.querySelector('div');
    const formGroup = component.querySelector('.form-group');
    const input = component.querySelector('.form-control');
    const [generateBtn, deleteBtn] = component.querySelectorAll('button');

    await fillIn(input, 101);
    assert.dom(formGroup).hasClass('has-error');
    assert.ok(generateBtn.disabled);
    assert.notOk(deleteBtn.disabled);
  });

  test('it renders generate and delete in progress buttons', async function (assert) {
    assert.expect(6);
    this.set('inProgress', false);

    await render(hbs`
      <SeederBlock
        @sectionTitle="Authors with Books"
        @seedingInProgress={{this.inProgress}}
        @deletingInProgress={{this.inProgress}}
      />
    `);

    const component = this.element.querySelector('div');
    const sectionTitle = component.querySelector('h3').textContent;
    const [generateBtn, deleteBtn] = component.querySelectorAll('button');

    assert.equal(sectionTitle, 'Authors with Books');
    assert.dom(generateBtn).hasText('Generate Authors with Books');
    assert.dom(deleteBtn).hasText('Delete All Authors with Books');

    this.set('inProgress', true);

    assert.equal(sectionTitle, 'Authors with Books');
    assert.dom(generateBtn).hasText('Generating...');
    assert.dom(deleteBtn).hasText('Deleting...');
  });
});
