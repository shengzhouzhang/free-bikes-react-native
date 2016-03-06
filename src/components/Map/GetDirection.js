
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';
import CONFIG from '../../config';

const EXTERNAL_MAP_URI = CONFIG.EXTERNAL_MAP_URI;

export default class GetDirection extends React.Component {
  static propTypes = {
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired
  };
  render = () => {
    return (
      <React.View style={styles.getDirection}>
        <React.TouchableHighlight onPress={this.onPressHandler}>
          <React.Text>Get Direction</React.Text>
        </React.TouchableHighlight>
      </React.View>
    );
  };
  onPressHandler = () => {
    let url = `${EXTERNAL_MAP_URI}?ll=${this.props.latitude},${this.props.longitude}&saddr=Current%20Location`;
    console.log(this.props, url);
    React.Linking.openURL(url);
  };
}
