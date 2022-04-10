import Admin from "../models/Admin.js";

const registerAdmin = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Datos incompletos" });

  const existingAdmin = await Admin.findOne({ name: req.body.name });
  if (existingAdmin)
    return res.status(400).send({ message: "El admin ya existe" });

  const adminSchema = new Admin({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  const result = await adminSchema.save();
  return !result
    ? res.status(400).send({ message: "Error registrando admin" })
    : res.status(200).send({ result });
};

const listAdmin = async (req, res) => {
  const adminList = await Admin.find();
  return adminList.length == 0
    ? res.status(400).send({ message: "La lista de admins está vacía" })
    : res.status(200).send({ adminList });
};

const updateAdmin = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Datos incompletos" });

  const existingAdmin = await Admin.findOne({
    name: req.body.name,
    description: req.body.description,
  });
  if (existingAdmin)
    return res.status(400).send({ message: "El admin ya existe" });

  const adminUpdate = await Admin.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });

  return !adminUpdate
    ? res.status(400).send({ message: "Error editando admin" })
    : res.status(200).send({ message: "Admin actualizado" });
};

const deleteAdmin = async (req, res) => {
  const adminDelete = await Admin.findByIdAndDelete({ _id: req.params["_id"] });
  return !adminDelete
    ? res.status(400).send({ message: "Admin no encontrado" })
    : res.status(200).send({ message: "Admin eliminado" });
};

const findAdmin = async (req, res) => {
  const adminId = await Admin.findById({ _id: req.params["_id"] });
  return !adminId
    ? res.status(400).send({ message: "No se encontraron resultados" })
    : res.status(200).send({ adminId });
};

export default { registerAdmin, listAdmin, updateAdmin, deleteAdmin, findAdmin };