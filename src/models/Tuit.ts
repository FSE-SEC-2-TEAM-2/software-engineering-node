/**
 * @file Declares Tuit data type representing any Tuit
 */
import {User} from "./user/User";

/**
 * A Tuit is a short post, authored by a {@link User}
 * @typedef {Tuit} Tuit
 * @property {string} tuit - contains the user's post
 * @property {User | null} postedBy - the author of the Tuit
 * @property {Date} postedOn - the Date this Tuit was posted
 */
export interface Tuit {
    tuit: string;
    postedOn: Date;
    postedBy: User | null;
    stats: TuitStats;
}

export interface TuitStats {
    replies: number;
    retuits: number;
    likes: number;
    dislikes: number;
}
