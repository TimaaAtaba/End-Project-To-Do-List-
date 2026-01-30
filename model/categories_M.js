const db = require('../config/db_config');
async function getAll(userId){
    let sql = `SELECT * FROM categorias WHERE user_id = ?`;
    let [rows] = await db.query(sql,[userId]);    
    return rows;
}

async function add({name,userId}){
    let sql = `INSERT INTO categorias (name,user_id) VALUES (?,?)`;
    let [result] = await db.query(sql,[name,userId]); 
    return result.insertId;
}

async function getOne(catId,userId){
    let sql = `SELECT * FROM categorias WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql,[catId,userId]);    
    return result[0];
}

async function remove(catId,userId){
    let sql = `DELETE FROM categorias WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql,[catId,userId]);    
    return result.affectedRows;
}

async function update(catId,userId,newName){
    let sql = `UPDATE categorias SET name = ? WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql,[newName,catId,userId]);    
    return result.affectedRows;
}

module.exports ={
    getAll,
    add,
    getOne,
    remove,
    update
}
