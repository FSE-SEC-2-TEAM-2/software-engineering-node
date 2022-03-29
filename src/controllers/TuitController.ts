/**
 * @file Controller RESTful Web service API for {@link Tuit} resource
 */
import {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import {TuitDao} from "../daos/TuitDao";
import {TuitControllerI} from "../interfaces/tuit/TuitControllerI";
import {Tuit} from "../models/Tuit";

/**
 * @class TuitController Implements RESTful Web service API for {@link Tuit} resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /tuits to record a new Tuit
 *     </li>
 *     <li>GET /tuits to retrieve all the tuits in the database
 *     </li>
 *     <li>GET /tuits/:tid to retrieve the Tuit with the passed in tid
 *     </li>
 *     <li>GET /users/:uid/tuits to retrieve the Tuits made by a User with the passed in UID
 *     </li>
 *     <li>PUT /tuits/:tid to update the Tuit with the passed in TID
 *     </li>
 *     <li>DELETE /tuits/:tid to delete the Tuit with the passed in tid
 *     </li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao;
    private static tuitController: TuitController | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * @param app {Express} the Express instance to attach the controller to
     * @return {TuitController} the singleton TuitController instance
     */
    public static getInstance(app: Express): TuitController {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            TuitController.tuitDao = TuitDao.getInstance();

            // Use body-parser middleware to read req.body
            // Reference:
            // https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());

            app.post("/tuits", TuitController.tuitController.createTuit);
            app.post("/users/:uid/tuits", TuitController.tuitController.createTuitByUser);
            app.get("/tuits", TuitController.tuitController.findAllTuits);
            app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
            app.get("/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
            app.put("/tuits/:tid", TuitController.tuitController.updateTuit);
            app.delete("/tuits/:tid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }

    public createTuit(req: Request, res: Response): void {
        console.info(`tuit: createTuit() ${req.body}`)

        TuitController.tuitDao.createTuit(req.body)
            .then((tuit: Tuit) => res.json(tuit))
            .catch((status) => res.json(status));
    }

    public createTuitByUser(req: Request, res: Response): void {
        console.info(`tuit: createTuitByUser() ${req.params.uid}`)

        // @ts-ignore
        let uid = req.params.uid === "session" && req.session['profile'] ? req.session['profile']._id : req.params.uid;


        TuitController.tuitDao.createTuitByUser(req.body, uid)
            .then((tuit: Tuit) => res.json(tuit))
            .catch((status) => res.json(status));
    }

    public deleteTuit(req: Request, res: Response): void {
        console.info(`tuit: deleteTuit(${req.params.tid})`)

        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then((status) => res.json(status))
            .catch((status) => res.json(status));
    }

    public findAllTuits(req: Request, res: Response): void {
        console.info(`tuit: findAllTuits()`)

        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits))
            .catch((status) => res.json(status));
    }

    public findTuitById(req: Request, res: Response): void {
        console.info(`tuit: findTuitById(${req.params.tid})`)

        TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit))
            .catch((status) => res.json(status));
    }

    public findTuitsByUser(req: Request, res: Response): void {
        console.info(`tuit: findTuitsByUser(${req.params.uid})`)

        // @ts-ignore
        let uid = req.params.uid === "session" && req.session['profile'] ? req.session['profile']._id : req.params.uid;


        TuitController.tuitDao.findTuitsByUser(uid)
            .then((tuits: Tuit[]) => res.json(tuits))
            .catch((status) => res.json(status));
    }

    public updateTuit(req: Request, res: Response): void {
        console.info(`tuit: updateTuit(${req.params.tid}) ${req.body}`)

        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status) => res.json(status))
            .catch((status) => res.json(status));
    }

}
