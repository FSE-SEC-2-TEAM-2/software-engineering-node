/**
 * @file Declares API for Notification related data access object methods
 */
import {Notification} from "../../models/Notification";

/**
 * Defines the CRUD functions {@link NotificationDao} is to support.
 */
export interface NotificationDaoI {
    /**
     * Creates a {@link Notification} with the passed in data.
     * @param notification {Notification} - the Notification to be Created.
     * @return {Promise<object>} - Promise containing the status of the delete operation.
     */
    createNotification(notification: any): Promise<Notification | null>;

    /**
     * Returns all the {@link Notification}s in the database.
     * @return {Promise<Notification[]>} - Promise containing all the Notifications
     */
    findAllNotifications(): Promise<Notification[]>;

    /**
     * Returns all the {@link Notification}s with the intended User as the passed in UID
     * @param uid {string} - the UID of the intended recipient
     * @return {Promise<Notification[]>} - Promise containing all the Notifications
     */
    findNotificationsForUser(uid: string): Promise<Notification[]>;

    /**
     * Returns the {@link Notification} with the passed in ID
     * @param id {string} - the ID of the notification to be retrieved
     * @return {Promise<Notification>} - Promise containing the Notification with the passed in ID.
     */
    findNotificationsById(id: string): Promise<any>;

    /**
     * Deletes the {@link Notification} with the passed in ID, and returns the result of the delete operation.
     * @param id {string} - the ID of the notification to be deleted.
     * @return {Promise<object>} - Promise containing the status of the delete operation.
     */
    deleteNotificationsById(id: string): Promise<object>;
}
