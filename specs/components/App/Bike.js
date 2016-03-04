
import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Bike from '../../../components/App/Bike';
import Map from '../../../components/Map';
import SearchTool from '../../../components/SearchTool';

describe('Input Component', () => {

  describe('render Map component', () => {

    it('should render Map component and provide stations', () => {
      let wrapper = shallow(<Bike />);
      expect(wrapper.find(Map)).to.have.length(1);
      expect(wrapper.find(Map).prop('stations').length > 0).to.eql(true);
    });
  });

  describe('render SearchTool component', () => {

    it('should render SearchTool component and provide stations', () => {
      let wrapper = shallow(<Bike />);
      expect(wrapper.find(SearchTool)).to.have.length(1);
      expect(wrapper.find(SearchTool).prop('stations').length > 0).to.eql(true);
    });
  });
});
