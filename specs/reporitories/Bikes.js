/* global describe it */

import _ from 'lodash';
import Chance from 'chance';
import { expect } from 'chai';
import fetch from 'node-fetch';
import BikesRepository, { parseRawToEntities, parseAddress } from '../../src/repositories/Bikes';

const DEFAULT_TIMEOUT = 10 * 1000;

let chance = new Chance();

function genAddress () {
  return {
    address: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip()
  };
}

function genAddressList (num) {
  let data = [];
  for (let i = 0; i < num; i++) {
    data.push(genAddress());
  }
  return data;
}

function genRawData (id) {
  return {
    id: id.toString() || '0',
    featurename: chance.name(),
    nbbikes: chance.integer(),
    coordinates: {
      latitude: chance.floating(),
      longitude: chance.floating(),
      human_address: '{}'
    }
  };
}

function genRawDataArray (num) {
  let data = [];
  for (let i = 0; i < num; i++) {
    data.push(genRawData(i));
  }
  return data;
}

describe('bikes repository', () => {

  describe('BikesRepository', () => {

    let bikesRepository = new BikesRepository(fetch);

    it('should fetch bikes from endpoint', function (done) {
      this.timeout(DEFAULT_TIMEOUT);
      bikesRepository.fetchBikes()
        .then(data => {
          expect(data.length > 0).to.eql(true);
          _.forEach(data, item => {
            expect(_.isString(item.id)).to.eql(true);
            expect(_.isString(item.name)).to.eql(true);
            expect(_.isNumber(item.numberOfBikes) && !_.isNaN(item.numberOfBikes)).to.eql(true);
            expect(_.isNumber(item.latitude) && !_.isNaN(item.latitude)).to.eql(true);
            expect(_.isNumber(item.longitude) && !_.isNaN(item.longitude)).to.eql(true);
            expect(_.isString(item.address) && !_.isNaN(item.address)).to.eql(true);
          });
          done();
        })
        .catch(err => {
          return done(err);
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
