/**
 * @file Declares API for Follow related data access object methods
 */
import {Follow} from "../../models/Follow";

/**
 * Defines the CRUD functions {@link FollowDao} is to support.
 */
export interface FollowDaoI {
    /**
     * Returns all the {@link User}s Followers
     * @param uid {string} - The UID of the User, who's followers are to be retrieved
     * @return {Promise<Follow[]>} - a Promise containing the User's followers
     */
    findAllUsersThatFollowUser(uid: string): Promise<Follow[]>;

    /**
     * Returns all the {@link User}s followed by the User
     * @param uid {string} - The UID of the User, who's followed Users are to be retrieved
     * @return {Promise<Follow[]>} - a Promise containing the User's followed Users
     */
    findAllUsersFollowedByUser(uid: string): Promise<Follow[]>;

    /**
     * Records a {@link User} following another User
     * @param followerUid {string} - The UID of the user who is following a User
     * @param followingUid {string} - The UID of the user who is being followed
     * @return {Promise<Follow>} the Follow record added to the database
     */
    userFollowsUser(followerUid: string, followingUid: string): Promise<Follow>;

    /**
     * Removes the record a {@link User} following another User
     * @param followerUid {string} - The UID of the user who is unfollowing a User
     * @param followingUid {string} - The UID of the user who is being unfollowed
     * @return {Promise<object>} the status of the delete operation
     */
    userUnfollowsUser(followerUid: string, followingUid: string): Promise<object>;

    /**
     * Removes the records of a {@link User} following any other users
     * @param followerUid {string} - The UID of the user who is unfollowing the Users
     * @return {Promise<object>} the status of the delete operation
     */
    userUnfollowsAllUsers(followerUid: string): Promise<object>;

    /**
     * Returns if there exists a record of the {@link User} following another user {@link User}
     * @param uid {string} - the UID of the User
     * @param followedUid {string} - the UID of the User that may be followed by other User
     * @return {Promise<boolean>} returns if the user with UID uid is being followed by User with UID following
     */
    userIsFollowingUser(following_uid: string, followedUid: string): Promise<boolean>;

}
