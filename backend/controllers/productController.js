const db = require('../models');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { nama, kategori, harga, stok, deskripsi } = req.body;

    if (!nama || !kategori || !harga) {
      return res.status(400).json({
        success: false,
        message: 'Nama, kategori, dan harga harus diisi'
      });
    }

    const product = await db.Product.create({
      nama,
      kategori,
      harga,
      stok: stok || 0,
      deskripsi
    });

    res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, kategori, harga, stok, deskripsi } = req.body;

    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    await product.update({
      nama: nama || product.nama,
      kategori: kategori || product.kategori,
      harga: harga || product.harga,
      stok: stok !== undefined ? stok : product.stok,
      deskripsi: deskripsi || product.deskripsi
    });

    res.status(200).json({
      success: true,
      message: 'Produk berhasil diperbarui',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    await product.destroy();

    res.status(200).json({
      success: true,
      message: 'Produk berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
