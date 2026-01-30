const { getAll, add, remove, getOne, update } = require('../model/categories_M');

async function getAllCategories(req, res) { 
try { 
if (!req.user || !req.user.id) { 
return res.status(401).json({ message: "You are not authorized to access" }); 
} 
let Categories = await getAll(req.user.id); 
res.status(200).json(Categories || []); 
} catch (err) { 
console.error("Error in getAllCategories:", err); 
res.status(500).json({ message: "Server error" }); 
}
}

async function addCategory(req, res) { 
try { 
const name = req.body.Name; 
const userId = req.user.id; 
let CategoryId = await add({ name, userId }); 
res.status(201).json({ message: "נוסף בהצלחה", id: CategoryId }); 
} catch (err) { 
console.error("Error in addCategory:", err); 
res.status(500).json({ message: "Server error" }); 
}
}

async function getCategory(req, res) { 
try { 
let Category = await getOne(req.params.id, req.user.id); 
if (!Category) { 
return res.status(404).json({ message: "Category not found" }); 
} 
res.status(200).json(Category); 
} catch (err) { 
console.error("Error in getCategory:", err); 
res.status(500).json({ message: "Server error" }); 
}
}

async function deleteCategory(req, res) { 
try { 
let id = req.params.id; 
let affectedRows = await remove(id, req.user.id); 
if (affectedRows === 0) return res.status(404).json({ message: "Category not found" }); 
res.status(200).json({ message: "נמחק בהצלחה" }); 
} catch (err) { 
console.error("Error in deleteCategory:", err); 
res.status(500).json({ message: "Server error" }); 
}
}

async function updateCategory(req, res) { 
try { 
let catId = req.params.id; 
let userId = req.user.id; 
let newName = req.body.Name; 
let affectedRows = await update(catId, userId, newName); 
if (!affectedRows) { 
return res.status(404).json({ message: `Category ${catId} not found!` }); 
} 
res.status(200).json({ message: "Updated!" }); 
} catch (err) { 
console.error("Error in updateCategory:", err); 
res.status(500).json({ message: "Server error" }); 
}
}

module.exports = { 
getAllCategories, 
addCategory, 
deleteCategory, 
getCategory, 
updateCategory
};
