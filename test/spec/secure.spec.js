
'use strict';

var express = require('express'),
	secure = require('secure'),
	request = require('supertest');

function injectProtocol(proto) {
	return function(req, res, next) {
		req.headers['x-forwarded-proto'] = proto;
		next();
	};
}

describe('secure', function() {

	beforeEach(function() {
		this.app = express();
		this.app.set('trust proxy', true);
	});

	it('should fail when not secure', function(done) {
		this.app.use(injectProtocol('http'));
		this.app.use(secure());
		this.app.get('/', function(req, res) {
			res.status(200).send();
		});
		request(this.app)
			.get('/')
			.expect(function(res) {
				expect(res).to.have.status(403);
			})
			.end(done);
	});

	it('should pass when secure', function(done) {
		this.app.use(injectProtocol('https'));
		this.app.use(secure());
		this.app.get('/', function(req, res) {
			res.status(200).send();
		});
		request(this.app)
			.get('/')
			.expect(function(res) {
				expect(res).to.have.status(200);
			})
			.end(done);
	});

});
