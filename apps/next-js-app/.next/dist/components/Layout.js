'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/fixjs/work/online-workshops/react-workshops/apps/next-js-app/components/Layout.js';


var Layout = function (_React$Component) {
  (0, _inherits3.default)(Layout, _React$Component);

  function Layout() {
    (0, _classCallCheck3.default)(this, Layout);

    return (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || (0, _getPrototypeOf2.default)(Layout)).apply(this, arguments));
  }

  (0, _createClass3.default)(Layout, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }, _react2.default.createElement('button', { onClick: function onClick() {
          return _index2.default.push('/');
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, 'Home'), _react2.default.createElement('button', { onClick: function onClick() {
          return _index2.default.push('/episodes');
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      }, 'Episodes'), _react2.default.createElement('button', { onClick: function onClick() {
          return _index2.default.push('/about');
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, 'About'), _react2.default.createElement('hr', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }), this.props.children);
    }
  }]);

  return Layout;
}(_react2.default.Component);

exports.default = Layout;