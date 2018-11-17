// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TodoListApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
// ----------------
// Add this snippet
const datasourceDb = require('./datasources/db.datasource.json');
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
// ----------------

export async function main(options: ApplicationConfig = {}) {
  // ----------------
  // Add this snippet
  // Set the port assined for the app
  if (!options) options = {};
  if (!options.rest) options.rest = {};
  options.rest.port = appEnv.isLocal ? options.rest.port : appEnv.port;
  options.rest.host = appEnv.isLocal ? options.rest.host : appEnv.host;
  // ----------------

  const app = new TodoListApplication(options);
  // ----------------
  // Add this snippet
  // If running on IBM Cloud, we get the Cloudant service details from VCAP_SERVICES
  if (!appEnv.isLocal) {
    // 'myCloudant' is the name of the provisioned Cloudant service
    const updatedDatasourceDb = Object.assign({}, datasourceDb, {
      url: appEnv.getServiceURL('myCloudant'),
    });
    app.bind('datasources.config.db').to(updatedDatasourceDb);
  }
  // ----------------
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  return app;
}

// re-exports for our benchmark, not needed for the tutorial itself
export {TodoListApplication};

export * from './models';
export * from './repositories';
export * from '@loopback/rest';
