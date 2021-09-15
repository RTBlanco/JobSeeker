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
  },

  status: {
    type: DataTypes.STRING
  },

  offer: {
    type: DataTypes.INTEGER
  }
})

module.exports = Job;