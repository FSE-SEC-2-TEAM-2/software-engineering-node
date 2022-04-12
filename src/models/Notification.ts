/**
 * @file Declares Like data type representing relationship between
 * users and tuits, as in user likes a tuit
 */
import {User} from "./user/User";

/**
 * Represents the Notification received by a User
 * @typedef {Notification} Notification
 */
export interface Notification {
    subject_uid?: string
    subject_tid?: string
    subject_type: string
    verb: string
    predicate_uid?: string
    predicate_utd?: string
    predicate_type: string

    recipient: User

    NotifiedOn:  Date;
}
