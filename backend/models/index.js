const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Customer = require('./Customer');
const Sales = require('./Sales');

const DataTypes = require('sequelize').DataTypes;

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  User: User(sequelize, DataTypes),
  Product: Product(sequelize, DataTypes),
  Customer: Customer(sequelize, DataTypes),
  Sales: Sales(sequelize, DataTypes)
};

// Setup relationships
db.Customer.hasMany(db.Sales, { foreignKey: 'customerId' });
db.Sales.belongsTo(db.Customer, { foreignKey: 'customerId' });

db.Product.hasMany(db.Sales, { foreignKey: 'productId' });
db.Sales.belongsTo(db.Product, { foreignKey: 'productId' });

module.exports = db;