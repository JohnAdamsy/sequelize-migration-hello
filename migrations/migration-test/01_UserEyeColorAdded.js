const Promise = require('bluebird');

module.exports = {
    up: function(query, DataTypes) {
        return query.addColumn(
            'T_Migration_Users', 'eyeColor',
            DataTypes.ENUM('unspecified', 'green', 'blue', 'hazel'),
            {
                allowNull: true,
                defaultValue: 'unspecified',
            }
        ).then(() => {
            return query.sequelize.query(
                `UPDATE "T_Migration_Users" SET "eyeColor"='unspecified' WHERE "eyeColor" IS NULL;`,
                { raw: true });
        });
    },

    down: function(query, DataTypes) {
        // NOTE: Sequelize does not play nice with postgres enums
        //       requires a raw query
        return query.sequelize.query([
            'ALTER TABLE "T_Migration_Users" DROP COLUMN "eyeColor";',
            'DROP TYPE "enum_users_eyeColor";',
        ].join(''), { raw: true });

    }
};
