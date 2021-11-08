import { NativeEventEmitter, EmitterSubscription } from "react-native";
/**
 * Custom native event emitter with additional Android behavior
 *
 * @hidden
 */
export declare class UAEventEmitter extends NativeEventEmitter {
    constructor();
    addListener(eventType: string, listener: (...args: any[]) => any, context?: Object): EmitterSubscription;
    removeAllListeners(eventType: string): void;
    removeSubscription(subscription: EmitterSubscription): void;
}
