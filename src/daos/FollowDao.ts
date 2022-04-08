/**
 * @file Implements APIs for Follow related data access object methods
 */
import {FollowDaoI} from "../interfaces/follow/FollowDaoI";
import {Follow} from "../models/Follow";
import {FollowModel} from "../mongoose/follow/FollowModel";

/**
 * @class FollowDao FollowDao Implements the FollowDaoI, with all the CRUD functionalities for the Follow resource
 * @property {FollowDao} followDao - Singleton DAO implementing follow CRUD operations
 */
export class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * Returns the Singleton Instance of the FollowDao
     * @function
     * @return {FollowDao} the Singleton Instance of the FollowDao
     */
    public static getInstance(): FollowDao {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    public async findAllUsersFollowedByUser(uid: string): Promise<Follow[]> {
        return FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed", {password: 0});
    }

    public async findAllUsersThatFollowUser(uid: string): Promise<Follow[]> {
        return FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing", {password: 0});
    }

    public async userFollowsUser(followedUid: string, followingUid: string): Promise<Follow> {
        return FollowModel
            .create({userFollowed: followedUid, userFollowing: followingUid});
    }

    public async userUnfollowsUser(followedUid: string, followingUid: string): Promise<object> {
        return FollowModel
            .deleteOne({userFollowed: followedUid, userFollowing: followingUid});
    }

    public async userUnfollowsAllUsers(followingUid: string): Promise<object> {
        return FollowModel
            .deleteMany({userFollowing: followingUid});
    }

    public async userIsFollowingUser(followingUid: string, followedUid: string): Promise<boolean> {
        const record = await FollowModel.find({userFollowing: followingUid, userFollowed: followedUid});
        return record.length != 0;
    }

}
