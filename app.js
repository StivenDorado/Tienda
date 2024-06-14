// script.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Producto 1', price: 10, image: 'img/Aston Martin.jpg' },
        { id: 2, name: 'Producto 2', price: 20, image: 'img/Audi-R8.jpg' },
        { id: 3, name: 'Producto 3', price: 30, image: 'img/Ferrari.jpg' },
        { id: 4, name: 'Producto 4', price: 40, image: 'img/Porsche.jpg' }
    ];

    const carrito = [];

    const productGallery = document.getElementById('product-gallery');
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');

    function renderProducts() {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} €</p>
                <button data-id="${product.id}">Agregar al carrito</button>
            `;
            productGallery.appendChild(productDiv);
        });
    }

    function rendercarrito() {
        carritoItems.innerHTML = '';
        let total = 0;
        carrito.forEach(item => {
            const carritoItem = document.createElement('li');
            carritoItem.textContent = `${item.name} - ${item.price} €`;
            carritoItems.appendChild(carritoItem);
            total += item.price;
        });
        carritoTotal.textContent = total;
    }

    function addTocarrito(productId) {
        const product = products.find(prod => prod.id === productId);
        carrito.push(product);
        rendercarrito();
    }

    productGallery.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addTocarrito(productId);
        }
    });

    renderProducts();
});
