/* global describe it */

import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Results, { Result, Info } from '../../../../src/components/SearchTool/Results';
import SelectedStation from '../../../../src/stores/station';

describe('Results component', () => {

  const TEST_KEYWORD = 'keyword';
  const TEST_KEYWORD_2 = 'another';

  const TEST_STATIONS = [
    { id: '0', name: TEST_KEYWORD.toUpperCase(), numberOfBikes: 10,
      latitude: -10, longitude: 10, address: '' },
    { id: '1', name: TEST_KEYWORD.toLowerCase(), numberOfBikes: 10,
      latitude: -10, longitude: 10, address: '' },
    { id: '2', name: TEST_KEYWORD_2, numberOfBikes: 10,
      latitude: -10, longitude: 10, address: '' }
  ];

  describe('render Info component', () => {

    it('should provide the number of results to Info component', () => {
      let wrapper = shallow(<Results stations={TEST_STATIONS} />);
      expect(wrapper.find(Info)).to.have.length(1);
      expect(wrapper.find(Info).prop('number')).to.eql(TEST_STATIONS.length);
    });
  });

  describe('render Result component', () => {

    it(`should show ${TEST_STATIONS.length} Result components`, () => {
      let wrapper = shallow(<Results stations={TEST_STATIONS} />);
      expect(wrapper.find(Result)).to.have.length(TEST_STATIONS.length);
    });
  });
});

describe('Result component', () => {

  const TEST_KEYWORD = 'keyword';
  const TEST_STATION = { id: '0', name: TEST_KEYWORD, numberOfBikes: 10,
    latitude: -10, longitude: 10, address: '' };

  describe('render Text component', () => {

    it('should provide station name', () => {
      let wrapper = shallow(<Result {...TEST_STATION} />);
      expect(wrapper.contains(<React.Text>{TEST_STATION.name}</React.Text>)).to.eql(true);
    });
  });

  describe('render TouchableHighlight component', () => {
    it('should provide onPress handler', () => {
      let wrapper = shallow(<Result {...TEST_STATION} />);
      expect(wrapper.find(React.TouchableHighlight)).to.have.length(1);
      expect(wrapper.find(React.TouchableHighlight).prop('onPress')).to
        .eql(wrapper.instance().onPressHandler);
    });
  });

  describe('onPressHandler', () => {

    it('should dispatch SELECT station', (done) => {

      let wrapper = shallow(<Result {...TEST_STATION} />);
      let unsubscribe = SelectedStation.subscribe(() => {
        expect(SelectedStation.getState()).to.eql({ id: TEST_STATION.id, name: TEST_STATION.name });
        done();
      });
      wrapper.instance().onPressHandler();
      unsubscribe();
    });
  });
});

describe('Info component', () => {

  const TEST_NUMBER = 3;

  describe('render Text component', () => {

    it('should provide the number', () => {
      let wrapper = shallow(<Info number={TEST_NUMBER} />);
      expect(wrapper.find(React.Text).children().node).to.eql(`Found ${TEST_NUMBER} Stations.`);
    });
  });
});
