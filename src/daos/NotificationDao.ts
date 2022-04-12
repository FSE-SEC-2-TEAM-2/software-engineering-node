/**
 * @file Implements APIs for Notification related data access object methods
 */
import {NotificationDaoI} from "../interfaces/notificaation/NotificationDaoI";
import {Notification} from "../models/Notification";
import {NotificationModel} from "../mongoose/notification/NotificationModel";
import {UserModel} from "../mongoose/user/UserModel";
import {TuitModel} from "../mongoose/tuit/TuitModel";

/**
 * @class NotificationDao NotificationDao Implements the NotificationDaoI, with all the CRUD functionalities for
 * the notifications resource
 * @property {NotificationDao} notificationDao - Singleton DAO implementing Notification CRUD operations
 */
export class NotificationDao implements NotificationDaoI {
    private static notificationDao: NotificationDao | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * Returns the Singleton Instance of the NotificationDao
     * @function
     * @return {NotificationDao} the Singleton Instance of the NotificationDao
     */
    public static getInstance(): NotificationDao {
        if (NotificationDao.notificationDao === null) {
            NotificationDao.notificationDao = new NotificationDao();
        }
        return NotificationDao.notificationDao
    }

    public async createNotification(notification: any): Promise<Notification | null> {
        return NotificationModel
            .create(notification);
    }

    public async deleteNotificationsById(id: string): Promise<object> {
        return NotificationModel
            .deleteOne({_id: id})
    }

    public async findAllNotifications(): Promise<Notification[]> {
        return NotificationModel
            .find()
            .populate({
                path: 'subject_uid',
                model: UserModel,
            })
            .populate({
                path: 'subject_tid',
                model: TuitModel,
            })
            .populate({
                path: 'predicate_uid',
                model: UserModel,
            })
            .populate({
                path: 'predicate_tid',
                model: TuitModel,
            })
            // .populate({
            //     path: 'subject',
            //     model: TuitModel,
            //     match: {subject_type: "tuit"}
            // })
            // .populate({
            //     path: 'subject',
            //     model: UserModel,
            //     match: {subject_type: "user"}
            // })
            // .populate({
            //     path: 'predicate',
            //     model: TuitModel,
            //     match: {predicate_type: "tuit"}
            // })
            // .populate({
            //     path: 'predicate',
            //     model: UserModel,
            //     match: {predicate_type: "user"}
            // })
    }

    public async findNotificationsById(id: string): Promise<any> {
        return NotificationModel
            .find({_id: id})
            .populate({
                path: 'subject_uid',
                model: UserModel,
            })
            .populate({
                path: 'subject_tid',
                model: TuitModel,
            })
            .populate({
                path: 'predicate_uid',
                model: UserModel,
            })
            .populate({
                path: 'predicate_tid',
                model: TuitModel,
            });
    }

    public async findNotificationsForUser(uid: string): Promise<any> {
        return NotificationModel
            .find({recipient: uid})
            .populate({
                path: 'subject_uid',
                model: UserModel,
            })
            .populate({
                path: 'subject_tid',
                model: TuitModel,
            })
            .populate({
                path: 'predicate_uid',
                model: UserModel,
            })
            .populate({
                path: 'predicate_tid',
                model: TuitModel,
            })
            .sort([['NotifiedOn', -1]])
    }
}