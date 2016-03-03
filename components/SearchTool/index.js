
'use strict';

import React from 'react-native';
import styles from '../../style';

export default class SearchTool extends React.Component {
  static propTypes = {
    stations: React.PropTypes.array.isRequired
  };
  static defaultProps = {
    stations: []
  };
  render = () => {
    return (
      <React.TextInput value={this.props.stations[0].name} style={styles.textInput} onChange={this.onTextChangeHandler} />
    );
  };
  onTextChangeHandler = () => {
  };
}
