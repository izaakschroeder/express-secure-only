
'use strict';

var _ = require('lodash'),
	url = require('url');

module.exports = function secure() {
	return function check(req, res, next) {
		if (req.secure) {
			next();
		} else {
			// TODO: consider using `originalUrl` instead; then can also remove
			// the "no-underscore-dangle" line from accessing private props.
			res.redirect(403, url.format(_.defaults({
				protocol: 'https:',
				host: req.get('Host')
			}, req._parsedUrl)));
		}
	};
};
