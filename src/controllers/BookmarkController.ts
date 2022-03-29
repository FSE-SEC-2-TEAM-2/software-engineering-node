/**
 * @file Controller RESTful Web service API for {@link Bookmark} resource
 */
import {Express, Request, Response} from "express";
import {BookmarkDao} from "../daos/BookmarkDao";
import {BookmarkControllerI} from "../interfaces/bookmark/BookmarkControllerI";
import {Bookmark} from "../models/Bookmark";

/**
 * @class BookmarkController Implements RESTful Web service API for {@link Bookmark} resource.
 *
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/bookmarks to retrieve all the {@link Tuit}s bookmarked by a user
 *     </li>
 *     <li>POST /users/:uid/bookmarks/:tid to record that a {@link User}s bookmarks a Tuit
 *     </li>
 *     <li>DELETE users/:uid/bookmarks/:tid to record that a {@link User}
 *     no longer bookmarks that tuit</li>
 * </ul>
 *
 * @property {BookmarkDao} BookmarkDao - Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} BookmarkController - Singleton controller implementing RESTful Web service API
 */

export class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * @param app {Express} the Express instance to attach the controller to
     * @return {BookmarkController} the singleton BookmarkController instance
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/users/:uid/bookmarks",
                BookmarkController.bookmarkController.findAllBookmarkedTuits);
            app.post("/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.delete("/users/:uid/bookmarks",
                BookmarkController.bookmarkController.userDeletesAllBookmarks);
        }
        return BookmarkController.bookmarkController;
    }

    public userBookmarksTuit(req: Request, res: Response): void {
        console.info(`bookmark: userBookmarksTuit(${req.params.uid}, ${req.params.tid})`)

        BookmarkController.bookmarkDao
            .userUnbookmarksTuits(req.params.uid, req.params.tid)
            .then(() => {
                BookmarkController.bookmarkDao
                    .userBookmarksTuit(req.params.uid, req.params.tid)
                    .then((bookmark: Bookmark) => res.json(bookmark))
                    .catch((status) => res.json(status));
            });
    }

    public findAllBookmarkedTuits(req: Request, res: Response): void {
        console.info(`bookmark: findAllBookmarkedTuits(${req.params.uid})`)

        BookmarkController.bookmarkDao
            .findAllBookmarkedTuits(req.params.uid)
            .then((bookmarkedTuits: Bookmark[]) => res.json(bookmarkedTuits))
            .catch((status) => res.json(status));
    }

    public userUnbookmarksTuit(req: Request, res: Response): void {
        console.info(`bookmark: userUnbookmarksTuit(${req.params.uid}, ${req.params.tid})`)

        BookmarkController.bookmarkDao
            .userUnbookmarksTuits(req.params.uid, req.params.tid)
            .then((status: object) => res.json(status))
            .catch((status) => res.json(status));
    }

    public userDeletesAllBookmarks(req: Request, res: Response): void {
        console.info(`bookmark: userDeletesAllBookmarks(${req.params.uid})`)

        BookmarkController.bookmarkDao
            .userDeletesAllBookmarks(req.params.uid)
            .then((status: object) => res.json(status))
            .catch((status) => res.json(status));
    }
}
