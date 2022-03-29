/**
 * @file Controller RESTful Web service API for {@link Message} resource
 */
import {Express, Request, Response} from "express";
import {MessageControllerI} from "../interfaces/message/MessageController";
import {MessageDao} from "../daos/MessageDao";
import bodyParser from "body-parser";
import {Message} from "../models/Message";

export class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            // Use body-parser middleware to read req.body
            // Reference:
            // https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());

            app.post(
                "/users/:uid/messages",
                MessageController.messageController.userSendsMessage);
            app.get(
                "/users/:uid/messages/received",
                MessageController.messageController.userFetchesAllReceivedMessages);
            app.get(
                "/users/:uid/messages/sent",
                MessageController.messageController.userFetchesAllSentMessages);
            app.delete(
                "/users/:uid/messages/byId/:mid",
                MessageController.messageController.userDeletesMessageById);
            app.delete(
                "/users/:rid/messages/:sid",
                MessageController.messageController.userDeletesMessagesFromUser);
            app.delete(
                "/users/:uid/messages",
                MessageController.messageController.userDeletesAllMessages);
        }
        return MessageController.messageController;
    }

    public userSendsMessage(req: Request, res: Response): void {
        console.info(`message: userSendsMessage(${req.params.uid}) ${req.body}`)

        MessageController.messageDao.sendMessage(req.body, req.params.uid)
            .then((message: Message) => res.json(message))
            .catch((status) => res.json(status));
    }

    public userFetchesAllReceivedMessages(req: Request, res: Response): void {
        console.info(`message: userFetchesAllReceivedMessages(${req.params.uid})`)

        MessageController.messageDao.findAllReceivedMessages(req.params.uid)
            .then((messages: Message[]) => res.json(messages))
            .catch((status) => res.json(status));
    }

    public userFetchesAllSentMessages(req: Request, res: Response): void {
        console.info(`message: userFetchesAllSentMessages(${req.params.uid})`)

        MessageController.messageDao.findAllSentMessages(req.params.uid)
            .then((messages: Message[]) => res.json(messages))
            .catch((status) => res.json(status));
    }

    public userDeletesMessageById(req: Request, res: Response): void {
        console.info(`message: userDeletesMessageById(${req.params.mid})`)

        MessageController.messageDao.deleteMessageById(req.params.mid)
            .then((status: object) => res.send(status))
            .catch((status) => res.json(status));
    }

    public userDeletesMessagesFromUser(req: Request, res: Response) {
        console.info(`message: userDeletesMessagesFromUser(${req.params.sid}, ${req.params.rid})`)

        MessageController.messageDao.deleteMessagesFromUser(req.params.sid, req.params.rid)
            .then((status: object) => res.send(status))
            .catch((status) => res.json(status));
    }

    public userDeletesAllMessages(req: Request, res: Response) {
        console.info(`message: userDeletesAllMessages(${req.params.uid})`)

        MessageController.messageDao.deleteAllMessages(req.params.uid)
            .then((status: object) => res.send(status))
            .catch((status) => res.json(status));
    }
}
