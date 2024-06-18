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
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); // Referencia al botón "Vaciar carrito"

    // Función para renderizar los productos en la galería
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

    // Función para renderizar el contenido del carrito
    function rendercarrito() {
        carritoItems.innerHTML = '';
        let total = 0;
        carrito.forEach(item => {
            const carritoItem = document.createElement('li');
            carritoItem.textContent = `${item.name} - ${item.price} €`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('productdelete');
            deleteButton.addEventListener('click', () => {
                removeFromCarrito(item.id);
            });
            carritoItem.appendChild(deleteButton);
            carritoItems.appendChild(carritoItem);
            total += item.price;
        });
        carritoTotal.textContent = total;
    }

    // Función para añadir un producto al carrito
    function addTocarrito(productId) {
        const product = products.find(prod => prod.id === productId);
        carrito.push(product);
        rendercarrito();
    }

    // Función para eliminar un producto del carrito
    function removeFromCarrito(productId) {
        const index = carrito.findIndex(item => item.id === productId);
        if (index !== -1) {
            carrito.splice(index, 1);
        }
        rendercarrito();
    }

    // Función para vaciar completamente el carrito
    function vaciarCarrito() {
        carrito.length = 0; // Vacía el array 'carrito'
        rendercarrito(); // Vuelve a renderizar el carrito para mostrar que está vacío
    }

    // Listener para el botón "Vaciar carrito"
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Listener para agregar productos al carrito desde la galería
    productGallery.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addTocarrito(productId);
        }
    });

    // Renderiza los productos en la galería al cargar la página
    renderProducts();
});
