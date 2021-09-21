'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('Jobs', 'UserId', {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
      
      await queryInterface.addColumn('Interviews', 'JobId', {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Jobs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Jobs', 'UserId', {transaction})
      await queryInterface.removeColumn('Interviews', 'JobId', {transaction})
      
      await transaction.commit()
    } catch(e) {
      await transaction.rollback()
      throw e
    }
  }
};
