/**
 * Dependencies
 */

const epoch = new Date('1970-01-01 00:00:00 UTC');
const Cookie = require('js-cookie');
const parser = require('cookie');

/**
 * Export
 */

module.exports = {
	set: function (ctx, value, options) {
		options = options || {};
		options.path = options.path || '/';
		if (arguments.length === 2) {
			if (ctx.req) {
				// server
				ctx.res.setHeader(
					'Set-Cookie',
					parser.serialize('flash', JSON.stringify(value), options),
				);
			} else {
				// client
				Cookie.set('flash', JSON.stringify(value), options);
			}
		} else if (arguments.length === 1) {
			// client
			Cookie.set('flash', JSON.stringify(ctx), options);
		}
	},
	get: function (ctx) {
		var value;
		if (ctx && ctx.req) {
			// server
			var header = ctx.req.headers.cookie;
			if (!header) return;
			var cookies = parser.parse(header);
			if (!cookies.flash) return;
			value = JSON.parse(cookies.flash);
			ctx.res.setHeader(
				'Set-Cookie',
				parser.serialize('flash', value, { expires: epoch }),
			);
			return value;
		} else {
			// client
			value = Cookie.get('flash');
			if (!value) return;
			Cookie.set('flash', null);
			return JSON.parse(value);
		}
	},
};
