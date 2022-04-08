/**
 * @file Implements APIs for Bookmark related data access object methods
 */
import {BookmarkDaoI} from "../interfaces/bookmark/BookmarkDaoI";
import {Bookmark} from "../models/Bookmark";
import {BookmarkModel} from "../mongoose/bookmark/BookmarkModel";

/**
 * @class BookmarkDao Implements the BookmarkDaoI, with all the CRUD functionalities for the Bookmark resource
 * @property {BookmarkDao} bookmarkDao - Singleton DAO implementing bookmark CRUD operations
 */
export class BookmarkDao implements BookmarkDaoI {
    public static bookmarkDao: BookmarkDao | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * Returns the Singleton Instance of the BookmarksDao
     * @function
     * @return {BookmarkDao} the Singleton Instance of the BookmarksDao
     */
    public static getInstance(): BookmarkDao {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    public async findAllBookmarkedTuits(uid: string): Promise<Bookmark[]> {
        return BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit", {"password": 0});
    }

    public async userBookmarksTuit(uid: string, tid: string): Promise<Bookmark> {
        return BookmarkModel
            .create({bookmarkedBy: uid, bookmarkedTuit: tid});
    }

    public async userUnbookmarksTuits(uid: string, tid: string): Promise<object> {
        return BookmarkModel
            .deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});
    }

    public async userDeletesAllBookmarks(uid: string): Promise<object> {
        return BookmarkModel
            .deleteMany({bookmarkedBy: uid})
    }

}
