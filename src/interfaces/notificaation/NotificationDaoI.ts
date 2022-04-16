/**
 * @file Declares API for Notification related data access object methods
 */
import {Notification} from "../../models/Notification";

export interface NotificationDaoI {
    createNotification(notification: any): Promise<Notification | null>;

    findAllNotifications(): Promise<Notification[]>;

    findNotificationsForUser(uid: string): Promise<Notification[]>;

    findNotificationsById(id: string): Promise<any>;

    deleteNotificationsById(id: string): Promise<object>;
}
