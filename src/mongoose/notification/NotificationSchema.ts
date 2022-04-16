/**
 * @file Implements mongoose schema for Notifications
 */
import mongoose from "mongoose";

export const NotificationSchema = new mongoose.Schema({
    subject_uid: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    subject_tid: {type: mongoose.Schema.Types.ObjectId, ref: "tuitModel"},
    subject_type: {type: String, required: true},
    verb: {type: String, required: true},
    predicate_uid: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    predicate_tid: {type: mongoose.Schema.Types.ObjectId, ref: "tuitModel"},
    predicate_type: {type: String, required: true},

    recipient: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    NotifiedOn: {type: Date, default: Date.now},
}, {collection: "notifications"})
