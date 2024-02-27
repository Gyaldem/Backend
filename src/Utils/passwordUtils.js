const bcrypt = require('bcrypt');
const crypto = require('crypto');

/**
 * Generates a hash for the given plaintext password.
 * @param {string} plaintextPassword - The plaintext password to be hashed.
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 */
function generatePasswordHash(plaintextPassword) {
    return new Promise((resolve, reject) => {
        // Generate a salt
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                // Reject the promise if there's an error
                return reject(err);
            }

            // Hash the password with the salt
            bcrypt.hash(plaintextPassword, salt, function(err, hash) {
                if (err) {
                    // Reject the promise if there's an error
                    return reject(err);
                }

                // Resolve the promise with the hashed password
                resolve(hash);
            });
        });
    });
}

/**
 * Generates a random password of the specified length.
 * @param {number} length - The length of the password to generate.
 * @returns {string} The randomly generated password.
 */
function generateRandomPassword(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    const randomBytes = crypto.randomBytes(length);
    let password = '';
    for (let i = 0; i < length; i++) {
        const index = randomBytes[i] % chars.length;
        password += chars[index];
    }
    
    return password;
  }

function generatePassword()
{
    return generatePasswordHash(generateRandomPassword());
}


/**
 * Compares a plaintext password with a hashed password.
 * @param {string} plaintextPassword - The plaintext password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves with the comparison result (true if the passwords match, false otherwise).
 */
function comparePassword(plaintextPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword, hashedPassword, function(err, result) {
            if (err) {
                // Reject the promise if there's an error
                return reject(err);
            }

            // Resolve the promise with the comparison result
            resolve(result);
        });
    });
}


module.exports = {
    generatePasswordHash,
    generateRandomPassword,
    generatePassword,
    comparePassword
};
