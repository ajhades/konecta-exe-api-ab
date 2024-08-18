const pool = require('./db');

/**
 * Get paginated data.
 *
 * @param {string} tableName - Table name.
 * @param {number} page - Current page (default 1).
 * @param {number} pageSize - Page size (default 10).
 * @param {string} [orderBy='id'] - Column to sort by (default 'id').
 * @param {object} [filters={}] - Aditional filters.
 * @returns {Promise<object>} - Object with paginated data and pagination information.
 */
const getPaginatedData = async (
  tableName,
  page = 1,
  pageSize = 10,
  orderBy = 'id',
  filters = {}
) => {
  const offset = (page - 1) * pageSize;

  const filterKeys = Object.keys(filters);
  let filterClause = '';
  let filterValues = [];
  if (filterKeys.length > 0) {
    filterClause =
      'AND ' +
      filterKeys
        .map((key, index) => {
          const value = filters[key];
          filterValues.push(value);
          return `${key} $${index + 1}`;
        })
        .join(' AND ');
  }

  try {
    const dataQuery = `SELECT * FROM ${tableName} WHERE deleted_at is null ${filterClause} ORDER BY ${orderBy} LIMIT $${filterKeys.length + 1} OFFSET $${filterKeys.length + 2}`;
    const result = await pool.query(dataQuery, [
      ...filterValues,
      pageSize,
      offset,
    ]);

    const countQuery = `SELECT COUNT(*) FROM ${tableName} WHERE deleted_at is null ${filterClause}`;
    const totalResult = await pool.query(countQuery, filterValues);
    const totalRecords = parseInt(totalResult.rows[0].count, 10);

    const totalPages = Math.ceil(totalRecords / pageSize);

    return {
      page,
      pageSize,
      totalRecords,
      totalPages,
      data: result.rows,
    };
  } catch (error) {
    console.error('Error getting paginated data:', error);
    throw error;
  }
};

module.exports = { getPaginatedData };
