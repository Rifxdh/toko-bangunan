module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hargaSatuan: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    tanggal: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'sales',
    timestamps: true
  });
};
