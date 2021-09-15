const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/dbConnection');

class Job extends Model {

  // Create a method for Interviews
}

User.init({
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },

  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  hopeSal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },

  offer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = Job;