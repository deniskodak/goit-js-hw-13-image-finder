const { merge } = require('webpack-merge');
const loadSharedConfig = require('./configs/shared');

const loadModeConfig = mode => require(`./configs/${mode}`)(mode);

module.exports = (env, arg) =>
  merge(loadSharedConfig(arg.mode), loadModeConfig(arg.mode));
