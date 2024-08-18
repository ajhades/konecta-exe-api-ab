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
  return db.createTable('permissions', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: 'string',
    description: 'string',
    created_at: 'timestamp',
    updated_at: 'timestamp',
    deleted_at: 'timestamp',
    role_id:
    {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'role_permissions_id_fk',
        table: 'roles',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          role_id: 'id'
        }
      }
    },
  });
};

exports.down = function(db) {
  return db.dropTable('permissions');
};

exports._meta = {
  "version": 1
};
