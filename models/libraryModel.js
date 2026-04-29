const db = require('../config/db');

// ===============================
// ADICIONAR ITEM
// ===============================
exports.addItem = async (data, callback) => {
  const { user_id, type, item_id, title } = data;

  try {
    await db.query(
      `INSERT INTO library (user_id, type, item_id, title)
       VALUES ($1, $2, $3, $4)`,
      [user_id, type, item_id, title]
    );

    callback(null);
  } catch (err) {
    callback(err);
  }
};

// ===============================
// BUSCAR BIBLIOTECA
// ===============================
exports.getUserLibrary = async (user_id, callback) => {
  try {
    const result = await db.query(
      `SELECT * FROM library WHERE user_id = $1`,
      [user_id]
    );

    callback(null, result.rows);
  } catch (err) {
    callback(err, null);
  }
};

// ===============================
// VERIFICAR ITEM (EVITAR DUPLICADO)
// ===============================
exports.checkItem = async (user_id, item_id, callback) => {
  try {
    const result = await db.query(
      `SELECT * FROM library WHERE user_id = $1 AND item_id = $2`,
      [user_id, item_id]
    );

    callback(null, result.rows);
  } catch (err) {
    callback(err, null);
  }
};