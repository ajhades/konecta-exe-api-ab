'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('roles', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: 'string',
    description: 'string',
    created_at: 'timestamp',
    updated_at: 'timestamp',
    deleted_at: 'timestamp',
  });
};

exports.down = function (db) {
  return db.dropTable('roles');
};

exports._meta = {
  version: 1,
};
