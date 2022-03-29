/**
 * @file Implements APIs for Like related data access object methods
 */
import {LikeDaoI} from "../interfaces/like/LikeDaoI";
import {Like} from "../models/Like";
import {LikeModel} from "../mongoose/like/LikeModel";

/**
 * @class LikeDao LikeDao Implements the LikeDaoI, with all the CRUD functionalities for the Like resource
 * @property {LikeDao} likeDao - Singleton DAO implementing Like CRUD operations
 */
export class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * Returns the Singleton Instance of the LikeDao
     * @function
     * @return {LikeDao} the Singleton Instance of the LikeDao
     */
    public static getInstance(): LikeDao {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao
    }

    public async findAllTuitsLikedByUser(uid: string): Promise<Like[]> {
        return LikeModel
            .find({likedBy: uid})
            .populate({
                path: 'tuit',
                populate: {
                    path: 'postedBy',
                },
            })
    }

    public async findAllUsersThatLikedTuit(tid: string): Promise<Like[]> {
        return LikeModel
            .find({tuit: tid})
            .populate("likedBy", {password: 0});
    }

    public async countLikedTuits(tid: string): Promise<number> {
        return LikeModel
            .count({tuit: tid});
    }

    public async checkIfUserLikedTuit(tid: string, uid: string): Promise<boolean> {
        const record = await LikeModel.find({tuit: tid, likedBy: uid});
        return record.length != 0;
    }

    public async userLikesTuit(uid: string, tid: string): Promise<Like> {
        return LikeModel.create({tuit: tid, likedBy: uid});
    }

    public async userUnlikesTuit(uid: string, tid: string): Promise<object> {
        return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }

}
