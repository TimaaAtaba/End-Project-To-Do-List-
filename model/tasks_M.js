const db = require('../config/db_config');

async function getAll(userId) {
    let sql = `SELECT * FROM tasks WHERE user_id = ?`;
    let [rows] = await db.query(sql, [userId]);
    return rows;
}

async function getOne(taskId, userId) {
    let sql = `SELECT * FROM tasks WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql, [taskId, userId]);
    return result[0];
}

async function add({ text, userId, categoryId }) {
    let sql = `INSERT INTO tasks (text, user_id, category_id) VALUES (?,?,?)`;
    let [result] = await db.query(sql, [text, userId, categoryId]);
    return result.insertId;
}

async function remove(taskId, userId) {
    let sql = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql, [taskId, userId]);
    return result;
}

async function update(taskId, userId, dataToUpdate) {
    let fields = [];
    let values = [];

    const mapKeys = {
        text: 'text',
        isDone: 'is_done',
        categoryId: 'category_id'
    };

    for (let key in dataToUpdate) {
        if (mapKeys[key]) {
            fields.push(`${mapKeys[key]} = ?`);
            values.push(dataToUpdate[key]);
        }
    }

    if (fields.length === 0) return 0;

    let sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`;
    values.push(taskId, userId);

    let [result] = await db.query(sql, values);
    return result.affectedRows;
}

module.exports = {
    getAll,
    getOne,
    add,
    remove,
    update
};
