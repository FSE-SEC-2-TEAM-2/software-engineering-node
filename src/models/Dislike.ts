/**
 * @file Declares Like data type representing relationship between
 * users and tuits, as in user dislikes a tuit
 */
import {Tuit} from "./Tuit";
import {User} from "./user/User";

/**
 * Represents likes relationship between a {@link User} and a {@link Tuit}, as in a user dislikes a tuit
 * @typedef {Dislike} Like
 * @property {Tuit} tuit - Tuit being disliked
 * @property {User} likedBy - User disliking the tuit
 */
export interface Dislike {
    tuit: Tuit;
    dislikedBy: User;
}

