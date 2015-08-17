/* global beforeEach : false, afterEach : false */
/* jshint node : true */

'use strict';

require('./let');

var request = require('supertest'),
    express = require('express'),
	_ = require('lodash');

function buildRequest(opts){

	opts.host = opts.host || '';
	opts.port = opts.port ? ':' + opts.port : '';
	opts.method = (opts.method || 'GET').toLowerCase();
	opts.path = opts.path || '/';

    return request(opts.host + opts.port)[opts.method](opts.path);
}

/************************************
 * setupRequest
 *
 * @param Object contains request_attrs, an object containing data we can build our url
 * @return a supertest request with the url & path we want
 ***********************************/
function setupRequest(options){
	options = _.defaults(options || {}, {
		request_attrs : {},
		spec_attrs : {}
	});

	beforeEach(function(){
		var props = _.pick(options, 'request_attrs', 'spec_attrs');
		_.merge(this, props);

		// lazy set our api request within our spec.
		this.let_('request', function(){
			return buildRequest(this.request_attrs);
		});

		// lazily set common query params
		this.let_('spec', function(){
			return this.spec_attrs;
		});
	});

	afterEach(function(){
		delete this.vmp_request;
		delete this.request_attrs;
		delete this.spec_attrs;
	});
}

exports = module.exports = setupRequest;
