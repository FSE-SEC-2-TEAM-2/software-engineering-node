/**
 * @file server.ts defines the entry point to the app
 */
import express, {Request, Response} from "express"
import mongoose from "mongoose"
import session from 'express-session';
import {UserController} from "./controllers/UserController"
import {TuitController} from "./controllers/TuitController"
import {LikeController} from "./controllers/LikeController";
import {DislikeController} from "./controllers/DislikeController";
import {FollowController} from "./controllers/FollowController";
import {BookmarkController} from "./controllers/BookmarkController";
import {MessageController} from "./controllers/MessageController";
import {AuthenticationController} from "./controllers/AuthenticationController";
// import cors from 'cors';

/**
 * Connects to the Mongo Database with db connection details from Environment Variables
 */
const connectDatabase = (): void => {
    // Connecting to DB
    let dbUri: string = process.env.MONGODB_PREFIX + "://" + process.env.MONGODB_USER
        + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_HOST;
    if (process.env.MONGODB_PORT) {
        dbUri = dbUri + process.env.MONGODB_PORT;
    }
    console.log("Inferred DB_URI: " + process.env.MONGODB_PREFIX + "://" + process.env.MONGODB_USER
        + ":*****@" + process.env.MONGODB_HOST);

    mongoose.connect(dbUri)
        .catch((err: object) => {
            console.log(err);
        });
    mongoose.connection.once("open", () => {
        console.log("MongoDB connection established successfully");
    });
}

/**
 * Initializes the Express app and connects the Controllers to the App
 * @return {Express} the Initialized express app
 */
const initializeApp = (): express.Express => {
    connectDatabase()
    const app = express();
    // console.log("Allowed origins: ", process.env.NODE_ORIGIN_URLS);
    // app.use(cors({
    //     credentials: true,
    //     origin: process.env.NODE_ORIGIN_URLS
    // }))

    // References:
    // https://stackoverflow.com/questions/26988071/allow-multiple-cors-domain-in-express-js
    app.use(function (req: Request, res: Response, next ) {
        res.setHeader('Access-Control-Allow-Origin', req.header('origin') || '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
        // @ts-ignore
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    })

    let sess = {
        secret: process.env.SECRET || 'secret',
        saveUninitialized: true,
        resave: true,
        proxy: true,
        cookie: {
            secure: false,
            sameSite: undefined
        }
    }

    if (process.env.ENV === 'PRODUCTION') {
        console.log("Running in PRODUCTION Mode!");
        app.set('trust proxy', 1) // trust first proxy
        sess.cookie.secure = true // serve secure cookies
        // @ts-ignore
        sess.cookie.sameSite = 'none'
    }

    app.use(session(sess))

    UserController.getInstance(app);
    TuitController.getInstance(app);
    LikeController.getInstance(app);
    DislikeController.getInstance(app);
    FollowController.getInstance(app);
    BookmarkController.getInstance(app);
    MessageController.getInstance(app);
    AuthenticationController.getInstance(app);

    return app
}

/**
 * Starts the Server and listens on the specified PORT
 * @param port {string | number} - the port the server will listen on
 */
const startServer = (port: string | number): void => {
    const app = initializeApp()

    app.get("/hello", (req: Request, res: Response) =>
        res.send("Hello World!"));

    app.listen(port);
}

/**
 * Defines the Port number to be used by the server
 */
const PORT: number = 4000

/**
 * Instructs the server to check for the 'PORT' environment variable, and to use
 * that if available. (Used by Heroku and Docker instances)
 */
startServer(process.env.PORT || PORT)