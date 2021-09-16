const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/dbConnection');

class Job extends Model {

  // Create a method for Interviews
}

Job.init({
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
    defaultValue: 0,
    validate: {
      isInt: {
        msg: 'Hopefull salary must be a valid number'
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
    }
  }, 

  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Job'
})

module.exports = Job;