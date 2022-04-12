/**
 * @file Controller RESTful Web service API for {@link Notification} resource
 */
import {Express, Request, Response} from "express";
import {NotificationDao} from "../daos/NotificationDao";
import {NotificationControllerI} from "../interfaces/notificaation/NotificationControllerI";
import {Notification} from "../models/Notification";

export class NotificationsController implements NotificationControllerI {
    private static notificationDao: NotificationDao = NotificationDao.getInstance();
    private static notificationsController: NotificationsController | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * @param app {Express} the Express instance to attach the controller to
     * @return {BookmarkController} the singleton BookmarkController instance
     */
    public static getInstance = (app: Express): NotificationsController => {
        if (NotificationsController.notificationsController === null) {
            NotificationsController.notificationsController = new NotificationsController();

            app.post("/notifications", NotificationsController.notificationsController.createNotification);
            app.get("/notifications", NotificationsController.notificationsController.findAllNotifications);
            app.get("/notifications/:uid", NotificationsController.notificationsController.findNotificationsForUser);
            app.delete("/notifications/:id", NotificationsController.notificationsController.deleteNotificationsById);
        }
        return NotificationsController.notificationsController;
    }

    public createNotification(req: Request, res: Response): void {
        console.info(`notification: createNotification() ${req.body}`)

        NotificationsController.notificationDao
            .createNotification(req.body)
            .then((notification) => res.json(notification))
            .catch((status) => res.json(status));
    }

    public deleteNotificationsById(req: Request, res: Response): void {
        console.info(`notification: deleteNotificationsById(${req.params.id})`)

        NotificationsController.notificationDao
            .deleteNotificationsById(req.params.id)
            .then((status) => res.json(status))
            .catch((status) => res.json(status));
    }

    public findAllNotifications(req: Request, res: Response): void {
        console.info(`notification: findAllNotifications()`)

        NotificationsController.notificationDao
            .findAllNotifications()
            .then((notifications) => res.json(notifications))
            .catch((status) => res.json(status));
    }

    public findNotificationsById(req: Request, res: Response): void {
        console.info(`notification: findNotificationsById(${req.params.id})`)

        NotificationsController.notificationDao
            .findNotificationsById(req.params.id)
            .then((notification) => res.json(notification))
            .catch((status) => res.json(status));
    }

    public findNotificationsForUser(req: Request, res: Response): void {
        console.info(`notification: findNotificationsForUser(${req.params.uid})`)

        const uid = req.params.uid;

        // @ts-ignore
        const profile: any = req.session['profile'];
        const userId = uid === "session" && profile ?
            profile._id : uid;

        if (userId !== 'session') {
            NotificationsController.notificationDao
                .findNotificationsForUser(req.params.uid)
                .then((notifications) => res.json(notifications))
                .catch((status) => res.json(status));
        } else {
            res.sendStatus(401);
        }
    }
}