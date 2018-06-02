'use strict';
/**
 *  Load Module Dependencies
 */
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const config    = require('../config')
const dbConfig  = require('../config/db')[config.ENV];
const sequelize   = new Sequelize(dbConfig);

let db          = {};

let files = [
require('entity-migration-user')
];

for(let file of files) {
  let model =  file(sequelize, Sequelize)

  db[model.name] = model;

}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
