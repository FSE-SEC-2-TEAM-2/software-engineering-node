import {Tuit} from "../models/Tuit";
import {TuitModel} from "../mongoose/tuit/TuitModel";
import {TuitDaoI} from "../interfaces/tuit/TuitDaoI";
import {UserDao} from "./UserDao";
import {User} from "../models/user/User";

export class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao = new TuitDao();

    // Prevent Initiation of Object
    private constructor() {
    }

    public static getInstance(): TuitDao {
        return this.tuitDao;
    }

    public async createTuit(tuit: Tuit): Promise<Tuit> {
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
            .populate("postedBy", {'password': 0});
    }

    public async findTuitById(tid: string): Promise<Tuit> {
        return TuitModel
            .findById(tid)
            .populate("postedBy", {'password': 0});
    }

    public async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const user: User = await UserDao.getInstance()
            .findUserById(uid);

        return TuitModel
            .find({postedBy: user});
    }

    public async updateTuit(tid: string, tuit: Tuit): Promise<object> {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

}
