const bcrypt = require('bcrypt');


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

function generateRandomPassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Characters to include in the password
    let password = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

module.exports = {
    generatePasswordHash,
    generateRandomPassword
};
