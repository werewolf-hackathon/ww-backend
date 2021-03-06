exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments();

    table
      .string('email', 128)
      .notNullable()
      .unique();

    table
      .string('username', 128)
      .notNullable()
      .unique();

    table.string('password', 128).notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('users');
};
