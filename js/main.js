// js/main.js

// Datos base
const productos = [
    { id: 1, nombre: "Tapiz Andino", precio: 120 },
    { id: 2, nombre: "Bolso Artesanal", precio: 80 },
    { id: 3, nombre: "Cojín Decorativo", precio: 60 },
    { id: 4, nombre: "Camino de Mesa", precio: 100 },
];

let carrito = [];

// Referencias a elementos del DOM
const productosContainer = document.getElementById('productos-container');
const carritoContainer = document.getElementById('carrito-container');
const totalPagarSpan = document.getElementById('total-pagar');
const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
const carritoVacioMensaje = document.getElementById('carrito-vacio-mensaje');

// --- Funciones del Simulador ---

// Cargar carrito desde LocalStorage al inicio
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carritoOncebay');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarritoDOM();
    }
}

// Guardar carrito en LocalStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carritoOncebay', JSON.stringify(carrito));
}

// Mostrar productos disponibles en el DOM
function mostrarProductos() {
    productosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('col-md-3', 'mb-3'); // Clases de Bootstrap para diseño responsivo
        productoCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text flex-grow-1">Precio: S/ ${producto.precio.toFixed(2)}</p>
                    <button class="btn btn-primary btn-sm mt-auto agregar-btn" data-id="${producto.id}">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productosContainer.appendChild(productoCard);
    });

    // Añadir event listeners a los botones de "Agregar al Carrito"
    document.querySelectorAll('.agregar-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productoId = parseInt(event.target.dataset.id);
            const productoSeleccionado = productos.find(p => p.id === productoId);
            if (productoSeleccionado) {
                agregarProductoAlCarrito(productoSeleccionado);
            }
        });
    });
}

// Agregar producto al carrito y actualizar el DOM
function agregarProductoAlCarrito(producto) {
    carrito.push(producto);
    guardarCarritoEnLocalStorage(); // Guardar cada vez que se agrega un producto
    actualizarCarritoDOM();
}

// Eliminar producto del carrito y actualizar el DOM
function eliminarProductoDelCarrito(productoId) {
    const index = carrito.findIndex(producto => producto.id === productoId);
    if (index !== -1) {
        carrito.splice(index, 1);
        guardarCarritoEnLocalStorage();
        actualizarCarritoDOM();
    }
}

// Actualizar la vista del carrito y el total en el DOM
function actualizarCarritoDOM() {
    carritoContainer.innerHTML = ''; // Limpiar el carrito antes de actualizar
    let total = 0;

    if (carrito.length === 0) {
        carritoVacioMensaje.style.display = 'block'; // Mostrar mensaje de carrito vacío
        finalizarCompraBtn.disabled = true;
    } else {
        carritoVacioMensaje.style.display = 'none'; // Ocultar mensaje
        finalizarCompraBtn.disabled = false;
        carrito.forEach(producto => {
            const itemCarrito = document.createElement('div');
            itemCarrito.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'border-bottom', 'pb-2');
            itemCarrito.innerHTML = `
                <span>${producto.nombre} - S/ ${producto.precio.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm eliminar-btn" data-id="${producto.id}">Eliminar</button>
            `;
            carritoContainer.appendChild(itemCarrito);
            total += producto.precio;
        });

        // Añadir event listeners a los botones de "Eliminar"
        document.querySelectorAll('.eliminar-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productoId = parseInt(event.target.dataset.id);
                eliminarProductoDelCarrito(productoId);
            });
        });
    }
    totalPagarSpan.textContent = total.toFixed(2);
}

// Finalizar la compra
function finalizarCompra() {
    if (carrito.length > 0) {
        alert(`¡Compra finalizada! Has adquirido ${carrito.length} productos por un total de S/ ${totalPagarSpan.textContent}. ¡Gracias por tu compra!`);
        carrito = []; // Vaciar el carrito
        guardarCarritoEnLocalStorage(); // Guardar el carrito vacío
        actualizarCarritoDOM(); // Actualizar la vista del carrito
    } else {
        alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
    }
}

// --- Event Listeners Globales ---
finalizarCompraBtn.addEventListener('click', finalizarCompra);

// --- Inicialización del Simulador ---
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage();
    mostrarProductos();
});