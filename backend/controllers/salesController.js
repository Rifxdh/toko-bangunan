const db = require('../models');

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await db.Sales.findAll({
      include: [
        { model: db.Customer, attributes: ['id', 'nama', 'email'] },
        { model: db.Product, attributes: ['id', 'nama', 'harga'] }
      ]
    });
    res.status(200).json({
      success: true,
      data: sales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get sales by ID
exports.getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await db.Sales.findByPk(id, {
      include: [
        { model: db.Customer, attributes: ['id', 'nama', 'email'] },
        { model: db.Product, attributes: ['id', 'nama', 'harga'] }
      ]
    });
    
    if (!sales) {
      return res.status(404).json({
        success: false,
        message: 'Penjualan tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: sales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create sales
exports.createSales = async (req, res) => {
  try {
    const { customerId, productId, jumlah, keterangan } = req.body;

    if (!customerId || !productId || !jumlah) {
      return res.status(400).json({
        success: false,
        message: 'Customer, produk, dan jumlah harus diisi'
      });
    }

    // Check product exists and get price
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan'
      });
    }

    // Check stok
    if (product.stok < jumlah) {
      return res.status(400).json({
        success: false,
        message: `Stok tidak cukup. Stok tersedia: ${product.stok}`
      });
    }

    // Check customer exists
    const customer = await db.Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Pelanggan tidak ditemukan'
      });
    }

    const hargaSatuan = product.harga;
    const total = hargaSatuan * jumlah;

    const sales = await db.Sales.create({
      customerId,
      productId,
      jumlah,
      hargaSatuan,
      total,
      keterangan
    });

    // Decrease product stok
    await product.update({
      stok: product.stok - jumlah
    });

    // Update customer total pembelian
    await customer.update({
      totalPembelian: customer.totalPembelian + total
    });

    res.status(201).json({
      success: true,
      message: 'Penjualan berhasil dicatat',
      data: sales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update sales
exports.updateSales = async (req, res) => {
  try {
    const { id } = req.params;
    const { jumlah, keterangan } = req.body;

    const sales = await db.Sales.findByPk(id);
    if (!sales) {
      return res.status(404).json({
        success: false,
        message: 'Penjualan tidak ditemukan'
      });
    }

    if (jumlah) {
      // Check product stok if jumlah changed
      const product = await db.Product.findByPk(sales.productId);
      const stokDiff = jumlah - sales.jumlah;
      
      if (stokDiff > 0 && product.stok < stokDiff) {
        return res.status(400).json({
          success: false,
          message: 'Stok tidak cukup'
        });
      }

      // Update product stok
      await product.update({
        stok: product.stok - stokDiff
      });

      // Update customer total
      const customer = await db.Customer.findByPk(sales.customerId);
      const totalDiff = (jumlah * sales.hargaSatuan) - sales.total;
      await customer.update({
        totalPembelian: customer.totalPembelian + totalDiff
      });

      // Update sales
      await sales.update({
        jumlah,
        total: jumlah * sales.hargaSatuan,
        keterangan: keterangan || sales.keterangan
      });
    } else {
      await sales.update({
        keterangan: keterangan || sales.keterangan
      });
    }

    res.status(200).json({
      success: true,
      message: 'Penjualan berhasil diperbarui',
      data: sales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete sales
exports.deleteSales = async (req, res) => {
  try {
    const { id } = req.params;

    const sales = await db.Sales.findByPk(id);
    if (!sales) {
      return res.status(404).json({
        success: false,
        message: 'Penjualan tidak ditemukan'
      });
    }

    // Restore product stok
    const product = await db.Product.findByPk(sales.productId);
    await product.update({
      stok: product.stok + sales.jumlah
    });

    // Update customer total
    const customer = await db.Customer.findByPk(sales.customerId);
    await customer.update({
      totalPembelian: customer.totalPembelian - sales.total
    });

    await sales.destroy();

    res.status(200).json({
      success: true,
      message: 'Penjualan berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get sales report
exports.getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let where = {};
    if (startDate && endDate) {
      where.tanggal = {
        [db.Sequelize.Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const sales = await db.Sales.findAll({
      where,
      include: [
        { model: db.Customer, attributes: ['id', 'nama'] },
        { model: db.Product, attributes: ['id', 'nama'] }
      ]
    });

    const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
    const totalTransactions = sales.length;
    const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;

    res.status(200).json({
      success: true,
      data: {
        sales,
        summary: {
          totalSales,
          totalTransactions,
          averageTransaction
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
