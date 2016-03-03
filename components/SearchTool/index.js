
'use strict';

import React from 'react-native';
import styles from '../../style';

export default class SearchTool extends React.Component {
  render = () => {
    return (
      <React.TextInput style={styles.textInput} onChange={this.onTextChangeHandler} />
    );
  };
  onTextChangeHandler = () => {
  };
}
