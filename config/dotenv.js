'use strict';

const path = require('path');

module.exports = function(/* env */) {
  return {
    clientAllowedKeys: [
      'API_KEY',
      'PROJECT_ID'
    ],
    fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env')
  }
};
