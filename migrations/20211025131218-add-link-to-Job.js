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
      await queryInterface.addColumn('Jobs', 'companyLink', {type: Sequelize.DataTypes.STRING})
      await transaction.commit();
    } catch (error) {
      await transaction.rollback()
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
      await queryInterface.removeColumn('Jobs', 'companyLink',{transaction})
      await transaction.commit()
    } catch (e) {
      await transaction.rollback()
      throw e
    }
  }
};
