import 'babel-polyfill';
import { configure } from '@kadira/storybook';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../../src/config/i18n';
import '../../src/styles/main.scss';

injectTapEventPlugin();

function loadStories() {
  require('../components');
}

configure(loadStories, module);
