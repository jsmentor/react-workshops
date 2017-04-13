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

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _WorkshopsPage = require('../components/WorkshopsPage');

var _WorkshopsPage2 = _interopRequireDefault(_WorkshopsPage);

var _episodes = require('../mock/episodes.json');

var _episodes2 = _interopRequireDefault(_episodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/fixjs/work/online-workshops/react-workshops/apps/next-js-app/pages/index.js?entry';

exports.default = function () {
  return _react2.default.createElement(Index, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  });
};

var Index = function (_React$Component) {
  (0, _inherits3.default)(Index, _React$Component);

  function Index(props) {
    (0, _classCallCheck3.default)(this, Index);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).call(this, props));

    _this.loadEpisodes = function () {
      _this.setState({
        episodes: _.clone(_episodes2.default)
      });
    };

    _this.state = {
      episodes: []
    };
    return _this;
  }

  (0, _createClass3.default)(Index, [{
    key: 'render',
    value: function render() {
      var episodes = this.state.episodes;

      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement(_WorkshopsPage2.default, { title: 'React Workshops', episodes: episodes, __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }), _react2.default.createElement('button', { onClick: this.loadEpisodes, __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, 'Load mock episodes2!'));
    }
  }]);

  return Index;
}(_react2.default.Component);