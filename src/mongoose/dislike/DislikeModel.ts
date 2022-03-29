/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose"
import {DislikeSchema} from "./DislikeSchema"

/**
 * The DislikeModel is used for creating and reading documents of the {@link Like} type defined by the
 * {@link DislikeSchema} from the underlying MongoDB database.
 * @typedef {DislikeModel} LikeModel
 */
export const DislikeModel = mongoose.model("DislikeModel", DislikeSchema)
