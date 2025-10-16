const form = document.getElementById('form');
const list = document.getElementById('list');
const cancelBtn = document.getElementById('cancel-btn');

const apiUrl = 'http://localhost:3000/products';

let editingId = null;

function loadProducts() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            list.innerHTML = '';
            data.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <b>${product.name}</b> - ${product.category} - ${product.price} $ - ${product.stock} pcs
                    </div>
                    <div>
                        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                        <button class="edit-btn" onclick="editProduct(${product.id}, '${product.name}', ${product.price}, '${product.category}', ${product.stock})">Edit</button>
                    </div>
                `;
                list.appendChild(li);
            });
        });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const product = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value,
        stock: parseInt(document.getElementById('stock').value)
    };

    if (editingId) {
        fetch(`${apiUrl}/${editingId}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(product)
        }).then(() => {
            resetForm();
            loadProducts();
        });
    } else {
        fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(product)
        }).then(() => {
            form.reset();
            loadProducts();
        });
    }
});

function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    fetch(`${apiUrl}/${id}`, {method: 'DELETE'})
        .then(() => loadProducts());
}

function editProduct(id, name, price, category, stock) {
    editingId = id;
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('category').value = category;
    document.getElementById('stock').value = stock;
    cancelBtn.style.display = 'inline-block';
}

cancelBtn.addEventListener('click', () => {
    resetForm();
});

function resetForm() {
    editingId = null;
    form.reset();
    cancelBtn.style.display = 'none';
}

loadProducts();

