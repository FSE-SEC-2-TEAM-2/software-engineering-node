/**
 * @file Declares the interface for the UserController that handles API calls that deal
 * with the User resource
 */
import {Request, Response} from "express";

export interface UserControllerI {
    /**
     * Creates a {@link User}
     * @param req {Request} - Request containing the details of User to be created
     * @param res {Response} - Response containing the created User
     */
    createUser(req: Request, res: Response): void;

    /**
     * Sends all the {@link User}s as a JSON Response
     * @param req {Request} - The request received
     * @param res {Response} - Response containing all the Users
     */
    findAllUsers(req: Request, res: Response): void;

    /**
     * Sends the {@link User} as a JSON
     * @param req {Request} - Request containing the UID of the User
     * @param res {Response} - Response containing the User
     */
    findUserById(req: Request, res: Response): void;

    /**
     * Sends the {@link User} with the given username as a JSON
     * @param req {Request} - Request containing the username of the User
     * @param res {Response} - Response containing the User
     */
    findUserByUsername(req: Request, res: Response): void;

    /**
     * Sends the {@link User} with the given username and password as a JSON
     * @param req {Request} - Request containing the username and password of the User
     * @param res {Response} - Response containing the User
     */
    findUserByCredentials(req: Request, res: Response): void;

    /**
     * Updates a {@link User} with their UID
     * @param req {Request} - Request containing the contents of User to be updated
     * @param res {Response} - Response containing the updated User
     */
    updateUserById(req: Request, res: Response): void;

    /**
     * Updates a {@link User} with their username
     * @param req {Request} - Request containing the contents of User to be updated
     * @param res {Response} - Response containing the updated User
     */
    updateUserByUsername(req: Request, res: Response): void;

    /**
     * Deletes all Users
     * @param req {Request} - Request made to the API
     * @param res {Response} - Response containing the status of the delete operation
     */
    deleteAllUsers(req: Request, res: Response): void;

    /**
     * Deletes a {@link User} by UID
     * @param req {Request} - Request containing the uid of User to be deleted
     * @param res {Response} - Response containing the status of the delete operation
     */
    deleteUserById(req: Request, res: Response): void;

    /**
     * Deletes a {@link User} by username
     * @param req {Request} - Request containing the username of User to be deleted
     * @param res {Response} - Response containing the status of the delete operation
     */
    deleteUserByUsername(req: Request, res: Response): void;
}
