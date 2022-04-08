/**
 * @file Declares API for Bookmark related data access object methods
 */
import {Bookmark} from "../../models/Bookmark";

/**
 * Defines the CRUD functions {@link BookmarkDao} is to support.
 */
export interface BookmarkDaoI {
    /**
     * Returns all the {@link Tuit}s bookmarked by a {@link User} as a Promise
     * @param uid {string} - the UID of the User who's bookmarked Tuits are to be retrieved
     * @return {Promise<Bookmark[]>} a Promise containing all the Tuits bookmarked by the User
     */
    findAllBookmarkedTuits(uid: string): Promise<Bookmark[]>;

    /**
     * Records a {@link User} bookmarking a {@link Tuit}, and returns the record written to the database.
     * @param uid {string} - the UID of the User who bookmarks the Tuit
     * @param tid {string} - the tid of the Tuit being bookmarked
     * @return {Promise<Bookmark>} the Bookmark record added to the database
     */
    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;

    /**
     * Deletes the record representing a {@link User} bookmarking a
     * {@link Tuit}, and returns the states of the operation
     * @param uid {string} - the UID of the User who unbookmarks the Tuit
     * @param tid {string} - the tid of the Tuit being unbookmarked
     * @return {Promise<object>} the status of the delete operation
     */
    userUnbookmarksTuits(uid: string, tid: string): Promise<object>;

    /**
     * Deletes all {@link Bookmark}s made by {@link User}
     * @param uid {string} - the UID of the User who's bookmarked Tuits are to be deleted
     * @return {Promise<object>} the status of the delete operation
     */
    userDeletesAllBookmarks(uid: string): Promise<object>;
}
