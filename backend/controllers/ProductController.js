const { Op, Sequelize } = require("sequelize");
const { Product } = require("../models/index.js");

// Create Product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }

    // Ambil URL penuh untuk gambar
    const imageUrl = `${req.protocol}://${req.get("host")}/public/image/${
      req.file.filename
    }`;

    const newProduct = await Product.create({
      name,
      image: imageUrl,
      description,
      price,
      category,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Create Product Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const { name, category, page = 1 } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;
    let whereCondition = {};

    if (name) {
      whereCondition.name = { [Op.like]: `%${name}%` };
    }
    if (category) {
      whereCondition.category = category;
    }

    const products = await Product.findAll({
      where: whereCondition,
      order: [[Sequelize.literal("RAND()")]],
      limit,
      offset,
    });

    res.status(200).json({
      page: Number(page),
      perPage: limit,
      total: products.length,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product by ID Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }
    if (!name || !price || !category) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }

    let imageUrl = product.image;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/public/image/${
        req.file.filename
      }`;
    }

    await product.update({
      name,
      image: imageUrl,
      description,
      price,
      category,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error("Update Product Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }

    if (product.image) {
      const filename = path.basename(product.image);
      const imagePath = path.join(__dirname, "../public/image/", filename);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`Gambar ${filename} berhasil dihapus.`);
      } else {
        console.log(`Gambar ${filename} tidak ditemukan.`);
      }
    }

    await product.destroy();
    res.status(200).json({ message: "Produk berhasil dihapus." });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
