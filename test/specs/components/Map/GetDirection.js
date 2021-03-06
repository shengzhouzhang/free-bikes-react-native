/* global describe it */

import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import GetDirection from '../../../../src/components/Map/GetDirection';

describe('GetDirection component', () => {

  const TEST_ADDRESS = 'a test address';

  describe('render Text', () => {

    it('should show Get Direction text', () => {
      let wrapper = shallow(<GetDirection address={TEST_ADDRESS} />);
      expect(wrapper.contains(<React.Text>Get Direction</React.Text>)).to.eql(true);
    });
  });

  describe('render TouchableHighlight', () => {

    it('should provide onPress handler', () => {
      let wrapper = shallow(<GetDirection address={TEST_ADDRESS} />);
      expect(wrapper.find(React.TouchableHighlight).prop('onPress')).to
        .eql(wrapper.instance().onPressHandler);
    });
  });

  describe('onPressHandler', () => {

    it('should openURL', () => {
      let wrapper = shallow(<GetDirection address={TEST_ADDRESS} />);
      expect(wrapper.instance().onPressHandler).to.throws('LinkingManager is not defined');
    });
  });
});
