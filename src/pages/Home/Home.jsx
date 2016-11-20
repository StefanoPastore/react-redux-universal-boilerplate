import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { actions, selectors } from '../../modules/HelloWorld';
import Dumb from './Dumb';

class Home extends Component {
  static propTypes = {
    helloWorld: PropTypes.bool,
    setHelloWorld: PropTypes.func,
  }

  componentWillMount() {
    this.props.setHelloWorld();
  }

  render() {
    return <Dumb {...this.props} />;
  }
}

export default connect(
  (state) => ({ helloWorld: selectors.helloWorld(state) }),
  (dispatch) => ({
    setHelloWorld: () => dispatch(actions.asyncSetHelloWorld()),
  })
)(Home);
