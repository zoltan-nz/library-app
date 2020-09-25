import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

const { stub } = sinon;

module('Unit | Service | seeder', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    const model = {
      randomize() {
        return {
          save() {
            return {
              save: stub().resolves('saved'),
            };
          },
        };
      },
    };

    const records = [
      {
        destroyRecord: stub().resolves('destroyed'),
        save: stub().resolves('saved'),
        books: [
          {
            destroyRecord: stub().resolves('destroyed'),
          },
        ],
      },
    ];

    this.service = this.owner.factoryFor('service:seeder').create({
      store: {
        findAll: stub().resolves(records),
        createRecord() {
          return model;
        },
      },
    });
  });

  hooks.afterEach(function () {
    run.cancelTimers();
  });

  test('seedRandomLibraries task', async function (assert) {
    const { service } = this;
    await service.seedRandomLibraries.perform(2);
    assert.equal(service.doneMessage, 'Libraries are generated.');
  });

  test('deleteLibraries task', async function (assert) {
    const { service } = this;
    await service.deleteLibraries.perform();
    assert.ok(service.store.findAll.calledWith('library'));
    assert.equal(service.doneMessage, 'Libraries are deleted.');
  });

  test('seedRandomAuthorsWithBooks task', async function (assert) {
    const { service } = this;
    await service.seedRandomAuthorsWithBooks.perform(2);
    assert.ok(service.store.findAll.calledWith('library'));
    assert.equal(service.doneMessage, 'Authors with books are generated.');
  });

  test('deleteAuthorsAndTheirBooks task', async function (assert) {
    const { service } = this;
    await service.deleteAuthorsAndTheirBooks.perform();
    assert.ok(service.store.findAll.calledWith('author'));
    assert.equal(service.doneMessage, 'Authors with books are deleted.');
  });
});
