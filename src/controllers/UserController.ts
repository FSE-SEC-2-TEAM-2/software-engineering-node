/**
 * @file Controller RESTful Web service API for {@link User} resource
 */
import {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import {UserDao} from "../daos/UserDao";
import {UserControllerI} from "../interfaces/user/UserControllerI";
import {User} from "../models/user/User";

/**
 * @class UserController Implements RESTful Web service API for {@link User} resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /user to create a new User
 *     </li>
 *     <li>GET /users to retrieve all the users in the database
 *     </li>
 *     <li>GET /users/:uid to retrieve the User with the passed in UID
 *     </li>
 *     <li>PUT /users/:uid to update the User with the passed in UID
 *     </li>
 *     <li>DELETE /users/:uid to delete the User with the passed in UID
 *     </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} UserController Singleton controller implementing
 * RESTful Web service API
 */
export class UserController implements UserControllerI {
    private static userDao: UserDao;
    private static userController: UserController | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * @param app {Express} the Express instance to attach the controller to
     * @return {UserController} the singleton UserController instance
     */
    public static getInstance(app: Express): UserController {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            UserController.userDao = UserDao.getInstance();

            // Use body-parser middleware to read req.body
            // Reference:
            // https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());

            app.post("/users", UserController.userController.createUser);
            app.post("/login", UserController.userController.findUserByCredentials);
            app.get("/users", UserController.userController.findAllUsers);
            app.get("/users/byId/:uid", UserController.userController.findUserById);
            app.get("/users/:uname", UserController.userController.findUserByUsername);
            app.put("/users/byId/:uid", UserController.userController.updateUserById);
            app.put("/users/:uname", UserController.userController.updateUserByUsername);
            app.delete("/users/all", UserController.userController.deleteAllUsers);
            app.delete("/users/byId/:uid", UserController.userController.deleteUserById);
            app.delete("/users/:uname", UserController.userController.deleteUserByUsername);
        }
        return UserController.userController;
    }

    public createUser(req: Request, res: Response): void {
        console.info(`user: createUser() ${req.body}`)

        UserController.userDao.createUser(req.body)
            .then((user) => res.json(user))
            .catch((status) => res.json(status));
    }

    public findAllUsers(req: Request, res: Response): void {
        console.info(`user: findAllUsers()`)

        UserController.userDao.findAllUsers()
            .then((users: User[]) => res.json(users))
            .catch((status) => res.json(status));
    }

    public findUserById(req: Request, res: Response): void {
        console.info(`user: findUserById(${req.params.uid})`)

        UserController.userDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user))
            .catch((status) => res.json(status));
    }

    public findUserByUsername(req: Request, res: Response): void {
        console.info(`user: findUserByUsername(${req.params.uname})`)

        UserController.userDao.findUserByUsername(req.params.uname)
            .then((user: User) => res.json(user))
            .catch((status) => res.json(status));
    }

    public findUserByCredentials(req: Request, res: Response): void {
        console.info(`user: findUserByCredentials(${req.body.username}, ${req.body.password})`)

        UserController.userDao.findUserByCredentials(req.body.username, req.body.password)
            .then((user: User) => res.json(user))
            .catch((status) => res.json(status));
    }

    public updateUserById(req: Request, res: Response): void {
        console.info(`user: updateUserById(${req.params.uid})`)

        UserController.userDao.updateUserById(req.params.uid, req.body)
            .then((status) => res.json(status))
            .catch((status) => res.json(status));
    }

    public updateUserByUsername(req: Request, res: Response): void {
        console.info(`user: updateUserByUsername(${req.params.uname})`)

        UserController.userDao.updateUserByUsername(req.params.uname, req.body)
            .then((status) => res.json(status))
            .catch((status) => res.json(status));
    }

    public deleteAllUsers(req: Request, res: Response): void {
        console.info(`user: deleteAllUsers()`)

        UserController.userDao.deleteAllUsers()
            .then((status) => res.json(status))
            .catch((status) => res.json(status));
    }

    public deleteUserById(req: Request, res: Response): void {
        console.info(`user: deleteUserById(${req.params.uid})`)

        UserController.userDao.deleteUserById(req.params.uid)
            .then((status) => res.json(status))
            .catch((status) => res.json(status));
    }

    public deleteUserByUsername(req: Request, res: Response): void {
        console.info(`user: deleteUserByUsername(${req.params.uname})`)

        UserController.userDao.deleteUserByUsername(req.params.uname)
            .then((status) => res.json(status))
            .catch((status) => res.json(status));
    }
}
