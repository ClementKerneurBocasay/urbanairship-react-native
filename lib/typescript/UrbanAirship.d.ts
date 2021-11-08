import { EmitterSubscription } from "react-native";
import { CustomEvent } from "./CustomEvent";
import { TagGroupEditor } from "./TagGroupEditor";
import { AttributeEditor } from "./AttributeEditor";
import { JsonObject, JsonValue } from "./Json";
/**
 * Enum of event type names.
 */
export declare enum EventType {
    /**
     * Notification response event.
     */
    NotificationResponse = "notificationResponse",
    /**
     * Push received event.
     */
    PushReceived = "pushReceived",
    /**
     * Register event.
     */
    Register = "register",
    /**
     * Registration event.
     */
    Registration = "registration",
    /**
     * Deep link event.
     */
    DeepLink = "deepLink",
    /**
     * Notification opt-in status event.
     */
    NotificationOptInStatus = "notificationOptInStatus",
    /**
     * Inbox updated event.
     */
    InboxUpdated = "inboxUpdated",
    /**
     * Show inbox event.
     */
    ShowInbox = "showInbox"
}
/**
 * Inbox message object.
 */
export interface InboxMessage {
    /**
     * The message ID. Needed to display, mark as read, or delete the message.
     */
    id: string;
    /**
     * The message title.
     */
    title: string;
    /**
     * The message sent date in milliseconds.
     */
    sentDate: number;
    /**
     * Optional - The icon url for the message.
     */
    listIconUrl: string;
    /**
     * The unread / read status of the message.
     */
    isRead: boolean;
    /**
     * The deleted status of the message.
     */
    isDeleted: boolean;
    /**
     * String to String map of any message extras.
     */
    extras: Record<string, string>;
}
/**
 * Event fired when a push is received.
 */
export interface PushReceivedEvent {
    /**
     * The alert.
     */
    alert?: string;
    /**
     * The title.
     */
    title?: string;
    /**
     * The notification ID.
     */
    notificationId: string;
    /**
     * The notification extras.
     */
    extras: JsonObject;
}
/**
 * Event fired when the user initiates a notification response.
 */
export interface NotificationResponseEvent {
    /**
     * The push notification.
     */
    notification: PushReceivedEvent;
    /**
     * The action button ID, if avilable.
     */
    actionId?: string;
    /**
     * Indicates whether the response was a foreground action.
     * This value is always if the user taps the main notification,
     * otherwise it is defined by the notification action button.
     */
    isForeground: boolean;
}
/**
 * Enum of notification options. iOS only.
 */
export declare enum NotificationOptionsIOS {
    /**
     * Alerts.
     */
    Alert = "alert",
    /**
     * Sounds.
     */
    Sound = "sound",
    /**
     * Badges.
     */
    Badge = "badge"
}
/**
 * A map of notification options. iOS only.
 */
export declare type NotificationOptionsMapIOS = {
    [option in NotificationOptionsIOS]: boolean;
};
/**
 * A map of foreground notification options. iOS only.
 */
export declare type ForegroundNotificationOptionsIOS = {
    [option in NotificationOptionsIOS]: boolean | null | undefined;
};
/**
 * Enum of authorized notification settings. iOS only.
 */
export declare enum AuthorizedNotificationSettingsIOS {
    /**
     * Alerts.
     */
    Alert = "alert",
    /**
     * Sounds.
     */
    Sound = "sound",
    /**
     * Badges.
     */
    Badge = "badge",
    /**
     * CarPlay.
     */
    CarPlay = "carPlay",
    /**
     * Lock screen.
     */
    LockScreen = "lockScreen",
    /**
     * Notification center.
     */
    NotificationCenter = "notificationCenter"
}
/**
 * A map of authorized notification settings.
 */
export declare type iOSAuthorizedNotificationSettingsMap = {
    [setting in AuthorizedNotificationSettingsIOS]: boolean;
};
/**
 * Event fired when the notification opt-in status changes.
 */
export interface NotificationOptInStatusEvent {
    /**
     * Whether the user is opted in to notifications.
     */
    optIn: boolean;
    /**
     * The authorized notification settings. iOS only.
     */
    authorizedNotificationSettings?: AuthorizedNotificationSettingsIOS;
}
/**
 * Event fired when the inbox is updated.
 */
export interface InboxUpdatedEvent {
    /**
     * The unread message count.
     */
    messageUnreadCount: number;
    /**
     * The total message count.
     */
    messageCount: number;
}
/**
 * Event fired when the message center requests the inbox to be displayed.
 */
export interface ShowInboxEvent {
    /**
     * The message ID, if available.
     */
    messageId?: string;
}
/**
 * Event fired when a deep link is opened.
 */
export interface DeepLinkEvent {
    /**
     * The deep link string.
     */
    deepLink: string;
}
/**
 * Event fired when a channel registration occurs.
 */
export interface RegistrationEvent {
    /**
     * The channel ID.
     */
    channelId: string;
    /**
     * The registration token. The registration token might be undefined
     * if registration is currently in progress, if the app is not setup properly
     * for remote notifications, if running on an iOS simulator, or if running on
     * an Android device that has an outdated or missing version of Google Play Services.
     */
    registrationToken?: string;
}
/**
 * Android notification config.
 */
export interface NotificationConfigAndroid {
    /**
     * The icon resource na,e.
     */
    icon?: string;
    /**
     * The large icon resource name.
     */
    largeIcon?: string;
    /**
     * The default android notification channel ID.
     */
    defaultChannelId?: string;
}
/**
* The main Airship API.
*/
export declare class UrbanAirship {
    /**
     * Sets the Android notification config. Values not set will fallback to any values set in the airship config options.
     *
     * @param config The notification config object.
     */
    static setAndroidNotificationConfig(config: NotificationConfigAndroid): void;
    /**
     * Sets user notifications enabled. The first time user notifications are enabled
     * on iOS, it will prompt the user for notification permissions.
     *
     * @param enabled true to enable notifications, false to disable.
     */
    static setUserNotificationsEnabled(enabled: boolean): void;
    /**
     * Checks if user notifications are enabled or not.
     *
     * @return A promise with the result.
     */
    static isUserNotificationsEnabled(): Promise<boolean>;
    /**
     * Global data collection flag. Enabled by default, unless `dataCollectionOptInEnabled`
     * is set to `YES` in AirshipConfig.plist on iOS, and `true` in airshipconfig.properties on Android.
     * When disabled, the device will stop collecting and sending data for named user, events,
     * tags, attributes, associated identifiers, and location from the device.
     *
     * Push notifications will continue to work only if `UrbanAirship.setPushTokenRegistrationEnabled`
     * has been explicitly set to `true`, otherwise it will default to the current state of `isDataCollectionEnabled`.
     *
     * @note To disable by default, set the `dataCollectionOptInEnabled` flag to `YES` in AirshipConfig.plist on iOS, and `true` in airshipconfig.properties on Android.
     * @param enabled true to enable data collection, false to disable.
     */
    static setDataCollectionEnabled(enabled: boolean): void;
    /**
     * Checks if data collection is enabled or not.
     *
     * @return A promise with the result.
     */
    static isDataCollectionEnabled(): Promise<boolean>;
    /**
     * Enables/disables sending the device token during channel registration.
     * Defaults to `UrbanAirship.isDataCollectionEnabled`. If set to `false`, the app will not be able to receive push
     * notifications.
     * @param enabled true to enable push token registration, false to disable.
     */
    static setPushTokenRegistrationEnabled(enabled: boolean): void;
    /**
     * Checks if push token registration is enabled or not.
     *
     * @return A promise with the result.
     */
    static isPushTokenRegistrationEnabled(): Promise<boolean>;
    /**
     * Enables user notifications.
     *
     * @return A promise that returns true if enablement was authorized
     * or false if enablement was rejected
     */
    static enableUserPushNotifications(): Promise<boolean>;
    /**
     * Enables channel creation if `channelCreationDelayEnabled` was
     * enabled in the config.
     */
    static enableChannelCreation(): void;
    /**
     * Checks if app notifications are enabled or not. Its possible to have `userNotificationsEnabled`
     * but app notifications being disabled if the user opted out of notifications.
     *
     * @return A promise with the result.
     */
    static isUserNotificationsOptedIn(): Promise<boolean>;
    /**
     * Sets the named user.
     *
     * @param namedUser The named user string, or null/undefined to clear the named user.
     */
    static setNamedUser(namedUser: string | null | undefined): void;
    /**
     * Gets the named user.
     *
     * @return A promise with the result.
     */
    static getNamedUser(): Promise<string | null | undefined>;
    /**
     * Adds a channel tag.
     *
     * @param tag A channel tag.
     */
    static addTag(tag: string): void;
    /**
     * Removes a channel tag.
     *
     * @param tag A channel tag.
     */
    static removeTag(tag: string): void;
    /**
     * Gets the channel tags.
     *
     * @return A promise with the result.
     */
    static getTags(): Promise<string[]>;
    /**
     * Creates an editor to modify the named user tag groups.
     *
     * @return A tag group editor instance.
     */
    static editNamedUserTagGroups(): TagGroupEditor;
    /**
     * Creates an editor to modify the channel tag groups.
     *
     * @return A tag group editor instance.
     */
    static editChannelTagGroups(): TagGroupEditor;
    /**
     * Creates an editor to modify the channel attributes.
     *
     * @return An attribute editor instance.
     */
    static editChannelAttributes(): AttributeEditor;
    /**
     * Creates an editor to modify the named user attributes.
     *
     * @return An attribute editor instance.
     */
    static editNamedUserAttributes(): AttributeEditor;
    /**
     * Enables or disables analytics.
     *
     * Disabling analytics will delete any locally stored events
     * and prevent any events from uploading. Features that depend on analytics being
     * enabled may not work properly if it's disabled (reports, region triggers,
     * location segmentation, push to local time).
     *
     * @param enabled true to enable notifications, false to disable.
     */
    static setAnalyticsEnabled(enabled: boolean): void;
    /**
     * Checks if analytics is enabled or not.
     *
     * @return A promise with the result.
     */
    static isAnalyticsEnabled(): Promise<boolean>;
    /**
     * Initiates screen tracking for a specific app screen, must be called once per tracked screen.
     *
     * @param screen The screen's string identifier
     */
    static trackScreen(screen: string): void;
    /**
     * Gets the channel ID.
     *
     * @return A promise with the result.
     */
    static getChannelId(): Promise<string | null | undefined>;
    /**
     * Gets the registration token.
     *
     * @return A promise with the result. The registration token might be undefined
     * if registration is currently in progress, if the app is not setup properly
     * for remote notifications, if running on an iOS simulator, or if running on
     * an Android device that has an outdated or missing version of Google Play Services.
     */
    static getRegistrationToken(): Promise<string | null | undefined>;
    /**
     * Associates an identifier for the Connect data stream.
     *
     * @param key The identifier's key.
     * @param id The identifier's id, or null/unefined to clear.
     */
    static associateIdentifier(key: string, id?: string): void;
    /**
     * Adds a custom event.
     *
     * @param event The custom event.
     * @return A promise that returns null if resolved, or an Error if the
     * custom event is rejected.
     */
    static addCustomEvent(event: CustomEvent): Promise<null | Error>;
    /**
     * Runs an Urban Airship action.
     *
     * @param name The name of the action.
     * @param value The action's value.
     * @return A promise that returns the action result if the action
     * successfully runs, or the Error if the action was unable to be run.
     */
    static runAction(name: string, value?: JsonValue): Promise<JsonValue | Error>;
    /**
     * Sets the foregorund presentation options for iOS.
     * This method is only supported on iOS. Android will no-op.
     *
     * @param options The map of options.
     */
    static setForegroundPresentationOptions(options: ForegroundNotificationOptionsIOS): any;
    /**
     * Adds a listener for an Urban Airship event.
     *
     * @param eventType The event type. Either EventType.NotificationResponse, EventType.PushReceived,
     * EventType.Register, EventType.Reistration, EventType.DeepLink, EventType.NotificationOptInStatus,
     * EventType.InboxUpdated, or EventType.ShowInbox.
     * @param listener The event listener.
     * @return An emitter subscription.
     */
    static addListener(eventType: EventType, listener: (...args: any[]) => any): EmitterSubscription;
    /**
     * Removes a listener for an Urban Airship event.
     *
     * @param eventType The event type. Either EventType.NotificationResponse, EventType.PushReceived,
     * EventType.Register, EventType.Reistration, EventType.DeepLink, EventType.NotificationOptInStatus,
     * EventType.InboxUpdated, or EventType.ShowInbox.
     * @param listener The event listener. Should be a reference to the function passed into addListener.
     */
    static removeListener(eventType: EventType, listener: (...args: any[]) => any): void;
    /**
     * Removes all listeners for Urban Airship events.
     *
     * @param eventType The event type. Either EventType.NotificationResponse, EventType.PushReceived,
     * EventType.Register, EventType.Reistration, EventType.DeepLink, EventType.NotificationOptInStatus,
     * EventType.InboxUpdated, or EventType.ShowInbox.
     */
    static removeAllListeners(eventType: EventType): void;
    /**
     * Enables or disables autobadging on iOS. Badging is not supported for Android.
     *
     * @param enabled Whether or not to enable autobadging.
     */
    static setAutobadgeEnabled(enabled: boolean): void;
    /**
     * Checks to see if autobadging on iOS is enabled. Badging is not supported for Android.
     *
     * @return A promise with the result, either true or false.
     */
    static isAutobadgeEnabled(): Promise<boolean>;
    /**
     * Sets the badge number for iOS. Badging is not supported for Android.
     *
     * @param badgeNumber The badge number.
     */
    static setBadgeNumber(badgeNumber: number): void;
    /**
     * Gets the current badge number for iOS. Badging is not supported for Android
     * and this method will always return 0.
     *
     * @return A promise with the result.
     */
    static getBadgeNumber(): Promise<number>;
    /**
     * Displays the default message center.
     */
    static displayMessageCenter(): void;
    /**
     * Dismisses the default message center.
     */
    static dismissMessageCenter(): void;
    /**
     * Displays an inbox message.
     *
     * @param messageId The id of the message to be displayed.
     * @return A promise with the result.
     */
    static displayMessage(messageId: string): Promise<boolean>;
    /**
     * Dismisses the currently displayed inbox message.
     */
    static dismissMessage(): void;
    /**
     * Retrieves the current inbox messages.
     *
     * @return A promise with the result.
     */
    static getInboxMessages(): Promise<InboxMessage[]>;
    /**
     * Deletes an inbox message.
     *
     * @param messageId The id of the message to be deleted.
     * @return A promise with the result.
     */
    static deleteInboxMessage(messageId: string): Promise<boolean>;
    /**
     * Marks an inbox message as read.
     *
     * @param messageId The id of the message to be marked as read.
     * @return A promise with the result.
     */
    static markInboxMessageRead(messageId: string): Promise<boolean>;
    /**
     * Forces the inbox to refresh. This is normally not needed as the inbox will
     * automatically refresh on foreground or when a push arrives that's associated
     * with a message.
     *
     * @return{Promise.<boolean>} A promise with the result.
     */
    static refreshInbox(): Promise<boolean>;
    /**
     * Sets the default behavior when the message center is launched from a push
     * notification. If set to false the message center must be manually launched.
     *
     * @param enabled true to automatically launch the default message center, false to disable.
     */
    static setAutoLaunchDefaultMessageCenter(enabled: boolean): void;
    /**
     * Gets all the active notifications for the application.
     * Supported on Android Marshmallow (23)+ and iOS 10+.
     *
     * @return A promise with the result.
     */
    static getActiveNotifications(): Promise<PushReceivedEvent[]>;
    /**
     * Clears all notifications for the application.
     * Supported on Android and iOS 10+. For older iOS devices, you can set
     * the badge number to 0 to clear notifications.
     */
    static clearNotifications(): void;
    /**
     * Clears a specific notification.
     * Supported on Android and iOS 10+.
     *
     * @param identifier The notification identifier. The identifier will be
     * available in the PushReceived event and in the active notification response
     * under the "notificationId" field.
     */
    static clearNotification(identifier: string): void;
}
