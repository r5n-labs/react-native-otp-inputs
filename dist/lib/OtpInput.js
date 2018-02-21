Object.defineProperty(exports, '__esModule', { value: true })
var _jsxFileName = './lib/OtpInput.js'
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()
var _react = require('react')
var _react2 = _interopRequireDefault(_react)
var _propTypes = require('prop-types')
var _propTypes2 = _interopRequireDefault(_propTypes)
var _reactNative = require('react-native')
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  } else {
    return Array.from(arr)
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass,
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}
var OtpInput = (function(_Component) {
  _inherits(OtpInput, _Component)
  function OtpInput() {
    var _ref
    var _temp, _this, _ret
    _classCallCheck(this, OtpInput)
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        (_ref = OtpInput.__proto__ || Object.getPrototypeOf(OtpInput)).call.apply(
          _ref,
          [this].concat(args),
        ),
      )),
      _this)),
      (_this.state = { isFocused: false }),
      (_this._onFocus = function() {
        return _this.setState({ isFocused: true })
      }),
      (_this._onBlur = function() {
        return _this.setState({ isFocused: false })
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    )
  }
  _createClass(OtpInput, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var _props = this.props,
          error = _props.error,
          value = _props.value,
          focusedBorderColor = _props.focusedBorderColor,
          containerStyles = _props.containerStyles,
          textErrorColor = _props.textErrorColor
        return _react2.default.createElement(
          _reactNative.View,
          {
            style: [
              styles.container,
              { borderColor: this.state.isFocused ? focusedBorderColor : 'transparent' },
            ].concat(_toConsumableArray(containerStyles)),
            __source: { fileName: _jsxFileName, lineNumber: 25 },
          },
          _react2.default.createElement(_reactNative.TextInput, {
            clearTextOnFocus: true,
            keyboardType: 'phone-pad',
            maxLength: 1,
            onBlur: this._onBlur,
            onChangeText: updateText,
            onFocus: this._onFocus,
            onKeyPress: handleBackspace,
            ref: function ref(input) {
              return (_this2.input = input)
            },
            selectTextOnFocus: true,
            style: [styles.otpInput, error && { color: textErrorColor }],
            underlineColorAndroid: 'transparent',
            value: value,
            __source: { fileName: _jsxFileName, lineNumber: 32 },
          }),
        )
      },
    },
  ])
  return OtpInput
})(_react.Component)
OtpInput.propTypes = {
  error: _propTypes2.default.bool,
  value: _propTypes2.default.string,
  focusedBorderColor: _propTypes2.default.string,
  containerStyles: _reactNative.ViewPropTypes.style,
  textErrorColor: _reactNative.ViewPropTypes.style,
}
exports.default = OtpInput
var styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: '#a1a1a1',
    borderRadius: 6,
    borderWidth: 1,
    height: 53,
    position: 'relative',
  },
  otpInput: {
    width: 40,
    marginTop: 4,
    paddingLeft: 12,
    fontFamily: 'bold',
    color: '#ffffff',
    fontSize: 24,
  },
})
