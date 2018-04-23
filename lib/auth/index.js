'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithPermissions = exports.Authenticated = undefined;

var _types = require('./types');

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _Authenticated2 = require('./Authenticated');

var _Authenticated3 = _interopRequireDefault(_Authenticated2);

var _WithPermissions2 = require('./WithPermissions');

var _WithPermissions3 = _interopRequireDefault(_WithPermissions2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Authenticated = _Authenticated3.default;
exports.WithPermissions = _WithPermissions3.default;