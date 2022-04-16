/**
 * @file Declares the interface for the NotificationController that handles API calls that deal
 * with the Notification resource
 */
import {Request, Response} from "express";

export interface NotificationControllerI {
    createNotification(req: Request, res: Response): void;

    findAllNotifications(req: Request, res: Response): void;

    findNotificationsForUser(req: Request, res: Response): void;

    findNotificationsById(req: Request, res: Response): void;

    deleteNotificationsById(req: Request, res: Response): void;
}
