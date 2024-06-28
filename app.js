document.addEventListener('DOMContentLoaded', () => {
    // Definición de un array de productos, cada uno con id, nombre, precio e imagen
    const products = [
        { id: 1, name: 'Aston Martin', price: 10.000, image: 'img/Aston Martin.jpg' },
        { id: 2, name: 'Audi R8', price: 20.000, image: 'img/Audi-R8.jpg' },
        { id: 3, name: 'Ferrari Enzo', price: 30.000, image: 'img/Ferrari.jpg' },
        { id: 4, name: 'Porsche GTR3', price: 40.000, image: 'img/Porsche.jpg' }
    ];

    // Inicialización de un array vacío para almacenar los productos en el carrito
    const carrito = [];

    // Obtención de referencias a elementos del DOM donde se mostrarán los productos y el carrito
    const productGallery = document.getElementById('product-gallery');
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); // Referencia al botón "Vaciar carrito"
    const aplicarDescuentoBtn = document.getElementById('aplicar-descuento'); // Referencia al botón "Aplicar descuento"

    // Función para renderizar los productos en la galería
    function renderProducts() {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toFixed(3)} $</p>   
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
            carritoItem.textContent = `${item.name} - ${item.price.toFixed(3)} $`;
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
        
        carritoTotal.textContent = total.toFixed(3) + ' $'; 
    }

    // Función para aplicar un descuento del 50% al total
    function applyDiscount() {
        let total = 0;
        carrito.forEach(item => {
            total += item.price; 
        });
        const descuentoTotal = (total * 0.5).toFixed(3); 
        carritoTotal.textContent = `${descuentoTotal} $`; // Muestra el total con descuento
    }

    // Listener para el botón "Aplicar descuento"
    aplicarDescuentoBtn.addEventListener('click', applyDiscount);

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
