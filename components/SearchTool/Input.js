
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';

export default class Input extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onTextChange: React.PropTypes.func.isRequired
  };
  render = () => {
    return (
      <React.TextInput style={styles.searchInput}
        value={this.props.value}
        onChange={this.onTextChangeHandler}
        placeholder={'Search station...'}
      />
    );
  };
  onTextChangeHandler = (event) => {
    this.props.onTextChange(event.nativeEvent.text);
  };
}
