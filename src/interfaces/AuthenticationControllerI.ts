/**
 * @file Declares the interface for the AuthenticationController that handles API calls that deal
 * with the Authentication
 */
import {Request, Response} from "express";

export interface AuthenticationControllerI {
    /**
     * Creates a {@link User}
     * @param req {Request} - Request containing the details of User to be created
     * @param res {Response} - Response containing the created User
     */
    signup(req: Request, res: Response): void;

    /**
     * Used to check if a user is signed in
     * @param req {Request} - Request
     * @param res {Response} - Response the profile of the signed-in user or a 403 error if not signed in.
     */
    profile(req: Request, res: Response): void;

    login(req: Request, res: Response): void;

    logout(req: Request, res: Response): void;
}
