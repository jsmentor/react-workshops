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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/fixjs/work/online-workshops/react-workshops/apps/next-js-app/components/AboutPage/index.js';


var AboutPage = function (_React$Component) {
  (0, _inherits3.default)(AboutPage, _React$Component);

  function AboutPage() {
    (0, _classCallCheck3.default)(this, AboutPage);

    return (0, _possibleConstructorReturn3.default)(this, (AboutPage.__proto__ || (0, _getPrototypeOf2.default)(AboutPage)).apply(this, arguments));
  }

  (0, _createClass3.default)(AboutPage, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        }
      }, 'About: React Workshops');
    }
  }]);

  return AboutPage;
}(_react2.default.Component);

exports.default = AboutPage;