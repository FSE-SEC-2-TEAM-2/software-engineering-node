/**
 * @file Declares the interface for the DislikeController that handles API calls that deal
 * with the Dislike resource
 */
import {Request, Response} from "express";

/**
 * Defines the use cases the {@link DislikeController} is to support.
 */
export interface DislikeControllerI {
    /**
     * Sends all the {@link User}s that disliked a {@link Tuit}s as a JSON Response.
     * @param req {Request} - the Request containing the TID of the Tuit
     * @param res {Response} - the Response containing the Users disliking the Tuit
     */
    findAllUsersThatDislikedTuit(req: Request, res: Response): void;

    /**
     * Sends all the {@link Tuit}s disliked by a {@link User} as a JSON Response.
     * @param req {Request} - the Request containing the UID of the User
     * @param res {Response} - the Response containing the Tuits disliked by the User
     */
    findAllTuitsDislikedByUser(req: Request, res: Response): void;

    /**
     * Records the {@link User} disliking a {@link Tuit} and sends the record written
     * to the database as Response
     * @param req {Request} - the Request containing the UID of the User and the TID of the disliked Tuit
     * @param res {Response} - the Response containing record written to the database
     */
    userDislikesTuit(req: Request, res: Response): void;

    /**
     * Records the {@link User} toggling his disliked for a {@link Tuit} and sends the record written
     * to the database as Response
     * @param req {Request} - the Request containing the UID of the User and the TID of the toggled Tuit
     * @param res {Response} - the Response containing record written to the database
     */
    userTogglesDislike(req: Request, res: Response): void;

    /**
     * Deletes the record of a {@link User} disliking a {@link Tuit} and sends the status of the
     * operation as Response
     * @param req {Request} - the Request containing the UID of the User and the TID of the now undisliked Tuit
     * @param res {Response} - the Response containing status of the delete operation
     */
    userUndislikesTuit(req: Request, res: Response): void;
}
