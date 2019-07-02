const db = require('../config/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
  findBy
};

function insert(user) {
  return getAll()
    .insert(user, 'id')
    .then(([id]) => findById(id));
}

async function update(id, changes) {
  await findBy({id}).update(changes, '*');

  return findById(id);
}

function remove(id) {
  return findBy({id}).del();
}

function getAll() {
  return db('users');
}

function findById(id) {
  return findBy({id}).first();
}

function findBy(filter) {
  return getAll().where(filter);
}
