
// userValidator.js
// Validates user data when registering
// Brendan Dileo - June 2025

const validator = require('validator');

const validateRegistration = ({ username, email, password }) => {
    const errors = [];

    if (!username || !email || !password)
        errors.push('Username, email, and password are required!');

    // Extra username validation
    if (!validator.isLength(username, { min: 3, max: 20 }) || !/^[a-zA-Z0-9_]+$/.test(username))
        errors.push('Username must be 3-20 characters long and can only contain letters, numbers, and underscores.');

    // Extra email validation
    if (!validator.isEmail(email))
        errors.push('Invalid email format!');

    // Extra password validation
    if (!validator.isStrongPassword(password, {
        minLength: 9,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        errors.push('Password must be at least 9 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.');
    }

    return errors;
}

module.exports = { validateRegistration };