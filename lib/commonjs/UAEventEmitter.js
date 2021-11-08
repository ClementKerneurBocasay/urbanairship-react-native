/* Copyright Airship and Contributors */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UAEventEmitter = void 0;

var _reactNative = require("react-native");

/**
 * @hidden
 */
const UrbanAirshipModule = _reactNative.NativeModules.UrbanAirshipReactModule;
/**
 * Custom native event emitter with additional Android behavior
 *
 * @hidden
 */

class UAEventEmitter extends _reactNative.NativeEventEmitter {
  constructor() {
    super(UrbanAirshipModule);
  }

  addListener(eventType, listener, context) {
    if (_reactNative.Platform.OS === 'android') {
      UrbanAirshipModule.addAndroidListener(eventType);
    }

    return super.addListener(eventType, listener, context);
  }

  removeAllListeners(eventType) {
    if (_reactNative.Platform.OS === 'android') {
      UrbanAirshipModule.removeAndroidListeners(this.listeners(eventType).length);
    }

    super.removeAllListeners(eventType);
  }

  removeSubscription(subscription) {
    if (_reactNative.Platform.OS === 'android') {
      UrbanAirshipModule.removeAndroidListeners(1);
    }

    super.removeSubscription(subscription);
  }

}

exports.UAEventEmitter = UAEventEmitter;
//# sourceMappingURL=UAEventEmitter.js.map