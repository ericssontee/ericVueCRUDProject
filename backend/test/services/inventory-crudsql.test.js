const assert = require('assert');
const app = require('../../src/app');

describe('\'InventoryCRUDSQL\' service', () => {
  it('registered the service', () => {
    const service = app.service('inventory-crudsql');

    assert.ok(service, 'Registered the service');
  });
});
