const { DataTypes, Model} = require('sequelize');
const sequelize = require('../db/dbConnection');


class Interview extends Model {

}

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
      }
    }
  }, 

  notes: {
    type: DataTypes.STRING,
    allowNull: true
  }
},{
  sequelize,
  modelName: 'Interview'
});

module.exports = Interview;