// js/main.js

// Product data (shared across both JS files for simplicity)
const productos = [
    { id: 1, nombre: "Tapiz Andino", precio: 120, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747888978/7a0a66cee77c9c2aedc7fcd2486ad010_yjesrx.jpg", descripcion: "Hermoso tapiz hecho a mano con diseños andinos tradicionales." },
    { id: 2, nombre: "Bolso Artesanal", precio: 80, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747888995/9078253879b1c3ecc1a8238be9fa0485_abraaf.jpg", descripcion: "Bolso único, tejido con fibras naturales y detalles coloridos." },
    { id: 3, nombre: "Cojín Decorativo", precio: 60, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747889041/8f8b4f73e00f17189d0a8b76b5172fef_xynxrb.jpg", descripcion: "Cojín bordado a mano para darle un toque étnico a tu hogar." },
    { id: 4, nombre: "Camino de Mesa", precio: 100, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747888956/5b1ce2d4b51311600095d38d0e0d587e_oqryes.jpg", descripcion: "Elegante camino de mesa con patrones geométricos." },
    { id: 5, nombre: "Manta Alpaca", precio: 250, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747888923/4cbbad2843f272fe32fbeb8abe166c04_jpqfd9.jpg", descripcion: "Manta suave de lana de alpaca, ideal para el frío." },
    { id: 6, nombre: "Muñeca de Tela", precio: 35, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747888860/d48a71a6dc467750ffea8b387065fc69_udks7l.jpg", descripcion: "Muñeca artesanal de tela, vestida con trajes típicos." },
    { id: 7, nombre: "Juego de Posavasos", precio: 45, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747888838/bf5520df02e174b3ddeaa379c31d223d_exhiwo.jpg", descripcion: "Set de posavasos tejidos, decorativos y funcionales." },
    { id: 8, nombre: "Chal de Lana", precio: 95, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747888803/1e388d365f4b60ce3c0f0670708ce682_m5fm6r.jpg", descripcion: "Chal ligero y cálido, perfecto para cualquier ocasión." },
    { id: 9, nombre: "Joyero de Madera", precio: 70, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747888758/96a2d540a082e260f3951a6e3dd9c2cc_jvgpus.jpg", descripcion: "Joyero tallado en madera, con diseños inspirados en la naturaleza." },
    { id: 10, nombre: "Máscara Ceremonial", precio: 180, imagen: "https://res.cloudinary.com/dyfyvybx4/image/upload/v1747888737/688a9662651d247c8e509f7027f41040_p71bud.jpg", descripcion: "Réplica de máscara ceremonial andina, pieza de colección." }
];

const productosContainer = document.getElementById('productos-container');
const cartItemCountSpan = document.getElementById('cart-item-count');

// --- Funciones de Utilidad (compartidas por necesidad en este esquema) ---
function getCarritoFromLocalStorage() {
    const carritoGuardado = localStorage.getItem('carritoOncebay');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function saveCarritoToLocalStorage(carrito) {
    localStorage.setItem('carritoOncebay', JSON.stringify(carrito));
}

function updateCartCountDisplay() {
    const carrito = getCarritoFromLocalStorage();
    cartItemCountSpan.textContent = carrito.length;
}

// --- Funciones específicas de index.html ---
function mostrarProductos() {
    productosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4'); // Clases de Bootstrap para diseño responsivo
        productCard.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text fw-bold mt-auto">S/ ${producto.precio.toFixed(2)}</p>
                    <button class="btn btn-primary agregar-btn" data-id="${producto.id}">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productosContainer.appendChild(productCard);
    });

    // Añadir event listeners a los botones de "Agregar al Carrito"
    document.querySelectorAll('.agregar-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            const productToAdd = productos.find(p => p.id === productId);
            if (productToAdd) {
                addToCart(productToAdd);
            }
        });
    });
}

function addToCart(product) {
    let carrito = getCarritoFromLocalStorage();
    carrito.push(product); // Agregamos el objeto completo del producto
    saveCarritoToLocalStorage(carrito);
    updateCartCountDisplay();
    // Opcional: Proporcionar feedback visual, por ejemplo, una pequeña notificación
    alert(`"${product.nombre}" ha sido agregado al carrito.`);
}

// --- Inicialización del Simulador ---
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    updateCartCountDisplay(); // Actualizar el contador del carrito al cargar la página
});