/**
 * @file Implements mongoose schema for Likes
 */
import mongoose from "mongoose"
import {Dislike} from "../../models/Dislike"

/**
 * Represents dislikes relationship between a {@link User} and a {@link Tuit}, as in a user dislikes a tuit.
 * The DislikeSchema represents how a Dislike is represented in the database.
 * @typedef {DislikeSchema} DislikeSchema
 * @property {Tuit} tuit - Tuit being disliked
 * @property {User} likedBy - User disliking the tuit
 */
export const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: mongoose.Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"})
