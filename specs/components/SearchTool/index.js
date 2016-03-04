
import React from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import SearchTool from '../../../components/SearchTool';
import Input from '../../../components/SearchTool/Input';
import Result from '../../../components/SearchTool/Result';
import SelectedStation from '../../../stores/station';

describe('SearchTool Component', () => {

  const TEST_KEYWORD = 'keyword';
  const TEST_KEYWORD_2 = 'another';
  const MIN_LEN = 3;

  const TEST_STATIONS = [
    { id: 0, name: TEST_KEYWORD.toUpperCase(), numberOfBikes: 10, position: { lat: -10, lng: 10 } },
    { id: 1, name: TEST_KEYWORD.toLowerCase(), numberOfBikes: 10, position: { lat: -10, lng: 10 } },
    { id: 2, name: TEST_KEYWORD_2, numberOfBikes: 10, position: { lat: -10, lng: 10 } },
  ];

  describe('initial state', () => {

    it('should has empty text value and isTyping false', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      expect(wrapper.instance().state.text).to.eql('');
      expect(wrapper.instance().state.isTyping).to.eql(false);
    });
  });

  describe('render Input Component', () => {

    it('should update text value', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      expect(wrapper.find(Input)).to.have.length(1);
      expect(wrapper.find(Input).prop('value')).to.eql('');
      wrapper.instance().setState({ text: TEST_KEYWORD });
      wrapper.update();
      expect(wrapper.find(Input).prop('value')).to.eql(TEST_KEYWORD);
    });

    it('should handle the onTextChange of Input Component', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      expect(wrapper.find(Input)).to.have.length(1);
      expect(wrapper.find(Input).prop('onTextChange')).to.eql(wrapper.instance().onTextChangeHandler);
    });
  });

  describe('render Result Component', () => {

    it(`should render Result Component when typing more then ${MIN_LEN} characters`, () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} minimumKeywordLength={MIN_LEN} />);
      wrapper.instance().setState({ text: TEST_KEYWORD.substring(0, MIN_LEN + 1), isTyping: true });
      wrapper.update();
      expect(wrapper.find(Result)).to.have.length(1);
      expect(wrapper.find(Result).prop('stations').length).to.eql(2);
    });

    it('should not render Result Component when typing less characters', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} minimumKeywordLength={MIN_LEN} />);
      wrapper.instance().setState({ text: TEST_KEYWORD.substring(0, MIN_LEN), isTyping: true });
      wrapper.update();
      expect(wrapper.find(Result)).to.have.length(0);
    });

    it('should not render Result Component when clicking one of the results', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      wrapper.instance().setState({ text: TEST_KEYWORD.substring(0, MIN_LEN + 1), isTyping: true });
      wrapper.update();
      expect(wrapper.find(Result)).to.have.length(1);
      wrapper.instance().setState({ isTyping: false });
      wrapper.update();
      expect(wrapper.find(Result)).to.have.length(0);
    });
  });

  describe('componentDidMount', () => {

    it('should subscribe to the selected station store', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      wrapper.instance().componentDidMount();
      wrapper.instance().onSelectStationHandler = sinon.spy();
      SelectedStation.dispatch({ type: 'SELECT', station: { id: TEST_STATIONS[0].id, name: TEST_STATIONS[0].name } });
      expect(wrapper.instance().onSelectStationHandler.called).to.eql(true);
      expect(wrapper.instance().onSelectStationHandler.getCall(0).args[0]).to.eql(TEST_STATIONS[0].name);
    });
  });

  describe('componentWillUnmount', () => {

    it('should unsubscribe to the selected station store', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      wrapper.instance().unsubscribe = sinon.spy();
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().unsubscribe.called).to.eql(true);
    });
  });

  describe('onSelectStationHandler', () => {

    it('should update text and isTyping state', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      wrapper.instance().setState = sinon.spy();
      let results = wrapper.instance().onSelectStationHandler(TEST_KEYWORD);
      expect(wrapper.instance().setState.called).to.eql(true);
      expect(wrapper.instance().setState.getCall(0).args[0]).to.eql({ text: TEST_KEYWORD, isTyping: false });
    });
  });

  describe('onTextChangeHandler', () => {

    it('should update text and isTyping state', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      wrapper.instance().setState = sinon.spy();
      let results = wrapper.instance().onTextChangeHandler(TEST_KEYWORD);
      expect(wrapper.instance().setState.called).to.eql(true);
      expect(wrapper.instance().setState.getCall(0).args[0]).to.eql({ text: TEST_KEYWORD, isTyping: true });
    });
  });

  describe('filter', () => {

    it('should match keyword incasesensitive', () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      let results = wrapper.instance().filter(TEST_STATIONS, TEST_KEYWORD);
      expect(results.length).to.eql(2);
    });

    it(`should not match any when keyword less then ${MIN_LEN} characters`, () => {
      let wrapper = shallow(<SearchTool stations={TEST_STATIONS} />);
      let results = wrapper.instance().filter(TEST_STATIONS, TEST_KEYWORD.substring(0, MIN_LEN));
      expect(results.length).to.eql(0);
    });
  });
});
