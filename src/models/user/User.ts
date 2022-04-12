/**
 * @file Declares the User data type representing the User
 */
import {AccountType} from "./AccountType";
import {MaritalStatus} from "./MaritalStatus";
import {Location} from "./Location";

/**
 * Represents the User
 * @typedef {User} User
 * @property {string} username a string to uniquely represent and identify a User
 * @property {string} password represents the user's password
 * @property {string | null} firstName the user's First name
 * @property {string | null} lastName the user's Last name
 * @property {string} email the user's primary email address
 * @property {string | null} profilePhoto the user's Profile Picture
 * @property {string | null} headerImage the user's Header Image
 * @property {AccountType} accountType the Type of the user's account
 * @property {MaritalStatus} maritalStatus the user's Marital Status
 * @property {string | null} biography the user's Biography or the About section
 * @property {Date | null} dateOfBirth the user's date of birth
 * @property {Date} joined the day the user joined Tuiter
 * @property {Location | null} location the user's Location
 */
export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    profilePhoto: string | null;
    headerImage: string | null;
    accountType: AccountType;
    maritalStatus: MaritalStatus;
    biography: string | null;
    dateOfBirth: Date | null;
    joined: Date;
    location: Location | null;
}
