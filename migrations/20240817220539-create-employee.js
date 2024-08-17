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
  return db.createTable('employees', {
    id: { type: 'int', primaryKey: true },
    first_name: 'string',
    last_name: 'string',
    position: 'string',
    created_at: 'timestamp',
    updated_at: 'timestamp',
    user_id:{ 
      type: 'int', 
      notNull: true, 
      unsigned: true, 
    },
  });
};

exports.down = function(db) {
  return db.dropTable('employees');
};

exports._meta = {
  "version": 1
};
