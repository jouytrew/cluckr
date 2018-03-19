
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clucks', table => {
    table.increments('id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('username');
    table.text('content');
    table.string('image_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('clucks');
};
