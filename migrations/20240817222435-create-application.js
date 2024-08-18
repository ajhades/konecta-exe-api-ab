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
  return db.createTable('applications', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    code: 'string',
    description: 'string',
    resume: 'string',
    created_at: 'timestamp',
    updated_at: 'timestamp',
    deleted_at: 'timestamp',
    employee_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'request_employees_id_fk',
        table: 'employees',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: {
          employee_id: 'id',
        },
      },
    },
  });
};

exports.down = function (db) {
  return db.dropTable('applications');
};

exports._meta = {
  version: 1,
};
