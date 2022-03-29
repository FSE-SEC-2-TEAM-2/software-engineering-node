/**
 * @file Declares API for Likes related data access object methods
 */
import {Dislike} from "../../models/Dislike";

/**
 * Defines the CRUD functions {@link Dislike} is to support.
 */
export interface DislikeDaoI {
    /**
     * Returns the {@link User}s that disliked a {@link Tuit}
     * @param tid {string} - the TID of the Tuit
     * @return {Promise<Dislike[]>} - Promise containing all the Users who disliked the Tuit
     */
    findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>;

    /**
     * Returns the {@link Tuit}s disliked by a {@link User}
     * @param uid {string} - the UID of the User
     * @return {Promise<Dislike[]>} - Promise containing the Tuits disliked by the User
     */
    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;

    /**
     * Counts the Number of {@link User}s disliking a {@link Tuit}
     * @param tid {string} - the TID of the Tuit
     * @return {Promise<number>} the number of the users who disliked the Tuit
     */
    countDislikedTuits(tid: string): Promise<number>;

    /**
     * Returns if there exists a record of the {@link User} disliking a {@link Tuit}
     * @param tid {string} - the TID of the Tuit
     * @param uid {string} - the UID of the User
     * @return {Promise<boolean>} returns if the user has disliked the tuit
     */
    checkIfUserDislikedTuit(tid: string, uid: string): Promise<boolean>;

    /**
     * Deletes the record of the {@link User} disliking a {@link Tuit}
     * @param tid {string} - the TID of the Tuit
     * @param uid {string} - the UID of the User
     * @return {Promise<object>} the status of the delete operation
     */
    userUndislikesTuit(tid: string, uid: string): Promise<object>;

    /**
     * Records the {@link User} disliking a {@link Tuit}
     * @param tid {string} - the TID of the Tuit
     * @param uid {string} - the UID of the User
     * @return {Promise<Dislike>} the Like record added to the database
     */
    userDislikesTuit(tid: string, uid: string): Promise<Dislike>;
}
