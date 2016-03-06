/* global describe it */

import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Input from '../../../../src/components/SearchTool/Input';

describe('Input component', () => {

  const TEST_VALUE = 'keyword';

  describe('render TextInput', () => {

    it('should provide the value and onChange handler', () => {
      let onTextChangeHandler = sinon.spy();
      let wrapper = shallow(<Input value={TEST_VALUE} onTextChange={onTextChangeHandler} />);
      expect(wrapper.find(React.TextInput)).to.have.length(1);
      expect(wrapper.find(React.TextInput).prop('value')).to.eql(TEST_VALUE);
      expect(wrapper.find(React.TextInput).prop('onChange')).to
        .eql(wrapper.instance().onTextChangeHandler);
    });
  });

  describe('onTextChangeHandler', () => {

    it('should trigger onTextChange prop', () => {
      let onTextChangeHandler = sinon.spy();
      let wrapper = shallow(<Input value="" onTextChange={onTextChangeHandler} />);
      wrapper.instance().onTextChangeHandler({ nativeEvent: { text: TEST_VALUE } });
      expect(onTextChangeHandler.called).eql(true);
      expect(onTextChangeHandler.getCall(0).args[0]).eql(TEST_VALUE);
    });
  });
});
