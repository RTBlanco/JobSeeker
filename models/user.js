'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     async isValid(password) {
      return await bcrypt.compare(password, this.password)
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Job, {onDelete: 'CASCADE'})
    }
  };
  User.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
        notNull: {
          msg: 'Name cant be empty'
        }
      }
    },

    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [2, 50]
      }
    },

    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50]
      }
    }
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        console.log("hased password => ",hashedPassword)
        user.password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};