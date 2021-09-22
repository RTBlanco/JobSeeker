'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Interview.belongsTo(models.Job)
    }
  };
  Interview.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Date is not valid"
        },
        notNull: {
          msg: "Date can not be empty"
        },

        isAfter: {
          args: new Date().toLocaleDateString(),
          msg: "Interviews can't be set same day as creation"
        }
      }
    }, 
    
    notes: {
      type: DataTypes.STRING,
      // allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Interview',
  });
  return Interview;
};