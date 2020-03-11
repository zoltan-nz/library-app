const { modulePrefix } = require('./environment')();

module.exports = {
  excludes: ['*/mirage/**/*', `${modulePrefix}/*.js`],
  reporters: ['lcov', 'text'],
};
