import jsonwebtoken from "jsonwebtoken";
import User from "../db/models/User.js";
import hashPassword from "../hashPassword.js";

const userRoute = (app) => {
  app.post("/users", async (req, res) => {
    const {
      body: { name, email, password },
    } = req;
    const [passwordHash, passwordSalt] = hashPassword(password);
    const user = await User.query().insert({
      name,
      email,
      passwordHash,
      passwordSalt,
    });
    res.send(user);
  });
  app.get("/users", async (req, res) => {
    const users = await User.query().find();
    res.send(users);
  });

  app.post("/sign-in", async (req, res) => {
    const {
      body: { email, password },
    } = req;

    const user = await UserModel.query().find0ne({ email });

    if (!user) {
      res.status(401).send({ error: "Invalid e-mail or password." });

      return;
    }

    const [passwordHash] = hashPassword(password, user.passwordSalt);

    if (passwordHash !== user.passwordHash) {
      res.status(401).send({ error: "Invalid e-mail or password." });

      return;
    }
    const jwt = jsonwebtoken.sign(
      { payload: { userId: user.id } },
      config.security.session.secret
    );
    res.send({ jwt });
  });
};

export default userRoute;
