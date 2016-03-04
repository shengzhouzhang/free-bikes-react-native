
import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Results, { Result, Info } from '../../../components/SearchTool/Results';
import SelectedStation from '../../../stores/station';

describe('Results Component', () => {

  const TEST_KEYWORD = 'keyword';
  const TEST_KEYWORD_2 = 'another';

  const TEST_STATIONS = [
    { id: '0', name: TEST_KEYWORD.toUpperCase(), numberOfBikes: 10, position: { lat: -10, lng: 10 } },
    { id: '1', name: TEST_KEYWORD.toLowerCase(), numberOfBikes: 10, position: { lat: -10, lng: 10 } },
    { id: '2', name: TEST_KEYWORD_2, numberOfBikes: 10, position: { lat: -10, lng: 10 } }
  ];

  describe('render Info Component', () => {

    it('should provide the number of results to Info Component', () => {
      let wrapper = shallow(<Results stations={TEST_STATIONS} />);
      expect(wrapper.find(Info)).to.have.length(1);
      expect(wrapper.find(Info).prop('number')).to.eql(TEST_STATIONS.length);
    });
  });

  describe('render Result Component', () => {

    it(`should render ${TEST_STATIONS.length} Result Component`, () => {
      let wrapper = shallow(<Results stations={TEST_STATIONS} />);
      expect(wrapper.find(Result)).to.have.length(TEST_STATIONS.length);
    });
  });
});

describe('Result Component', () => {

  const TEST_KEYWORD = 'keyword';
  const TEST_STATION = { id: '0', name: TEST_KEYWORD, numberOfBikes: 10, position: { lat: -10, lng: 10 } };

  describe('render', () => {

    it('should render Text with station name', () => {
      let wrapper = shallow(<Result {...TEST_STATION} />);
      expect(wrapper.contains(<React.Text>{TEST_STATION.name}</React.Text>)).to.eql(true);
    });

    it('should render TouchableHighlight with onPress handler', () => {
      let wrapper = shallow(<Result {...TEST_STATION} />);
      expect(wrapper.find(React.TouchableHighlight)).to.have.length(1);
      expect(wrapper.find(React.TouchableHighlight).prop('onPress')).to.eql(wrapper.instance().onPressHandler);
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
