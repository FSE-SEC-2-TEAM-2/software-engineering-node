/**
 * @file Declares the interface for the TuitController that handles API calls that deal
 * with the Tuit resource
 */
import {Request, Response} from "express";

/**
 * Defines the use cases the {@link TuitController} is to support.
 */
export interface TuitControllerI {
    /**
     * Creates a {@link Tuit}
     * @param req {Request} - Request containing the contents of Tuit to be created
     * @param res {Response} - Response containing the created Tuit
     */
    createTuit(req: Request, res: Response): void;

    /**
     * Creates a {@link Tuit}
     * @param req {Request} - Request containing the contents of Tuit to be created
     * @param res {Response} - Response containing the created Tuit
     */
    createTuitByUser(req: Request, res: Response): void;

    /**
     * Sends all the {@link Tuit}s as a JSON Response
     * @param req {Request} - The request received
     * @param res {Response} - Response containing all the Tuits
     */
    findAllTuits(req: Request, res: Response): void;

    /**
     * Sends the {@link Tuit} as a JSON
     * @param req {Request} - Request containing the TID of the Tuit
     * @param res {Response} - Response containing the Tuit
     */
    findTuitById(req: Request, res: Response): void;

    /**
     * Sends all the {@link Tuit}s made by a {@link User} as a JSON Response
     * @param req {Request} - Request containing the TID of the Tuit
     * @param res {Response} - Response containing the Tuit
     */
    findTuitsByUser(req: Request, res: Response): void;

    /**
     * Updates a {@link Tuit}
     * @param req {Request} - Request containing the contents of Tuit to be updated
     * @param res {Response} - Response containing the updated Tuit
     */
    updateTuit(req: Request, res: Response): void;

    /**
     * Deletes a {@link Tuit}
     * @param req {Request} - Request containing the tid of Tuit to be deleted
     * @param res {Response} - Response containing the status of the delete operation
     */
    deleteTuit(req: Request, res: Response): void;
}
