let greating = "Hello ";
greating += localStorage.getItem('name');
document.getElementById('greating').innerHTML = greating;

let allCategories = [];
let allTasks = [];

async function getCategories() {
    try {
        let response = await fetch('/categories');
        if (response.status == 401) {
            window.location.href = '/login';
            return;
        }
        let data = await response.json();
        if (response.status == 400) {
            alert(data.message);
            return;
        }
        allCategories = data;
        createSelect(allCategories);
    } catch (err) {
        alert(err);
    }
}

function createSelect(data) {
    let txt = `<option value="0">All</option>`;
    for (let obj of data) {
        if (obj) {
            txt += `<option value="${obj.id}">${obj.Name}</option>`;
        }
    }
    document.getElementById('mySelect').innerHTML = txt;
}

async function getTasks() {
    try {
        let response = await fetch('/tasks');
        if (response.status == 401) {
            window.location.href = '/login';
            return;
        }
        if (response.status == 400) {
            let data = await response.json();
            alert(data.message);
            return;
        }
        let data = await response.json();
        allTasks = data;
        createTable(data);
    } catch (err) {
        alert(err);
    }
}

function createTable(data) {
    let txt = "";
    for (let obj of data) {
        if (obj) {
            let isChecked = obj.isDone ? "checked" : "";
            let rowClass = obj.isDone ? "class='rowClass'" : "";
            let cat = allCategories.find(c => c && c.id == obj.CategoryID);
            let catName = cat ? cat.Name : '--';
            txt += `<tr ${rowClass}>`;
            txt += `<td><input type="checkbox" ${isChecked} onchange="taskDone(${obj.id},this)"></td>`;
            txt += `<td>${obj.text}</td>`;
            txt += `<td>${catName}</td>`;
            txt += `<td><button onclick="deleteTask(${obj.id})">🗑️</button></td>`;
            txt += `<td><button onclick="taskToEdit(${obj.id})">✏️</button></td>`;
            txt += "</tr>";
        }
    }
    document.getElementById('myTable').innerHTML = txt;
}

function sortTable() {
    let val = document.getElementById('mySelect').value;
    if (val == 0) {
        createTable(allTasks);
    } else {
        let sorted = allTasks.filter(task => task.CategoryID == val);
        createTable(sorted);
    }
}

async function addTask() {
    try {
        let text = document.getElementById('text').value;
        if (!text.trim()) return;
        let catId = document.getElementById('mySelect').value;
        if (catId == 0) catId = null;

        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, CategoryID: catId })
        });

        let response = await fetch('/tasks');
        allTasks = await response.json();
        sortTable();
        document.getElementById('text').value = "";
    } catch (err) {
        alert(err);
    }
}

async function editTask(id) {
    try {
        let text = document.getElementById('text').value;
        let catId = document.getElementById('mySelect').value;
        if (catId == 0) catId = null;

        await fetch(`/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, CategoryID: catId })
        });

        let response = await fetch('/tasks');
        allTasks = await response.json();
        sortTable();
        document.getElementById('text').value = "";
    } catch (err) {
        alert(err);
    }
}

async function taskDone(id, elm) {
    let isDone = elm.checked;
    try {
        await fetch(`/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone })
        });

        let task = allTasks.find(t => t.id == id);
        if (task) task.isDone = isDone;

        sortTable();
    } catch (err) {
        alert(err);
    }
}


async function deleteTask(id) {
    try {
        await fetch(`/tasks/${id}`, { method: 'DELETE' });
        let response = await fetch('/tasks');
        allTasks = await response.json();
        sortTable();
    } catch (err) {
        alert(err);
    }
}

async function taskToEdit(id) {
    try {
        let response = await fetch(`/tasks/${id}`);
        let data = await response.json();
        if (!response.ok) {
            alert(data.message);
        } else {
            document.getElementById('id').value = data.id;
            document.getElementById('text').value = data.text;
            document.getElementById('mySelect').value = data.CategoryID || 0;
        }
    } catch (err) {
        alert(err);
    }
}

function addOrEdit() {
    let id = document.getElementById('id').value;
    if (id) {
        editTask(id);
    } else {
        addTask();
    }
}

async function init() {
    await getCategories();
    await getTasks();
}
init();