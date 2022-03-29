/**
 * @file Implements APIs for Tuit related data access object methods
 */
import {Tuit, TuitStats} from "../models/Tuit";
import {TuitModel} from "../mongoose/tuit/TuitModel";
import {TuitDaoI} from "../interfaces/tuit/TuitDaoI";
import {UserDao} from "./UserDao";
import {User} from "../models/user/User";

/**
 * @class TuitDao TuitDao Implements the TuitDaoI, with all the CRUD functionalities for the Tuit resource
 * @property {TuitDao} tuitDao - Singleton DAO implementing tuit CRUD operations
 */
export class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao = new TuitDao();

    // Prevent Initiation of Object
    private constructor() {
    }

    /**
     * Returns the Singleton Instance of the TuitDao
     * @function
     * @return {TuitDao} the Singleton Instance of the TuitDao
     */
    public static getInstance(): TuitDao {
        return this.tuitDao;
    }

    public async createTuit(tuit: Tuit): Promise<Tuit> {
        return TuitModel
            .create(tuit);
    }

    public async createTuitByUser(tuit: Tuit, uid: string): Promise<Tuit> {
        tuit.postedBy = await UserDao.getInstance()
            .findUserById(uid);
        return TuitModel
            .create(tuit);
    }

    public async deleteTuit(tid: string): Promise<object> {
        return TuitModel
            .deleteOne({_id: tid});
    }

    public async findAllTuits(): Promise<Tuit[]> {
        return TuitModel
            .find()
            .populate("postedBy", {password: 0});
    }

    public async findTuitById(tid: string): Promise<Tuit> {
        return TuitModel
            .findById(tid)
            .populate("postedBy", {password: 0});
    }

    public async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const user: User = await UserDao.getInstance()
            .findUserById(uid);

        return TuitModel
            .find({postedBy: user})
            .populate("postedBy", {password: 0});
    }

    public async updateTuit(tid: string, tuit: Tuit): Promise<object> {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    public async updateTuitStats(tid: string, newStats: TuitStats): Promise<object> {
        return TuitModel
            .updateOne({_id: tid}, {$set: {stats: newStats}});
    }

}
