const { v4: uuidv4 } = require('uuid');
const persons = require('../db/db.json');

const { writeDataToDb } = require('../utils/db_worker');
const { dbPath } = require('../utils/config');

const _findAll = () => new Promise((resolve) => resolve(persons));

const _findById = (id) =>
  new Promise((resolve) => resolve(persons?.find((p) => p?.id === id)));

const _create = (person) => {
  return new Promise((resolve) => {
    const newPerson = { id: uuidv4(), ...person };
    persons.push(newPerson);
    writeDataToDb(dbPath, persons);
    resolve(newPerson);
  });
};

const _update = (id, person) => {
  return new Promise((resolve) => {
    const index = persons.findIndex((p) => p?.id === id);
    persons[index] = { id, ...person };
    writeDataToDb(dbPath, persons);
    resolve(persons[index]);
  });
};

const _delete = (id) =>
  new Promise((resolve) => {
    const filteredPersons = persons.filter((p) => p.id !== id);
    writeDataToDb(dbPath, filteredPersons);
    resolve();
  });

module.exports = {
  _findAll,
  _findById,
  _create,
  _update,
  _delete,
};
