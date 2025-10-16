const form = document.getElementById('form');
const list = document.getElementById('list');

const apiUrl = 'http://localhost:3000/products';

// Загрузка всех продуктов
function loadProducts() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            list.innerHTML = '';
            data.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <b>${product.name}</b> - ${product.category} - ${product.price} zł - ${product.stock} szt.
                    <button onclick="deleteProduct(${product.id})">Usuń</button>
                    <button onclick="editProduct(${product.id}, '${product.name}', ${product.price}, '${product.category}', ${product.stock})">Edytuj</button>
                `;
                list.appendChild(li);
            });
        });
}

// Добавление продукта
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const product = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value,
        stock: parseInt(document.getElementById('stock').value)
    };
    fetch(apiUrl, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(product)
    })
    .then(() => {
        form.reset();
        loadProducts();
    });
});

// Удаление продукта
function deleteProduct(id) {
    fetch(`${apiUrl}/${id}`, {method: 'DELETE'})
        .then(() => loadProducts());
}

// Редактирование продукта
function editProduct(id, name, price, category, stock) {
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('category').value = category;
    document.getElementById('stock').value = stock;
    
    form.onsubmit = function(e) {
        e.preventDefault();
        const updatedProduct = {
            name: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            category: document.getElementById('category').value,
            stock: parseInt(document.getElementById('stock').value)
        };
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(updatedProduct)
        })
        .then(() => {
            form.reset();
            form.onsubmit = addProductHandler;
            loadProducts();
        });
    };
}

const addProductHandler = form.onsubmit;
loadProducts();
