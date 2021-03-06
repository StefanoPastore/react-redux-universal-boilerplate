import 'babel-polyfill';
import 'isomorphic-fetch';
import './config/i18n';
import './utils/logger';
import fs from 'fs';
import path from 'path';
import injectTapEventPlugin from 'react-tap-event-plugin';
import checkEnv from './utils/checkEnv';
import renderPage from './utils/renderPage';
import getRoutes from './config/routes';
import { AppContainer } from './layouts';
import configureStore from './config/configureStore';
import {
  actions as statusActions,
  selectors as statusSelectors,
} from './modules/Status';
let App = require('./App').default;

checkEnv();

injectTapEventPlugin();
let app = new App();
app.hotDeps = {
  getRoutes,
  AppContainer,
  configureStore,
  statusActions,
  statusSelectors,
  renderPage,
};
app.start();

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    let connections = [];
    const subscribeConnections = () => {
      app.server.on('connection', (socket) => {
        const index = connections.length;
        connections.push(socket);
        socket.on('close', () => {
          connections.splice(index, 1);
        });
      });
    };
    subscribeConnections();

    const destroyConnections = () => {
      connections.map(socket => socket.destroy());
      connections = [];
    };

    const deleteHMRFiles = () => {
      const dir = path.join(process.cwd(), 'build');
      const files = fs.readdirSync(dir);

      files.forEach(file => {
        if (file.indexOf('hot-update') > -1) {
          fs.unlinkSync(path.join(dir, file));
        }
      });
    };

    module.hot.accept('./config/routes', () => {
      app.hotDeps.getRoutes = require('./config/routes').default;
    });

    module.hot.accept('./layouts', () => {
      app.hotDeps.AppContainer = require('./layouts').AppContainer;
    });

    module.hot.accept('./config/configureStore', () => {
      app.hotDeps.configureStore = require('./config/configureStore').default;
    });

    module.hot.accept('./modules/Status', () => {
      app.hotDeps.statusActions = require('./modules/Status').actions;
      app.hotDeps.statusSelectors = require('./modules/Status').selectors;
    });

    module.hot.accept('./utils/renderPage', () => {
      app.hotDeps.renderPage = require('./utils/renderPage').default;
    });

    module.hot.accept('./App', () => {
      global.logger.log('info', 'Please refresh page if it is open');

      destroyConnections();
      deleteHMRFiles();

      global.logger.log('info', 'Close server!');
      app.server.close(() => {
        const hotDeps = app.hotDeps;
        App = require('./App').default;
        app = new App();
        app.hotDeps = hotDeps;
        app.start();
        subscribeConnections();
      });
    });
  }
}
