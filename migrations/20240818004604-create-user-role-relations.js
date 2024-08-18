'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.addForeignKey('users', 'roles', 'role_users_id_fk',
    {
      'role_id': 'id'
    });
};

exports.down = function(db) {
  return db.removeForeignKey('users', 'role_users_id_fk');
};

exports._meta = {
  "version": 1
};
