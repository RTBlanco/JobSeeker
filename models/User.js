const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/dbConnection'); 
const bcrypt = require('bcrypt')


class User extends Model {

  // TODO: create Method for Favorites
  // TODO: add password encryption
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
    },
    async set(value) {
      bcrypt.hash(value, 10, (er, hash) =>{
        this.setDataValue(hash)
      })
    }
  }

},{
  sequelize,
  modelName: 'User'
})

module.exports = User;