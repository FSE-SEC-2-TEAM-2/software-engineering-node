/**
 * @file Declares API for Tuit related data access object methods
 */

// The data access object design pattern (DAO) encapsulates data access logic to
// decouple database access mechanism from the rest of the application.
import {Tuit, TuitStats} from "../../models/Tuit";

/**
 * Defines the CRUD functions {@link TuitDao} is to support.
 */
export interface TuitDaoI {
    /**
     * Creates a {@link Tuit} with the given data
     * @param tuit {Tuit} - the data to be used to create the Tuit
     * @return {Promise<Tuit>} - promise containing the Tuit created with the given data
     */
    createTuit(tuit: Tuit): Promise<Tuit>;

    /**
     * Creates a {@link Tuit} with the given data
     * @param tuit {Tuit} - the data to be used to create the Tuit
     * @param uid - the UID of the user posting the Tuit
     * @return {Promise<Tuit>} - promise containing the Tuit created with the given data
     */
    createTuitByUser(tuit: Tuit, uid:string): Promise<Tuit>;

    /**
     * Returns all the {@link Tuit}s
     * @return {Promise<Tuit[]>} - Promise containing all the Tuits
     */
    findAllTuits(): Promise<Tuit[]>;

    /**
     * Returns all the {@link Tuit}s made by a {@link User}
     * @param uid {string} - the UID of the User, who's Tuits are to be retrieved
     * @return {Promise<Tuit[]>} - Promise containing all the Tuits made by the User
     */
    findTuitsByUser(uid: string): Promise<Tuit[]>;

    /**
     * Returns the {@link Tuit} with the given TID
     * @param tid {string} - the TID of the Tuit to be returned
     * @return {Promise<Tuit>} - promise containing the Tuit with the given TID
     */
    findTuitById(tid: string): Promise<Tuit>;

    /**
     * Updated the {@link Tuit} and returns the updated Tuit
     * @param tid {string} - the TID of the Tuit to be updated
     * @param tuit {Tuit} - the data to be used to update the Tuit
     * @return {Promise<Tuit>} - promise containing the Tuit updated with the given data
     */
    updateTuit(tid: string, tuit: Tuit): Promise<object>;

    /**
     * Updated the {@link Tuit} and returns the updated Tuit
     * @param tid {string} - the TID of the Tuit to be updated
     * @param newStats {TuitStats} - the stats to be used to update the Tuit
     * @return {Promise<Tuit>} - promise containing the Tuit updated with the given data
     */
    updateTuitStats(tid: string, newStats: TuitStats): Promise<object>;

    /**
     * Deleted the {@link Tuit}
     * @param tid {string} - the TID of the Tuit to be deleted
     * @return {Promise<object>} the status of the delete operation
     */
    deleteTuit(tid: string): Promise<object>;
}
