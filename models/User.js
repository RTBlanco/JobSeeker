const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/dbConnection'); 
const bcrypt = require('bcrypt')


class User extends Model {

  // TODO: create Method for Favorites
  async isValid(password) {
    return await bcrypt.compare(password, this.password)
  }
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
  hooks: {
    beforeCreate: async (user, options) => {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      console.log("hased password => ",hashedPassword)
      user.password = hashedPassword
    }
  },
  sequelize,
  modelName: 'User'
})


module.exports = User;