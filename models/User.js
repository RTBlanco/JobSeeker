const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/dbConnection'); 

class User extends Model {

  // TODO: create Method for Favorites
}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
      notNull: {
        msg: 'Name cant be empty'
      }
    }
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      len: [2, 50]
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 50]
    }
  }

},{
  sequelize,
  modelName: 'User'
})

module.exports = User;