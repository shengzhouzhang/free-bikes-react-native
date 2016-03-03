
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
      <React.View>
        <React.TouchableHighlight>
          <React.Text>{this.props.name}</React.Text>
        </React.TouchableHighlight>
      </React.View>
    );
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
      <React.View>{ items }</React.View>
    );
  };
};
