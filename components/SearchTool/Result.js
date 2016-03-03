
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';

export class Result extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  };
  render = () => {
    return (
      <React.View style={styles.searchResult}>
        <React.TouchableHighlight onPress={this.onPressHandler}>
          <React.Text>{this.props.name}</React.Text>
        </React.TouchableHighlight>
      </React.View>
    );
  };
  onPressHandler = () => {
    console.log(this.props);
  };
};

export default class Results extends React.Component {
  static propTypes = {
    stations: React.PropTypes.array.isRequired
  };
  render = () => {
    let items = _.map(this.props.stations, station => {
      return (<Result key={station.id} {...station} />);
    });
    return (
      <React.View style={styles.searchResults}>{ items }</React.View>
    );
  };
};
