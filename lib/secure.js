
'use strict';

module.exports = function secure() {
	return function check(req, res, next) {
		if (req.secure) {
			next();
		} else {
			res.status(403).send();
		}
	};
};
