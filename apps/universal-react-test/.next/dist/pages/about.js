'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AboutPage = require('../components/AboutPage');

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/mehran/work/online-workshops/react-workshops/apps/universal-react-app0/pages/about.js?entry';

exports.default = function () {
  return _react2.default.createElement('div', { className: 'app-container', __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  }, _react2.default.createElement(_AboutPage2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }), _react2.default.createElement('button', { onClick: function onClick() {
      return _index2.default.push('/');
    }, __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, 'Home'));
};