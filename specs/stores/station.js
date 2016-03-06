/* global describe it */

import Promise from 'bluebird';
import sinon from 'sinon';
import { expect } from 'chai';
import SelectedStation, { reducer } from '../../src/stores/station';

describe('SelectedStation Store', () => {

  const TEST_STATION = { id: 0, name: 'TEST' };

  describe('reducer', () => {

    it('should get initial state', () => {
      let result = reducer(null, { type: null });
      expect(result).to.eql(null);
    });

    it('should set selected station', () => {
      let result = reducer(null, { type: 'SELECT', station: TEST_STATION });
      expect(result).to.eql(TEST_STATION);
    });
  });

  describe('store', () => {

    it('should dispatch action and subscribe the changes', () => {

      let onChangeHandler = sinon.spy();
      let unsubscribe = SelectedStation.subscribe(onChangeHandler);

      expect(SelectedStation.getState()).to.not.eql(TEST_STATION);

      SelectedStation.dispatch({ type: 'SELECT', station: TEST_STATION });

      return Promise.delay(1000)
        .then(() => {
          expect(onChangeHandler.called).to.eql(true);
          expect(SelectedStation.getState()).to.eql(TEST_STATION);
          unsubscribe();
        })
        .catch(err => {
          unsubscribe();
          throw err;
        });
    });
  });
});
