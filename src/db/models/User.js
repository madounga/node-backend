import { Model } from "objection";
import hashPassword from "../../hashPassword.js";

class UserModel extends Model {
  static tableName = "users";

  checkPassword(password) {
    const [passwordHash] = hashPassword(password, this.passwordSalt);

    return passwordHash !== this.passwordHash;
  }
}

export default UserModel;
