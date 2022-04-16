/**
 * @file Implements mongoose model to CRUD
 * documents in the notifications collection
 */
import mongoose from "mongoose"
import {NotificationSchema} from "./NotificationSchema"

/**
 * The NotificationModel is used for creating and reading documents of the {@link Notification} type defined by the
 * {@link NotificationSchema} from the underlying MongoDB database.
 * @typedef {NotificationModel} NotificationModel
 */
export const NotificationModel = mongoose.model("NotificationModel", NotificationSchema)
