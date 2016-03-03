
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';

export default class Input extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onTextChange: React.PropTypes.func.isRequired
  };
  render = () => {
    return (<React.TextInput value={this.props.value} style={styles.searchInput} onChange={this.onTextChangeHandler} />);
  };
  onTextChangeHandler = (event) => {
    this.props.onTextChange(event.nativeEvent.text);
  };
}
