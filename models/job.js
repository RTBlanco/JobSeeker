'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User)
      Job.hasMany(models.Interview, {onDelete: "CASCADE"})
    }
  };
  Job.init({
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
  
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    companyLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: 'Not a valid link'
        }
      }
    },
  
    hopeSal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Hopefull salary must be a valid number'
        }
      },
      set(value) {
        if (Number.isInteger(value)){
          this.setDataValue('hopeSal', value)
        } else {
          const intValue = parseInt(value)
          this.setDataValue('hopeSal', intValue)
        }
      }
    },
  
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
  
    offer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: "Offer must be a valid number"
        },
        // notEmpty: {
        //   msg: "Offer must not be an emtpy string"
        // }
      },
      set(value) {
        if (Number.isInteger(value)){
          this.setDataValue('offer', value)
        } else {
          const intValue = parseInt(value)
          this.setDataValue('offer', intValue)
        }
      }
    }, 
  
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};