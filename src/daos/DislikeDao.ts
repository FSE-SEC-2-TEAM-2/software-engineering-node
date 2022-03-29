/**
 * @file Implements APIs for Like related data access object methods
 */
import {DislikeDaoI} from "../interfaces/dislike/DislikeDaoI";
import {Dislike} from "../models/Dislike";
import {DislikeModel} from "../mongoose/dislike/DislikeModel";

/**
 * @class DislikeDao DislikeDao Implements the DislikeDaoI, with all the CRUD functionalities for the Dislike resource
 * @property {DislikeDao} DislikeDao - Singleton DAO implementing Dislike CRUD operations
 */
export class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * Returns the Singleton Instance of the DislikeDao
     * @function
     * @return {DislikeDao} the Singleton Instance of the DislikeDao
     */
    public static getInstance(): DislikeDao {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao
    }

    public async findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]> {
        return DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: 'tuit',
                populate: {
                    path: 'postedBy',
                },
            });
    }

    public async findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]> {
        return DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy", {password: 0});
    }

    public async countDislikedTuits(tid: string): Promise<number> {
        return DislikeModel
            .count({tuit: tid});
    }

    public async checkIfUserDislikedTuit(tid: string, uid: string): Promise<boolean> {
        const record = await DislikeModel.find({tuit: tid, dislikedBy: uid});
        return record.length != 0;
    }

    public async userDislikesTuit(uid: string, tid: string): Promise<Dislike> {
        return DislikeModel.create({tuit: tid, dislikedBy: uid});
    }

    public async userUndislikesTuit(uid: string, tid: string): Promise<object> {
        return DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }
}
