const User = require("../entities/User");

class UserRepository {
    async getUserById(id) {
        return await User.findByPk(id);
    }
}

module.exports = new UserRepository();
