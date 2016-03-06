/* global describe it */

import _ from 'lodash';
import { expect } from 'chai';
import sinon from 'sinon';
import { genAddressList, genRawDataArray } from '../../utils/gen';
import BikesRepository, { parseRawToEntities, parseAddress } from '../../../src/repositories/Bikes';
import CONFIG from '../../../src/config';

describe('bikes repository', () => {

  describe('BikesRepository', () => {

    const TEST_ERROR_MSG = 'CANCEL_BY_TEST';

    it('should provide the endpoint', () => {
      let fetch = sinon.stub().returns(Promise.reject(new Error(TEST_ERROR_MSG)));
      let bikesRepository = new BikesRepository(fetch);

      bikesRepository.fetchBikes()
        .catch(err => console.log(err));
      expect(fetch.called).to.eql(true);
      expect(fetch.getCall(0).args[0]).to.eql(CONFIG.FETCH_BIKES_URI);
    });

    it('should return error', () => {
      let fetch = sinon.stub().returns(Promise.reject(new Error(TEST_ERROR_MSG)));
      let bikesRepository = new BikesRepository(fetch);

      return bikesRepository.fetchBikes()
        .catch(err => expect(err.message).to.eql(TEST_ERROR_MSG));
    });

    it('should return entities', () => {
      let fetch = sinon.stub().returns(Promise.resolve({ json: () => genRawDataArray(3) }));
      let bikesRepository = new BikesRepository(fetch);
      return bikesRepository.fetchBikes()
        .then(data => {
          expect(data).to.have.length(3);
          _.forEach(data, item => {
            expect(_.isString(item.id)).to.eql(true);
            expect(_.isString(item.name)).to.eql(true);
            expect(_.isNumber(item.numberOfBikes) && !_.isNaN(item.numberOfBikes)).to.eql(true);
            expect(_.isNumber(item.latitude) && !_.isNaN(item.latitude)).to.eql(true);
            expect(_.isNumber(item.longitude) && !_.isNaN(item.longitude)).to.eql(true);
            expect(_.isString(item.address) && !_.isNaN(item.address)).to.eql(true);
          });
        });
    });
  });

  describe('parseRawToEntities', () => {

    const TEST_RAW = genRawDataArray(100);

    it('should get entities', () => {
      let results = parseRawToEntities(TEST_RAW);
      expect(results).to.have.length(TEST_RAW.length);
      _.forEach(results, (item, index) => {
        expect(item.id).to.eql(index.toString());
        expect(item.name).to.eql(TEST_RAW[index].featurename);
        expect(item.numberOfBikes).to.eql(_.max([ TEST_RAW[index].nbbikes, 0 ]));
        expect(item.latitude).to.eql(TEST_RAW[index].coordinates.latitude);
        expect(item.longitude).to.eql(TEST_RAW[index].coordinates.longitude);
        expect(item.address).to.eql('');
      });
    });
  });

  describe('parseAddress', () => {

    const TEST_ADDRESSES = genAddressList(100);

    it('should parse address, city, state, zip', () => {

      _.forEach(TEST_ADDRESSES, address => {
        let result = parseAddress(JSON.stringify(address));
        expect(result.includes(address.address)).to.eql(true);
        expect(result.includes(address.city)).to.eql(true);
        expect(result.includes(address.state)).to.eql(true);
        expect(result.includes(address.zip)).to.eql(true);
      });
    });
  });
});
