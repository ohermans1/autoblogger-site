// src/utils/emailHelper.js

/**
 * Obfuscate email by splitting user and domain for better protection from bots.
 * @param {string} user - The user part of the email.
 * @param {string} domain - The domain part of the email.
 * @returns {object} - An object containing the obfuscated email and mailto link.
 */
export function obfuscateEmail(user, domain) {
  return {
    email: `${user}@${domain}`,
    mailto: `mailto:${user}@${domain}`
  };
}
