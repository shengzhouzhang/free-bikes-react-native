
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';
import SelectedStation from '../../stores/station';

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
    SelectedStation.dispatch({
      type: 'SELECT',
      station: { id: this.props.id, name: this.props.name }
    });
  };
}

export class Info extends React.Component {
  static propTypes = {
    number: React.PropTypes.number.isRequired,
  };
  static defaultProps = {
    number: 0
  };
  render = () => {
    return (
      <React.View style={styles.searchResult}>
        <React.Text style={styles.searchInfo}>{`Found ${this.props.number} Stations.`}</React.Text>
      </React.View>
    );
  };
}

export default class Results extends React.Component {
  static propTypes = {
    stations: React.PropTypes.array.isRequired
  };
  render = () => {
    let items = _.map(this.props.stations, station => {
      return (<Result key={station.id} {...station} />);
    });
    return (
      <React.View style={styles.searchResults}>
        <Info number={this.props.stations.length} />
        { items }
      </React.View>
    );
  };
}
