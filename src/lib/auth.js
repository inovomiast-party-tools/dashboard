/*
    Auth.js - Authentication library
    Created by: INovomiast2
    Created on: 29/01/2024 (DD/MM/YYYY)
*/

// Libraries Import
import cryptojs from 'crypto-js'


/**
 * [Auth] - Authentication class]
 */
export default class Auth {
    /**
    * [verifyToken] - Verify a token
    * @param {string} token - The token to verify
    * @returns {boolean} - If the token is valid or not
    */
    static async verifyToken(token) {
        // This token verification process it's simple but eficient.
        // this is going to decrypt the token and check if it's valid.
        // if it's valid, it's going to return true, else, false.

        // Decrypt the token
        const bytes = cryptojs.AES.decrypt(token, process.env.TOKEN_SECRET);
    }
    
    static generateToken(userId) {
        // Generate a AES token
        const AuthToken = cryptojs.AES.encrypt(userId, process.env.TOKEN_SECRET).toString();
        return AuthToken;
    }
}