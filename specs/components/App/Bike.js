/* global describe it */

import fetch from 'node-fetch';
import Promise from 'bluebird';
import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Bike from '../../../src/components/App/Bike';
import Map from '../../../src/components/Map';
import SearchTool from '../../../src/components/SearchTool';
import Loading from '../../../src/components/Loading';
import BikesRepository from '../../../src/repositories/Bikes';

describe('Bike App', () => {

  describe('initial state', () => {

    it('should set stations and isLoading', () => {
      let wrapper = shallow(<Bike bikesRepository={new BikesRepository(fetch)} />);
      expect(wrapper.instance().state).to.eql({ stations: [], isLoading: false });
    });
  });

  describe('render Map component', () => {

    it('should provide stations', () => {
      let wrapper = shallow(<Bike bikesRepository={new BikesRepository(fetch)} />);
      expect(wrapper.find(Map)).to.have.length(1);
      expect(wrapper.find(Map).prop('stations')).to.eql(wrapper.instance().state.stations);
    });
  });

  describe('render SearchTool component', () => {

    it('should provide stations', () => {
      let wrapper = shallow(<Bike bikesRepository={new BikesRepository(fetch)} />);
      expect(wrapper.find(SearchTool)).to.have.length(1);
      expect(wrapper.find(SearchTool).prop('stations')).to.eql(wrapper.instance().state.stations);
    });
  });

  describe('render Loading component', () => {

    it('should show when isLoading is true', () => {
      let wrapper = shallow(<Bike bikesRepository={new BikesRepository(fetch)} />);
      wrapper.instance().setState({ isLoading: true });
      wrapper.update();
      expect(wrapper.find(Loading)).to.have.length(1);
    });

    it('should hide when isLoading is false', () => {
      let wrapper = shallow(<Bike bikesRepository={new BikesRepository(fetch)} />);
      wrapper.instance().setState({ isLoading: false });
      wrapper.update();
      expect(wrapper.find(Loading)).to.have.length(0);
    });
  });

  describe('componentDidMount', () => {

    it('should updateStations', () => {
      let wrapper = shallow(<Bike bikesRepository={new BikesRepository(fetch)} />);
      wrapper.instance().updateStations = sinon.spy();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().updateStations.called).to.eql(true);
    });
  });

  describe('updateStations', () => {

    it('should fetchBikes', () => {
      let fetchBikes = sinon.stub().returns(Promise.resolve([]));
      let wrapper = shallow(<Bike bikesRepository={{ fetchBikes }} />);
      wrapper.instance().updateStations();
      expect(fetchBikes.called).to.eql(true);
    });

    it('should update isLoading state to true during request', () => {
      let fetchBikes = sinon.stub().returns(Promise.delay(1000).then(() => Promise.resolve([])));
      let wrapper = shallow(<Bike bikesRepository={{ fetchBikes }} />);
      expect(wrapper.instance().state.isLoading).to.eql(false);
      wrapper.instance().updateStations();
      expect(wrapper.instance().state.isLoading).to.eql(true);
    });

    it('should update isLoading state to false after request successes', () => {
      let fetchBikes = sinon.stub().returns(Promise.resolve([]));
      let wrapper = shallow(<Bike bikesRepository={{ fetchBikes }} />);
      wrapper.instance().updateStations();
      return Promise.delay(1000)
        .then(() => {
          expect(wrapper.instance().state.isLoading).to.eql(false);
        });
    });

    it('should update isLoading state to false after request fails', () => {
      let fetchBikes = sinon.stub().returns(Promise.reject(new Error('TEST')));
      let wrapper = shallow(<Bike bikesRepository={{ fetchBikes }} />);
      wrapper.instance().updateStations();
      return Promise.delay(1000)
        .then(() => {
          expect(wrapper.instance().state.isLoading).to.eql(false);
        });
    });
  });
});
