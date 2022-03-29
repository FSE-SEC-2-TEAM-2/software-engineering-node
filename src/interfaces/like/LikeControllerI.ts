/**
 * @file Declares the interface for the LikeController that handles API calls that deal
 * with the Like resource
 */
import {Request, Response} from "express";

/**
 * Defines the use cases the {@link LikeController} is to support.
 */
export interface LikeControllerI {
    /**
     * Sends all the {@link User}s that liked a {@link Tuit}s as a JSON Response.
     * @param req {Request} - the Request containing the TID of the Tuit
     * @param res {Response} - the Response containing the Users liked the Tuit
     */
    findAllUsersThatLikedTuit(req: Request, res: Response): void;

    /**
     * Sends all the {@link Tuit}s liked by a {@link User} as a JSON Response.
     * @param req {Request} - the Request containing the UID of the User
     * @param res {Response} - the Response containing the Tuits liked by the User
     */
    findAllTuitsLikedByUser(req: Request, res: Response): void;

    /**
     * Records the {@link User} liking a {@link Tuit} and sends the record written
     * to the database as Response
     * @param req {Request} - the Request containing the UID of the User and the TID of the Liked Tuit
     * @param res {Response} - the Response containing record written to the database
     */
    userLikesTuit(req: Request, res: Response): void;

    /**
     * Records the {@link User} toggling his like for a {@link Tuit} and sends the record written
     * to the database as Response
     * @param req {Request} - the Request containing the UID of the User and the TID of the toggled Tuit
     * @param res {Response} - the Response containing record written to the database
     */
    userTogglesLike(req: Request, res: Response): void;

    /**
     * Deletes the record of a {@link User} liking a {@link Tuit} and sends the status of the
     * operation as Response
     * @param req {Request} - the Request containing the UID of the User and the TID of the now unliked Tuit
     * @param res {Response} - the Response containing status of the delete operation
     */
    userUnlikesTuit(req: Request, res: Response): void;
}
