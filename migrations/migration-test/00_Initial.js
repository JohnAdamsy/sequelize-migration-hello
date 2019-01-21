const Promise = require('bluebird');

module.exports = {
    up: function(sequelize, query, DataTypes) {
        return query.createTable('T_Migration_Users', {sequelize.model['MigrationUser'].rawAttributes)});
    },

    down: function(query, DataTypes) {
        // return query.dropAllTables();
        return query.dropTable('T_Migration_Users');
    }
};
