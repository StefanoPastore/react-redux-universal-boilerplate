import {
  selectors as statusSelectors,
} from '../../modules/Status';
import { connect } from 'react-redux';
import App from './App';

export default connect(
  (state) => ({
    crash: statusSelectors.crash(state),
    notFound: statusSelectors.notFound(state),
  })
)(App);
