// Initializes the `InventoryCRUDSQL` service on path `/inventory-crudsql`
const { InventoryCrudsql } = require('./inventory-crudsql.class');
const createModel = require('../../models/inventory-crudsql.model');
const hooks = require('./inventory-crudsql.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/inventory-crudsql', new InventoryCrudsql(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('inventory-crudsql');

  service.hooks(hooks);
};
