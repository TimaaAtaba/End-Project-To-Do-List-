const db = require('../config/db_config');

async function getAll(){
    let sql = `SELECT id, name, Email FROM users`; 
    let [rows] = await db.query(sql);    
    return rows;
}
async function getOne(id){
    let sql = `SELECT id, name, Email FROM users WHERE id = ?`;
    let [result] = await db.query(sql, [id]);    
    return result[0];
}

async function remove(id){
    let sql = `DELETE FROM users WHERE id = ?`;
    let [result] = await db.query(sql, [id]);    
    return result.affectedRows;
}

async function update(id, user){
    let keys = Object.keys(user);
    let values = Object.values(user);
    let set = keys.map(k => `${k}=?`).join(',');
    let sql = `UPDATE users SET ${set} WHERE id = ?`;
    let [result] = await db.query(sql, [...values, id]);    
    return result.affectedRows;
}

async function getByUserName(userName){
    let sql = `SELECT * FROM users WHERE Uesername = ?`; 
    let [result] = await db.query(sql, [userName]); 
    return result[0];
}

async function getByEmail(email){
    let sql = `SELECT * FROM users WHERE Email = ?`; 
    let [result] = await db.query(sql, [email]); 
    return result[0];
}

async function addUser({name, email, userName, pass}){
    let sql = `INSERT INTO users (name, Email, Uesername, Pasw) VALUES (?,?,?,?)`;
    let [result] = await db.query(sql, [name, email, userName, pass]); 
    return result.insertId;
}

module.exports = {
    getAll,
    getOne,
    remove,
    update,
    getByUserName,
    getByEmail,
    addUser
}
