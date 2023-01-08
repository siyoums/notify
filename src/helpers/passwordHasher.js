const bcrypt = require("bcrypt");

const hashPassword = {
    hash: async (password) => {
        try {
            const salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash(password, salt);
            return hashed;
        } catch (err) {
            console.log(err);
        }
    },
    compare: async (password, passkey) => {
        return await bcrypt.compare(password, passkey);
    },
};

module.exports = hashPassword;
