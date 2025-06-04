async function fetchProducts() {
    try {
        const response = await fetch('/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        const tableBody = document.getElementById('product-table-body');
        tableBody.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border p-2">${product.id}</td>
                <td class="border p-2">${product.name}</td>
                <td class="border p-2">$${product.price.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to load products');
    }
}

async function addProduct() {
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);

    if (!name || isNaN(price)) {
        alert('Please enter a valid name and price');
        return;
    }

    try {
        const response = await fetch('/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add product');
        }

        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        fetchProducts();
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Error: ' + error.message);
    }
}

window.onload = fetchProducts;