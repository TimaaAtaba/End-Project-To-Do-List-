// English Version - categories.js
let greeting = "Hello " + (localStorage.getItem('name') || "Timaa");
document.getElementById('greating').innerHTML = greeting;

async function getCategories() {
    try {
        let res = await fetch('/categories');
        if (res.status == 401) { window.location.href = '/login'; return; }
        let data = await res.json();
        
        // Fix: Ensure we use the exact keys from your DB (id, name)
        let categories = Array.isArray(data) ? data : [];
        let txt = "";
        for (let c of categories) {
            txt += `<tr>
                <td>${c.name}</td>
                <td><button onclick="deleteCategory(${c.id})">Delete 🗑️</button></td>
                <td><button onclick="categoryToEdit(${c.id})">Edit ✏️</button></td>
            </tr>`;
        }
        document.getElementById('categoriesTable').innerHTML = txt;
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

async function addCategory() {
    let Name = document.getElementById('name').value.trim();
    if (!Name) { alert("Please enter a name"); return; }

    let res = await fetch('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name }) // Sending 'Name' to match Controller
    });

    if (res.ok) {
        document.getElementById('name').value = ""; // Clear input
        await getCategories(); // Refresh table
    } else {
        alert("Failed to add category. Check server console.");
    }
}
// Run on load
getCategories();