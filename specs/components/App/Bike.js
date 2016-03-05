/* global describe it */

import fetch from 'node-fetch';
import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Bike from '../../../src/components/App/Bike';
import Map from '../../../src/components/Map';
import SearchTool from '../../../src/components/SearchTool';

describe('Bike App', () => {

  describe('render Map component', () => {

    it('should provide stations', () => {
      let wrapper = shallow(<Bike fetch={fetch} />);
      expect(wrapper.find(Map)).to.have.length(1);
      expect(wrapper.find(Map).prop('stations')).to.eql(wrapper.instance().state.stations);
    });
  });

  describe('render SearchTool component', () => {

    it('should provide stations', () => {
      let wrapper = shallow(<Bike fetch={fetch} />);
      expect(wrapper.find(SearchTool)).to.have.length(1);
      expect(wrapper.find(SearchTool).prop('stations')).to.eql(wrapper.instance().state.stations);
    });
  });
});
