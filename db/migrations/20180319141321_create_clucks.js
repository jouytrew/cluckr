exports.up = function(knex, Promise) {
  return knex.schema.createTable('clucks', table => {
    table.increments('id');
    table.timestamp('created_at').defaultTo(new Date().getTime());
    table.timestamp('updated_at').defaultTo(new Date().getTime());
    table.string('username');
    table.text('content');
    table.string('image_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('clucks');
};
