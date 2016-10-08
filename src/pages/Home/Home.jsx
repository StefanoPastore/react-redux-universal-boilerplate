import { resolve } from 'react-resolver';
import { connect } from 'react-redux';
import { actions, selectors } from '../../modules/HelloWorld/HelloWorld';
import Dumb from './Dumb';

export default connect(
  (state) => ({ helloWorld: selectors.helloWorld(state) }),
  (dispatch) => ({
    setHelloWorld: () => dispatch(actions.setHelloWorld()),
  })
)(resolve('boot', (props) => props.setHelloWorld())(Dumb));
