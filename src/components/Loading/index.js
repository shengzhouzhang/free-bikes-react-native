
import React from 'react-native';
import styles from '../../style';

export default class Loading extends React.Component {
  render = () => {
    return (
      <React.View style={styles.loading}>
          <React.Text>Loading</React.Text>
      </React.View>
    );
  };
}
