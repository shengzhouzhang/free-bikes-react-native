
import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Map from '../../../components/Map';
import Direction from '../../../components/Map/Direction';
import SelectedStation from '../../../stores/station';

describe('Map Component', () => {

  const TEST_NAME = 'station name';

  const TEST_STATIONS = [
    { id: 0, name: TEST_NAME.toUpperCase(), numberOfBikes: 10, position: { lat: -10, lng: 10 } },
    { id: 1, name: TEST_NAME.toLowerCase(), numberOfBikes: 10, position: { lat: -10, lng: 10 } },
    { id: 2, name: TEST_NAME, numberOfBikes: 10, position: { lat: -10, lng: 10 } },
  ];

  describe('initial state', () => {

    it('should set region and name to default props', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      expect(wrapper.instance().state).to.eql({ region: Map.defaultProps.region, name: Map.defaultProps.name });
    });
  });

  describe('render MapView component', () => {

    it('should provide region', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      expect(wrapper.find(React.MapView).prop('region')).to.eql(wrapper.instance().state.region);
    });

    it('should provide overlays', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      expect(wrapper.find(React.MapView).prop('overlays')).to.have.length(TEST_STATIONS.length);
    });
  });

  describe('render Direction component', () => {

    it('should render Direction width address when showDirection is true', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      wrapper.instance().setState({ showDirection: true });
      wrapper.update();
      expect(wrapper.find(Direction)).to.have.length(1);
      expect(wrapper.find(Direction).prop('address')).to.eql(wrapper.instance().state.name);
    });

    it('should not render Direction when showDirection is false', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      wrapper.instance().setState({ showDirection: false });
      wrapper.update();
      expect(wrapper.find(Direction)).to.have.length(0);
    });
  });

  describe('componentDidMount', () => {

    it('should subscribe to selected station store', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      wrapper.instance().componentDidMount();
      wrapper.instance().onSelectStationHandler = sinon.spy();
      SelectedStation.dispatch({ type: 'SELECT', station: { id: TEST_STATIONS[0].id, name: TEST_STATIONS[0].name } });
      expect(wrapper.instance().onSelectStationHandler.called).to.eql(true);
      expect(wrapper.instance().onSelectStationHandler.getCall(0).args[0]).to.eql({ id: TEST_STATIONS[0].id, name: TEST_STATIONS[0].name });
      wrapper.instance().componentWillUnmount();
    });
  });

  describe('componentWillUnmount', () => {

    it('should unsubscribe to the selected station store', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      wrapper.instance().unsubscribe = sinon.spy();
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().unsubscribe.called).to.eql(true);
    });
  });

  describe('onSelectStationHandler', () => {

    it('should update state region, name, and showDirection', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      wrapper.instance().setState = sinon.spy();
      wrapper.instance().onSelectStationHandler(TEST_STATIONS[0]);
      expect(wrapper.instance().setState.called).to.eql(true);
      expect(wrapper.instance().setState.getCall(0).args[0]).to.eql({
        region: {
          latitude: TEST_STATIONS[0].position.lat,
          longitude: TEST_STATIONS[0].position.lng,
          latitudeDelta: .01,
          longitudeDelta: .01
        },
        name: TEST_STATIONS[0].name,
        showDirection: true
      });
    });
  });

  describe('parseEntitiesToAnnotations', () => {

    it('should get annotations for MapView', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let results = wrapper.instance().parseEntitiesToAnnotations(TEST_STATIONS);
      expect(results).to.eql([
        { title: TEST_STATIONS[0].name, latitude: TEST_STATIONS[0].position.lat, longitude: TEST_STATIONS[0].position.lng },
        { title: TEST_STATIONS[1].name, latitude: TEST_STATIONS[1].position.lat, longitude: TEST_STATIONS[1].position.lng },
        { title: TEST_STATIONS[2].name, latitude: TEST_STATIONS[2].position.lat, longitude: TEST_STATIONS[2].position.lng }
      ]);
    });
  });

  describe('parseEntitiesToOverlays', () => {

    it('should get overlays for MapView', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let results = wrapper.instance().parseEntitiesToOverlays(TEST_STATIONS);
      expect(results).to.eql([
        { id: TEST_STATIONS[0].id, coordinates: [{ latitude: TEST_STATIONS[0].position.lat, longitude: TEST_STATIONS[0].position.lng }], lineWidth: 15, strokeColor: '#cd5c5c' },
        { id: TEST_STATIONS[1].id, coordinates: [{ latitude: TEST_STATIONS[1].position.lat, longitude: TEST_STATIONS[1].position.lng }], lineWidth: 15, strokeColor: '#cd5c5c' },
        { id: TEST_STATIONS[2].id, coordinates: [{ latitude: TEST_STATIONS[2].position.lat, longitude: TEST_STATIONS[2].position.lng }], lineWidth: 15, strokeColor: '#cd5c5c' },
      ]);
    });
  });

  describe('getOverlaySize', () => {

    it('should get the min size', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(0, 5);
      expect(result).to.eql(5);
    });

    it('should get the min size', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(0, 0);
      expect(result).to.eql(5);
    });

    it('should get the max size', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(5, 5);
      expect(result).to.eql(15);
    });

    it('should get the max size', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(10, 5);
      expect(result).to.eql(15);
    });

    it('should get a number between min and max', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(5, 10);
      expect(result).to.eql(10);
    });
  });
});