import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import moment from "moment";

const createProduct = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.price)
    return res.status(400).send({ message: "Datos incompletos" });

  // let imageUrl = "";
  // if (Object.keys(req.files).length === 0) {
  //   imageUrl = "";
  // } else {
  //   if (req.files.image) {
  //     if (req.files.image.type != null) {
  //       const url = req.protocol + "://" + req.get("host") + "/";
  //       const serverImg =
  //         ".uploads/" + moment().unix() + path.extname(req.files.image.path);
  //       fs.createReadStream(req.files.image.path).pipe(
  //         fs.createWriteStream(serverImg)
  //       );
  //       imageUrl = url + serverImg;
  //     }
  //   }
  // }

  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    inStock: req.body.inStock,
  });

  try {
    const newProduct = await product.save();
    return res.status(200).send({ newProduct });
  } catch (e) {
    return res.status(400).send({ message: "Error al registrar" });
  }
};

const updateProduct = async (req, res) => {
  if (!req.params.id)
    return res.status(400).send({ message: "Datos incompletos" });

  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(400).send({ message: "Producto no encontrado" });

  const productUpdate = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  try {
    return res.status(200).json({
      message: "Producto actualizado",
      product: productUpdate,
    });
  } catch (e) {
    return res.status(400).send({ message: "Error al actualizar producto" });
  }
};

const deleteProduct = async (req, res) => {
  if (!req.params.id)
    return res.status(400).send({ message: "Datos incompletos" });

  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(400).send({ message: "Producto no encontrado" });

  const result = await Product.findByIdAndDelete(req.params.id);

  try {
    return res.status(200).json({
      message: "Producto eliminado",
      product: result,
    });
  } catch (e) {
    return res.status(400).send({ message: "Error al eliminar producto" });
  }
};

const listProducts = async (req, res) => {
  const productList = await Product.find();

  try {
    return res.status(200).json({ productList });
  } catch (e) {
    return res.status(400).send({ message: "Error al listar productos" });
  }
};

const findProduct = async (req, res) => {
  const product = await Product.findById({ _id: req.params["_id"] });
  if (!product)
    return res.status(400).send({ message: "Producto no encontrado" });

  try {
    return res.status(200).json({ product });
  } catch (e) {
    return res.status(400).send({ message: "Error al encontrar producto" });
  }
};

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  findProduct,
};
