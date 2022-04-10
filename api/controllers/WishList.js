import WishList from "../models/WishList.js";

const addWishList = async (req, res) => {
  if (!req.body.userId)
    return res.status(400).send({ message: "Id de usuario no reconocido" });

  const wishList = new WishList(req.body);

  try {
    const saveWishList = await wishList.save();
    return res.status(200).send({ saveWishList });
  } catch (e) {
    return res.status(400).send({ message: "Error al registrar" });
  }
};

const updateWishList = async (req, res) => {
  try {
    const wishList = await WishList.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      message: "WishList actualizado",
      wishList,
    });
  } catch (e) {
    return res.status(400).send({ message: "Error al actualizar WishList" });
  }
};

const deleteWishList = async (req, res) => {
  try {
    const wishList = await WishList.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "WishList eliminado",
      wishList,
    });
  } catch (e) {
    return res.status(400).send({ message: "Error al eliminar WishList" });
  }
};

const getUserWishList = async (req, res) => {
  try {
    const wishList = await WishList.find({ userId: req.params.id });
    return res.status(200).json(wishList);
  } catch (e) {
    return res.status(400).send({ message: "Error al obtener WishList" });
  }
};

export default { addWishList, updateWishList, deleteWishList, getUserWishList };