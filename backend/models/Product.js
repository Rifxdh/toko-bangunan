module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    kategori: {
      type: DataTypes.ENUM('Material', 'Finishing', 'Peralatan', 'Lainnya'),
      allowNull: false
    },
    harga: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'products',
    timestamps: true
  });
};
