// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: 'cluckr_dev'
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    }
  },
};
