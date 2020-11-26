const Sequelize = require('sequelize');
const Umzug = require('umzug');

exports.migrate = function(sequelizeInstance){
    return new Promise(function(resolve, reject){
        let umzug = new Umzug({
            storage: 'sequelize',
            storageOptions: {
                sequelize: sequelizeInstance
            },
            migrations: {
                params: [
                    sequelizeInstance.getQueryInterface(),
                    Sequelize
                ],
                path: './migrations',
                pattern: /\.js$/
            }
        });

        // Applying pending migrations.
        umzug.pending()
        .then(function (pendingMigrations){
            console.log('Applying migrations: ', pendingMigrations.map(p => p.file));
            umzug.up()
            .then(() => resolve('Migrations Completed!!'))
            .catch(err => {
                return reject(err);
            });
        })
        .catch(err => reject(err))
    });
}
