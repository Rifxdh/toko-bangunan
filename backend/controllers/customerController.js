const db = require('../models');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await db.Customer.findAll();
    res.status(200).json({
      success: true,
      data: customers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await db.Customer.findByPk(id);
    
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Pelanggan tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const { nama, email, telepon, alamat } = req.body;

    if (!nama || !telepon) {
      return res.status(400).json({
        success: false,
        message: 'Nama dan telepon harus diisi'
      });
    }

    const customer = await db.Customer.create({
      nama,
      email,
      telepon,
      alamat
    });

    res.status(201).json({
      success: true,
      message: 'Pelanggan berhasil ditambahkan',
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, telepon, alamat } = req.body;

    const customer = await db.Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Pelanggan tidak ditemukan'
      });
    }

    await customer.update({
      nama: nama || customer.nama,
      email: email || customer.email,
      telepon: telepon || customer.telepon,
      alamat: alamat || customer.alamat
    });

    res.status(200).json({
      success: true,
      message: 'Pelanggan berhasil diperbarui',
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await db.Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Pelanggan tidak ditemukan'
      });
    }

    await customer.destroy();

    res.status(200).json({
      success: true,
      message: 'Pelanggan berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
