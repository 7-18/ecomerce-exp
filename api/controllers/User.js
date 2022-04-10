import User from "../models/User.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Datos incompletos" });

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send({ message: "El usuario ya está registrado" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const adminId = await Admin.findOne({ name: "user" });
  if (!Admin)
    return res.status(400).send({ message: "No fue asignado un rol" });

  const userRegister = new User({
    username: req.body.username,
    email: req.body.email,
    password: passHash,
    adminId: adminId._id,
    dbStatus: true,
  });

  const result = await userRegister.save();

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          username: result.username,
          adminId: result.adminId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Error al registrar" });
  }
};

const registerAdminUser = async (req, res) => {
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.adminId
  )
    return res.status(400).send({ message: "Datos incompletos" });

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send({ message: "El usuario ya está registrado" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userRegister = new User({
    username: req.body.username,
    email: req.body.email,
    password: passHash,
    adminId: req.body.adminId,
  });

  const result = await userRegister.save();
  return !result
    ? res.status(400).send({ message: "Error al registrar" })
    : res.status(200).send({ result });
};

const listUsers = async (req, res) => {
  const userList = await User.find({
    $and: [{ name: new RegExp(req.params["name"], "i") }, { dbStatus: "true" }],
  })
    .populate("adminId")
    .exec();
  return userList.length === 0
    ? res.status(400).send({ message: "La lista de usuarios está vacía" })
    : res.status(200).send({ userList });
};

const listAllUser = async (req, res) => {
  const userList = await User.find({
    $and: [{ name: new RegExp(req.params["name"], "i") }],
  })
    .populate("adminId")
    .exec();
  return userList.length === 0
    ? res.status(400).send({ message: "La lista de usuarios está vacía" })
    : res.status(200).send({ userList });
};

const findUser = async (req, res) => {
  const userfind = await User.findById({ _id: req.params["_id"] })
    .populate("adminId")
    .exec();
  return !userfind
    ? res.status(400).send({ message: "No se encontraron resultados" })
    : res.status(200).send({ userfind });
};

const getUserRole = async (req, res) => {
  let userRole = await User.findOne({ email: req.params.email })
    .populate("adminId")
    .exec();
  if (userRole.length === 0)
    return res.status(400).send({ message: "No se encontraron resultados" });

  userRole = userRole.adminId.name;
  return res.status(200).send({ userRole });
};

const updateUser = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.adminId)
    return res.status(400).send({ message: "Datos incompletos" });

  const searchUser = await User.findById({ _id: req.body._id });
  if (req.body.email !== searchUser.email)
    return res.status(400).send({ message: "El email no puede ser cambiado" });

  let pass = "";

  if (req.body.password) {
    const passHash = await bcrypt.compare(
      req.body.password,
      searchUser.password
    );
    if (!passHash) {
      pass = await bcrypt.hash(req.body.password, 10);
    } else {
      pass = searchUser.password;
    }
  } else {
    pass = searchUser.password;
  }

  const existingUser = await User.findOne({
    username: req.body.username,
    email: req.body.email,
    password: pass,
    adminId: req.body.adminId,
  });
  if (existingUser)
    return res.status(400).send({ message: "No has realizado ningún cambio" });

  const userUpdate = await User.findByIdAndUpdate(req.body._id, {
    username: req.body.username,
    email: req.body.email,
    password: pass,
    adminId: req.body.adminId,
  });

  return !userUpdate
    ? res.status(400).send({ message: "Error editando usuario" })
    : res.status(200).send({ message: "Usuario actualizado" });
};

const deleteUser = async (req, res) => {
  const userDelete = await User.findByIdAndDelete(req.params["_id"]);
  return !userDelete
    ? res.status(400).send({ message: "Error eliminando usuario" })
    : res.status(200).send({ message: "Usuario eliminado" });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Datos incompletos" });

  const userLogin = await User.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Correo o contraseña erróneos" });

  const hash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Correo o contraseña erróneos" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          username: userLogin.username,
          adminId: userLogin.adminId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Error al iniciar sesión" });
  }
};

export default {
  registerUser,
  registerAdminUser,
  listUsers,
  listAllUser,
  findUser,
  updateUser,
  deleteUser,
  getUserRole,
  login,
};
