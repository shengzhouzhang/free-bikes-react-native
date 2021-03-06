/* global describe it */

import _ from 'lodash';
import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Map from '../../../../src/components/Map';
import GetDirection from '../../../../src/components/Map/GetDirection';
import SelectedStation from '../../../../src/stores/station';
import CONFIG from '../../../../src/config';

describe('Map component', () => {

  const TEST_NAME = 'station name';
  const OVERLAY_COLOR = CONFIG.OVERLAY_COLOR;
  const MAX_OVERLAY_SIZE = CONFIG.MAX_OVERLAY_SIZE;
  const MIN_OVERLAY_SIZE = CONFIG.MIN_OVERLAY_SIZE;
  const ZOOMED_IN = CONFIG.ZOOMED_IN;

  const TEST_STATIONS = [
    { id: 0, name: TEST_NAME.toUpperCase(), numberOfBikes: 10,
      latitude: -10, longitude: 10, address: '' },
    { id: 1, name: TEST_NAME.toLowerCase(), numberOfBikes: 10,
      latitude: -10, longitude: 10, address: '' },
    { id: 2, name: TEST_NAME, numberOfBikes: 10,
      latitude: -10, longitude: 10, address: '' },
  ];

  describe('initial state', () => {

    it('should set region and name to default props', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      expect(wrapper.instance().state).to.eql({
        region: Map.defaultProps.region, name: Map.defaultProps.name });
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

    it('should provide latitude and longitude when showGetDirection is true', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      wrapper.instance().setState({ showGetDirection: true });
      wrapper.update();
      expect(wrapper.find(GetDirection)).to.have.length(1);
      expect(wrapper.find(GetDirection).prop('latitude'))
        .to.eql(wrapper.instance().state.region.latitude);
      expect(wrapper.find(GetDirection).prop('longitude'))
        .to.eql(wrapper.instance().state.region.longitude);
    });

    it('should hide Direction when showGetDirection is false', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      wrapper.instance().setState({ showGetDirection: false });
      wrapper.update();
      expect(wrapper.find(GetDirection)).to.have.length(0);
    });
  });

  describe('componentDidMount', () => {

    it('should subscribe to selected station store', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      wrapper.instance().componentDidMount();
      wrapper.instance().onSelectStationHandler = sinon.spy();
      SelectedStation.dispatch({
        type: 'SELECT',
        station: { id: TEST_STATIONS[0].id, name: TEST_STATIONS[0].name }
      });
      expect(wrapper.instance().onSelectStationHandler.called).to.eql(true);
      expect(wrapper.instance().onSelectStationHandler.getCall(0).args[0]).to
        .eql({ id: TEST_STATIONS[0].id, name: TEST_STATIONS[0].name });
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

    it('should update state region, name, and showGetDirection', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      wrapper.instance().setState = sinon.spy();
      wrapper.instance().onSelectStationHandler(TEST_STATIONS[0]);
      expect(wrapper.instance().setState.called).to.eql(true);
      expect(wrapper.instance().setState.getCall(0).args[0]).to.eql({
        region: {
          latitude: TEST_STATIONS[0].latitude,
          longitude: TEST_STATIONS[0].longitude,
          latitudeDelta: ZOOMED_IN,
          longitudeDelta: ZOOMED_IN
        },
        name: TEST_STATIONS[0].name,
        showGetDirection: true
      });
    });
  });

  describe('parseEntitiesToAnnotations', () => {

    it('should get annotations for MapView', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let results = wrapper.instance().parseEntitiesToAnnotations(TEST_STATIONS);
      _.forEach(results, (result, index) => {
        expect(result.title).to.eql(TEST_STATIONS[index].name);
        expect(result.latitude).to.eql(TEST_STATIONS[index].latitude);
        expect(result.longitude).to.eql(TEST_STATIONS[index].longitude);
      });
    });
  });

  describe('parseEntitiesToOverlays', () => {

    it('should get overlays for MapView', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let results = wrapper.instance().parseEntitiesToOverlays(TEST_STATIONS);
      expect(results).to.eql([ {
        id: TEST_STATIONS[0].id,
        coordinates: [ {
          latitude: TEST_STATIONS[0].latitude,
          longitude: TEST_STATIONS[0].longitude
        } ],
        lineWidth: MAX_OVERLAY_SIZE, strokeColor: OVERLAY_COLOR
      }, {
        id: TEST_STATIONS[1].id,
        coordinates: [ {
          latitude: TEST_STATIONS[1].latitude,
          longitude: TEST_STATIONS[1].longitude
        } ],
        lineWidth: MAX_OVERLAY_SIZE,
        strokeColor: OVERLAY_COLOR
      }, {
        id: TEST_STATIONS[2].id,
        coordinates: [ {
          latitude: TEST_STATIONS[2].latitude,
          longitude: TEST_STATIONS[2].longitude
        } ],
        lineWidth: MAX_OVERLAY_SIZE,
        strokeColor: OVERLAY_COLOR
      } ]);
    });
  });

  describe('getOverlaySize', () => {

    it('should get the min size', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(0, 5);
      expect(result).to.eql(MIN_OVERLAY_SIZE);
    });

    it('should get the min size', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(0, 0);
      expect(result).to.eql(MIN_OVERLAY_SIZE);
    });

    it('should get the max size', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(5, 5);
      expect(result).to.eql(MAX_OVERLAY_SIZE);
    });

    it('should get the max size', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(10, 5);
      expect(result).to.eql(MAX_OVERLAY_SIZE);
    });

    it('should get a number between min and max', () => {
      let wrapper = shallow(<Map stations={TEST_STATIONS} />);
      let result = wrapper.instance().getOverlaySize(5, 10);
      expect(result).to.eql(MAX_OVERLAY_SIZE / 2);
    });
  });
});
