module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telepon: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    totalPembelian: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0
    }
  }, {
    tableName: 'customers',
    timestamps: true
  });
};
