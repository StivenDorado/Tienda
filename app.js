// script.js

// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    // Definición de un array de productos, cada uno con id, nombre, precio e imagen
    const products = [
        { id: 1, name: 'Producto 1', price: 10, image: 'img/Aston Martin.jpg' },
        { id: 2, name: 'Producto 2', price: 20, image: 'img/Audi-R8.jpg' },
        { id: 3, name: 'Producto 3', price: 30, image: 'img/Ferrari.jpg' },
        { id: 4, name: 'Producto 4', price: 40, image: 'img/Porsche.jpg' }
    ];

    // Inicialización de un array vacío para almacenar los productos en el carrito
    const carrito = [];

    // Obtención de referencias a elementos del DOM donde se mostrarán los productos y el carrito
    const productGallery = document.getElementById('product-gallery');
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');

    // Función para renderizar los productos en la galería
    function renderProducts() {
        // Itera sobre cada producto y crea su correspondiente elemento HTML
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product'); // Añade la clase 'product' al div
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} €</p>
                <button data-id="${product.id}">Agregar al carrito</button>
            `;
            // Añade el div del producto a la galería de productos
            productGallery.appendChild(productDiv);
        });
    }

    // Función para renderizar el contenido del carrito
    function rendercarrito() {
        // Limpia el contenido actual del carrito
        carritoItems.innerHTML = '';
        let total = 0;
        // Itera sobre cada ítem del carrito y crea su correspondiente elemento HTML
        carrito.forEach(item => {
            const carritoItem = document.createElement('li');
            carritoItem.textContent = `${item.name} - ${item.price} €`;
            carritoItems.appendChild(carritoItem);
            // Suma el precio del ítem al total
            total += item.price;
        });
        // Actualiza el total en el DOM
        carritoTotal.textContent = total;
    }

    // Función para añadir un producto al carrito
    function addTocarrito(productId) {
        // Encuentra el producto en el array de productos usando su id
        const product = products.find(prod => prod.id === productId);
        // Añade el producto al array del carrito
        carrito.push(product);
        // Renderiza de nuevo el carrito para mostrar los cambios
        rendercarrito();
    }

    // Añade un listener a la galería de productos para detectar clicks en los botones
    productGallery.addEventListener('click', (event) => {
        // Verifica si el elemento clicado es un botón
        if (event.target.tagName === 'BUTTON') {
            // Obtiene el id del producto del atributo data-id del botón
            const productId = parseInt(event.target.getAttribute('data-id'));
            // Añade el producto al carrito
            addTocarrito(productId);
        }
    });

    // Renderiza los productos al cargar la página
    renderProducts();
});
