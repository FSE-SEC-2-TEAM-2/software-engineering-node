import {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import {AuthenticationControllerI} from "../interfaces/AuthenticationControllerI";
import {UserDao} from "../daos/UserDao";
import bcrypt from "bcrypt";
const saltRounds = 10;

export class AuthenticationController implements AuthenticationControllerI {
    private static userDao: UserDao;
    private static authController: AuthenticationController | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * @param app {Express} the Express instance to attach the controller to
     * @return {UserController} the singleton UserController instance
     */
    public static getInstance(app: Express): AuthenticationController {
        if (AuthenticationController.authController === null) {
            AuthenticationController.authController = new AuthenticationController();
            AuthenticationController.userDao = UserDao.getInstance();

            // Use body-parser middleware to read req.body
            // Reference:
            // https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());

            app.post("/auth/register", AuthenticationController.authController.signup);
            app.post("/auth/profile", AuthenticationController.authController.profile);
            app.post("/auth/login", AuthenticationController.authController.login);
            app.post("/auth/logout", AuthenticationController.authController.logout);
        }
        return AuthenticationController.authController;
    }

    public async signup(req: Request, res: Response): Promise<void> {
        console.info(`auth: signup() ${req.body}`)

        const newUser = req.body;
        const password = newUser.password;
        newUser.password = await bcrypt.hash(password, saltRounds);

        const existingUser = await AuthenticationController.userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await AuthenticationController.userDao
                .createUser(newUser);
            insertedUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    public profile(req: Request, res: Response): void {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "*****";
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await AuthenticationController.userDao
            .findUserByUsername(username);

        if (!existingUser) {
            res.sendStatus(403);
            return;
        }

        const match = await bcrypt
            .compare(password, existingUser.password);

        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }

    }

    public logout(req: Request, res: Response) {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }
}
