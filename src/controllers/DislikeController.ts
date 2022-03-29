/**
 * @file Controller RESTful Web service API for {@link Like} resource
 */
import {Express, Request, Response} from "express";
import {DislikeDao} from "../daos/DislikeDao";
import {DislikeControllerI} from "../interfaces/dislike/DislikeControllerI";
import {TuitDao} from "../daos/TuitDao";
import session from "express-session";
import {LikeDao} from "../daos/LikeDao";

/**
 * @class LikeController Implements RESTful Web service API for {@link Dislike} resource.
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
 * @property {DislikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {DislikeController} DislikeController Singleton controller implementing Dislike
 * RESTful Web service API
 */
export class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.get("/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.get("/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
            app.get("/users/:uid/dislikes/:tid", DislikeController.dislikeController.doesUserDislikeTuit);
            app.put("/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesDislike);
            app.post("/users/:uid/dislike/:tid", DislikeController.dislikeController.userDislikesTuit);
            app.delete("/users/:uid/dislike/:tid", DislikeController.dislikeController.userUndislikesTuit);
        }
        return DislikeController.dislikeController;
    }

    public findAllTuitsDislikedByUser(req: Request, res: Response): void {
        console.info(`dislike: findAllTuitsDislikedByUser(${req.params.uid})`)

        // @ts-ignore
        let uid = req.params.uid === "session" && req.session['profile'] ? req.session['profile']._id : req.params.uid;

        DislikeController.dislikeDao.findAllTuitsDislikedByUser(uid)
            .then((likes) => {
                const nonNullTuits =
                    likes.filter(like => like.tuit);
                res.json(nonNullTuits.map(like => like.tuit));
            })
            .catch((status) => res.json(status));
    }

    public findAllUsersThatDislikedTuit(req: Request, res: Response): void {
        console.info(`dislike: findAllUsersThatDislikedTuit(${req.params.tid})`)

        DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
            .then((likes) => res.json(likes))
            .catch((status) => res.json(status));
    }

    public doesUserDislikeTuit(req: Request, res: Response): void {
        console.info(`dislike: doesUserDislikeTuit(${req.params.uid}, ${req.params.tid})`)

        DislikeController.dislikeDao.checkIfUserDislikedTuit(req.params.tid, req.params.uid)
            .then((like) => res.json(like))
            .catch((status) => res.json(status));
    }

    public userDislikesTuit(req: Request, res: Response): void {
        console.info(`dislike: userDislikesTuit(${req.params.uid}, ${req.params.tid})`)

        DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
            .then((likes) => res.json(likes))
            .catch((status) => res.json(status));
    }

    public async userTogglesDislike(req: Request, res: Response): Promise<void> {
        console.info(`dislike: userTogglesDislike(${req.params.uid}, ${req.params.tid})`)

        const uid = req.params.uid;
        const tid = req.params.tid;
        const likeDao: LikeDao = LikeDao.getInstance();

        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "session" && profile ?
            profile._id : uid;
        const tuitDao = TuitDao.getInstance();

        if (userId !== 'session') {
            let tuit = await tuitDao.findTuitById(tid);
            if (await DislikeController.dislikeDao.checkIfUserDislikedTuit(tid, userId)) {
                await DislikeController.dislikeDao.userUndislikesTuit(userId, tid);
            } else {
                await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
            }
            tuit.stats.dislikes = await DislikeController.dislikeDao.countDislikedTuits(tid);
            tuit.stats.likes = await likeDao.countLikedTuits(tid);

            await tuitDao.updateTuitStats(tid, tuit.stats);
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    }

    public userUndislikesTuit(req: Request, res: Response): void {
        console.info(`dislike: userUndislikesTuit(${req.params.uid}, ${req.params.tid})`)

        DislikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
            .then((status) => res.send(status))
            .catch((status) => res.json(status));
    }
}
