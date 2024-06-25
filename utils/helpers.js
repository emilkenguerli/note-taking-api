/**
 * Validate email format.
 * @param {string} email - The email to validate.
 * @returns {boolean} True if valid, otherwise false.
 */
exports.validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
