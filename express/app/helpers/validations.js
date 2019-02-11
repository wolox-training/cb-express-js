exports.isAlphanumeric = value => /^[a-zA-Z0-9]+$/.test(value);
exports.isValidEmail = email => /\S+@wolox.com.ar/.test(email);
exports.isValidPassword = pass => exports.isAlphanumeric(pass) && pass.length >= 8 && pass.length <= 24;
