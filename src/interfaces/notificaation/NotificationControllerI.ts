/**
 * @file Declares the interface for the NotificationController that handles API calls that deal
 * with the Notification resource
 */
import {Request, Response} from "express";

/**
 * Defines the use cases the {@link NotificationsController} is to support.
 */
export interface NotificationControllerI {
    /**
     * Records the a {@link Notification} and sends the record written
     * to the database as Response.
     * @param req {Request} - the Request containing the details of the notification to be created.
     * @param res {Response} - the Response containing record written to the database
     */
    createNotification(req: Request, res: Response): void;

    /**
     * Retrieves all {@link Notification}s in the database.
     * @param req {Request} - the Request with parameter of interest.
     * @param res {Response} - the Response containing all notifications in the database.
     */
    findAllNotifications(req: Request, res: Response): void;

    /**
     * Retrieves all {@link Notification}s for the intended recipient.
     * @param req {Request} - the Request with the UID of the intended recipient.
     * @param res {Response} - the Response containing all notifications for the intended recipient.
     */
    findNotificationsForUser(req: Request, res: Response): void;

    /**
     * Retrieves a {@link Notification} with the passed in ID.
     * @param req {Request} - the Request with the IFD of the notification to be retrieved.
     * @param res {Response} - the Response containing the notification with the passed in ID.
     */
    findNotificationsById(req: Request, res: Response): void;

    /**
     * Deletes a {@link Notification} given its id and returns the status of the delete operation.
     * @param req {Request} - the Request containing the ID of the notification to be deleted.
     * @param res {Response} - the Response containing the status of the operation
     */
    deleteNotificationsById(req: Request, res: Response): void;
}
