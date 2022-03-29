/**
 * @file Controller RESTful Web service API for {@link Like} resource
 */
import {Express, Request, Response} from "express";
import {LikeDao} from "../daos/LikeDao";
import {LikeControllerI} from "../interfaces/like/LikeControllerI";
import {TuitDao} from "../daos/TuitDao";
import session from "express-session";
import {DislikeDao} from "../daos/DislikeDao";

/**
 * @class LikeController Implements RESTful Web service API for {@link Like} resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.get("/users/:uid/likes/:tid", LikeController.likeController.doesUserLikeTuit);
            app.put("/users/:uid/likes/:tid", LikeController.likeController.userTogglesLike);
            app.post("/users/:uid/like/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/users/:uid/like/:tid", LikeController.likeController.userUnlikesTuit);
        }
        return LikeController.likeController;
    }

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    public findAllTuitsLikedByUser(req: Request, res: Response): void {
        console.info(`like: findAllTuitsLikedByUser(${req.params.uid})`)

        // @ts-ignore
        let uid = req.params.uid === "session" && req.session['profile'] ? req.session['profile']._id : req.params.uid;

        LikeController.likeDao.findAllTuitsLikedByUser(uid)
            .then((likes) => {
                const nonNullTuits =
                    likes.filter(like => like.tuit);
                res.json(nonNullTuits.map(like => like.tuit));
            })
            .catch((status) => res.json(status));
    }

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    public findAllUsersThatLikedTuit(req: Request, res: Response): void {
        console.info(`like: findAllUsersThatLikedTuit(${req.params.tid})`)

        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then((likes) => res.json(likes))
            .catch((status) => res.json(status));
    }

    public doesUserLikeTuit(req: Request, res: Response): void {
        console.info(`like: doesUserLikeTuit(${req.params.uid}, ${req.params.tid})`)

        LikeController.likeDao.checkIfUserLikedTuit(req.params.tid, req.params.uid)
            .then((like) => res.json(like))
            .catch((status) => res.json(status));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    public userLikesTuit(req: Request, res: Response): void {
        console.info(`like: userLikesTuit(${req.params.uid}, ${req.params.tid})`)

        LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then((likes) => res.json(likes))
            .catch((status) => res.json(status));
    }

    public async userTogglesLike(req: Request, res: Response): Promise<void> {
        console.info(`like: userTogglesLike(${req.params.uid}, ${req.params.tid})`)

        const uid = req.params.uid;
        const tid = req.params.tid;
        const dislikeDao: DislikeDao = DislikeDao.getInstance();

        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "session" && profile ?
            profile._id : uid;
        const tuitDao = TuitDao.getInstance();

        if (userId !== 'session') {
            let tuit = await tuitDao.findTuitById(tid);
            if (await LikeController.likeDao.checkIfUserLikedTuit(tid, userId)) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
            } else {
                await LikeController.likeDao.userLikesTuit(userId, tid);
            }

            tuit.stats.likes = await LikeController.likeDao.countLikedTuits(tid);
            tuit.stats.dislikes = await dislikeDao.countDislikedTuits(tid);

            await tuitDao.updateTuitStats(tid, tuit.stats);
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    public userUnlikesTuit(req: Request, res: Response): void {
        console.info(`like: userUnlikesTuit(${req.params.uid}, ${req.params.tid})`)

        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then((status) => res.send(status))
            .catch((status) => res.json(status));
    }
}
