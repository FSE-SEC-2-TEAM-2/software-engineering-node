/**
 * @file Implements mongoose schema for Tuits
 */
import mongoose from "mongoose"

/**
 * A {@link Tuit} is a short post, authored by a {@link User}. The TuitSchema represents how a
 * Tuit is represented in the database.
 * @typedef {TuitSchema} TuitSchema
 * @property {string} tuit - contains the user's post
 * @property {User | null} postedBy - the author of the Tuit
 * @property {Date} postedOn - the Date this Tuit was posted
 */
export const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    },
}, {collection: "tuits"})
