const { DataTypes, Model} = require('sequelize');
const sequelize = require('../db/dbConnection');


class Interview extends Model {

}

Interview.init({
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Date Can not be empty"
      }
    }
  }, 

  notes: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  sequelize,
  modelName: 'Interview'
});

module.exports = Interview;