/* global describe it */

import _ from 'lodash';
import { expect } from 'chai';
import CONFIG from '../../../src/config';

describe('Config', () => {

  const DEFAULT_LINE_HEIGHT = CONFIG.DEFAULT_LINE_HEIGHT;
  const DEFAULT_ZOOM_LEVEL = CONFIG.DEFAULT_ZOOM_LEVEL;
  const ZOOMED_IN = CONFIG.ZOOMED_IN;
  const OVERLAY_COLOR = CONFIG.OVERLAY_COLOR;
  const MAX_OVERLAY_SIZE = CONFIG.MAX_OVERLAY_SIZE;
  const MIN_OVERLAY_SIZE = CONFIG.MIN_OVERLAY_SIZE;
  const FETCH_BIKES_URI = CONFIG.FETCH_BIKES_URI;
  const EXTERNAL_MAP_URI = CONFIG.EXTERNAL_MAP_URI;
  const ENABLE_ANNOTATION = CONFIG.ENABLE_ANNOTATION;

  it('should get config variables', () => {

    expect(_.isNumber(DEFAULT_LINE_HEIGHT) && !_.isNaN(DEFAULT_LINE_HEIGHT)).to.eql(true);
    expect(_.isNumber(DEFAULT_ZOOM_LEVEL) && !_.isNaN(DEFAULT_ZOOM_LEVEL)).to.eql(true);
    expect(_.isNumber(ZOOMED_IN) && !_.isNaN(ZOOMED_IN)).to.eql(true);
    expect(_.isNumber(MAX_OVERLAY_SIZE) && !_.isNaN(MAX_OVERLAY_SIZE)).to.eql(true);
    expect(_.isNumber(MIN_OVERLAY_SIZE) && !_.isNaN(MIN_OVERLAY_SIZE)).to.eql(true);

    expect(_.isString(OVERLAY_COLOR) && !!OVERLAY_COLOR).to.eql(true);
    expect(_.isString(FETCH_BIKES_URI) && !!FETCH_BIKES_URI).to.eql(true);
    expect(_.isString(EXTERNAL_MAP_URI) && !!EXTERNAL_MAP_URI).to.eql(true);

    expect(_.isBoolean(ENABLE_ANNOTATION)).to.eql(true);
  });
});
