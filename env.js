require('dotenv').config();

const env = process.env;
Object.keys(env).forEach((key) => {
  if (env[key] === undefined || env[key] === null || env[key] === '')
    delete env[key];
});

env['NODE_ENV'] ??= 'development';
env['BUILD_PATH'] ??= 'dist';
env['DEV_SERVER_HOST'] ??= 'localhost';
env['DEV_SERVER_PORT'] ??= '3000';

module.exports = env;
