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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _episodes = require('../../mock/episodes.json');

var _episodes2 = _interopRequireDefault(_episodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/fixjs/work/online-workshops/react-workshops/apps/next-js-app/components/WorkshopsPage/index.js';


var mockEpisodes2 = _lodash2.default.clone(_episodes2.default);

var WorkshopsPage = function (_React$Component) {
  (0, _inherits3.default)(WorkshopsPage, _React$Component);

  function WorkshopsPage(props) {
    (0, _classCallCheck3.default)(this, WorkshopsPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WorkshopsPage.__proto__ || (0, _getPrototypeOf2.default)(WorkshopsPage)).call(this, props));

    _initialiseProps.call(_this);

    console.info('Mounting 1. lifecycle method: constructor');

    var _props$episodes = props.episodes,
        episodes = _props$episodes === undefined ? [] : _props$episodes;

    _this.state = {
      episodes: episodes
    };
    return _this;
  }

  (0, _createClass3.default)(WorkshopsPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.info('Mounting 2. lifecycle method: componentWillMount');
    }
  }, {
    key: 'render',
    value: function render() {
      var title = this.props.title;
      var _state$episodes = this.state.episodes,
          episodes = _state$episodes === undefined ? [] : _state$episodes;

      console.info('Mounting 3. lifecycle method: render');
      console.log('Updating 4. lifecycle method: render');

      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, title), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }), episodes.length ? _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }, 'Episodes:', _react2.default.createElement('ul', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, episodes.map(function (episode, index) {
        return _react2.default.createElement('li', { key: index, __source: {
            fileName: _jsxFileName,
            lineNumber: 81
          }
        }, episode.name);
      }))) : _react2.default.createElement('span', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, 'No episodes has been shared yet!'), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        }
      }), _react2.default.createElement('button', { onClick: this.loadEpisodes, __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, 'Load mock episodes1!'));
    }
  }]);

  return WorkshopsPage;
}(_react2.default.Component);

WorkshopsPage.defaultProps = {
  title: 'React Workshops',
  episodes: []
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.loadEpisodes = function () {
    _this2.setState({
      episodes: _episodes2.default
    });
  };

  this.componentDidMount = function () {
    console.info('Mounting 4. lifecycle method: componentDidMount');
  };

  this.componentWillUnmount = function () {
    console.info('Unmounting 1. lifecycle method: componentWillUnmount');
  };

  this.componentWillReceiveProps = function (nextProps) {
    var episodes = nextProps.episodes;

    console.log('Updating 1. lifecycle method: componentWillReceiveProps > nextProps: ', nextProps);

    _this2.setState({
      episodes: episodes
    });
  };

  this.shouldComponentUpdate = function (nextProps, nextState) {
    var _nextState$episodes = nextState.episodes,
        episodes = _nextState$episodes === undefined ? [] : _nextState$episodes;

    console.log('Updating 2. lifecycle method: shouldComponentUpdate');
    return episodes !== _episodes2.default;
  };

  this.componentWillUpdate = function () {
    console.log('Updating 3. lifecycle method: componentWillUpdate');
  };

  this.componentDidUpdate = function () {
    console.log('Updating 5. lifecycle method: componentDidUpdate');
  };
};

exports.default = WorkshopsPage;