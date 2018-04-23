'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (basePath, id) {
    var linkType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'edit';

    var link = basePath + '/' + encodeURIComponent(id);

    if (linkType === 'show') {
        return link + '/show';
    }

    return link;
};

module.exports = exports['default'];