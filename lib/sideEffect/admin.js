'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

var _redirection = require('./redirection');

var _redirection2 = _interopRequireDefault(_redirection);

var _accumulate = require('./accumulate');

var _accumulate2 = _interopRequireDefault(_accumulate);

var _refresh = require('./refresh');

var _refresh2 = _interopRequireDefault(_refresh);

var _undo = require('./undo');

var _undo2 = _interopRequireDefault(_undo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} dataProvider A Data Provider function
 */
exports.default = function (dataProvider, authProvider, i18nProvider) {
    return (/*#__PURE__*/_regenerator2.default.mark(function admin() {
            return _regenerator2.default.wrap(function admin$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _effects.all)([(0, _i18n2.default)(i18nProvider)(), (0, _auth2.default)(authProvider)(), (0, _undo2.default)(), (0, _fetch2.default)(dataProvider)(), (0, _error2.default)(), (0, _accumulate2.default)(), (0, _redirection2.default)(), (0, _refresh2.default)(), (0, _notification2.default)()]);

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, admin, this);
        })
    );
};

module.exports = exports['default'];