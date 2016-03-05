/* global describe it */

import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Direction from '../../../src/components/Map/Direction';

describe('Direction Component', () => {

  const TEST_ADDRESS = 'a test address';

  describe('render Text', () => {

    it('should render Text with Get Direction text', () => {
      let wrapper = shallow(<Direction address={TEST_ADDRESS} />);
      expect(wrapper.contains(<React.Text>Get Direction</React.Text>)).to.eql(true);
    });
  });

  describe('render TouchableHighlight', () => {

    it('should provide onPress handler', () => {
      let wrapper = shallow(<Direction address={TEST_ADDRESS} />);
      expect(wrapper.find(React.TouchableHighlight).prop('onPress')).to
        .eql(wrapper.instance().onPressHandler);
    });
  });

  describe('onPressHandler', () => {

    it('should openURL', () => {
      let wrapper = shallow(<Direction address={TEST_ADDRESS} />);
      expect(wrapper.instance().onPressHandler).to.throws('LinkingManager is not defined');
    });
  });

  describe('encodeUrl', () => {

    it('should replace blank speces with +', () => {
      let wrapper = shallow(<Direction address={TEST_ADDRESS} />);
      expect(wrapper.instance().encodeUrl(TEST_ADDRESS)).to.eql(TEST_ADDRESS.split(' ').join('+'));
    });
  });
});
