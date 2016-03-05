
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';
import CONFIG from '../../config';

const EXTERNAL_MAP_URI = CONFIG.EXTERNAL_MAP_URI;

export default class GetDirection extends React.Component {
  static propTypes = {
    address: React.PropTypes.string.isRequired
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
    let url = `${EXTERNAL_MAP_URI}?daddr=${this.encodeUrl(this.props.address)}`;
    console.log(this.props, url);
    React.Linking.openURL(url);
  };
  encodeUrl = (url) => {
    return _.filter(url.split(' '), token => {
      return token !== '-' && token !== '/';
    }).join('+');
  };
}