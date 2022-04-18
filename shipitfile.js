const path = require('path');
const shipitDeploy = require('shipit-deploy');
const webpack = require('webpack');
const env = require('./env.js');
const webpackConfig = require('./webpack.config.js');

module.exports = (shipit) => {
  shipitDeploy(shipit);

  shipit.initConfig({
    default: {
      workspace: '.',
      keepWorkspace: true,
      branch: 'main',
      shallowClone: false,
      rsyncFrom: path.resolve(__dirname, env['BUILD_PATH'])
    },
    production: {
      deployTo: env['DEPLOY_PATH'],
      asUser: env['DEPLOY_USER'],
      servers: [
        {
          host: env['DEPLOY_SSH_HOST'],
          user: env['DEPLOY_SSH_USER']
        }
      ]
    }
  });

  shipit.blTask('build', async () => {
    await new Promise((resolve, reject) => {
      webpack(webpackConfig({ production: true }), (err, stats) => {
        if (err || stats.hasErrors())
          return reject(err);
        resolve(stats);
      });
    });
    shipit.emit('built');
  });

  shipit.on('deploy', async () => {
    shipit.start('build');
  });
};
