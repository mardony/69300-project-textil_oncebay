// js/cart.js

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

const carritoItemsContainer = document.getElementById('carrito-items-container');
const totalPagarSpan = document.getElementById('total-pagar');
const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
const carritoVacioMensaje = document.getElementById('carrito-vacio-mensaje');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito-btn');

// --- Funciones de Utilidad (compartidas por necesidad en este esquema) ---
function getCarritoFromLocalStorage() {
    const carritoGuardado = localStorage.getItem('carritoOncebay');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function saveCarritoToLocalStorage(carrito) {
    localStorage.setItem('carritoOncebay', JSON.stringify(carrito));
}

// --- Funciones específicas de cart.html ---
function updateCartDisplay() {
    let carrito = getCarritoFromLocalStorage();
    carritoItemsContainer.innerHTML = ''; // Limpiar los elementos existentes del carrito
    let total = 0;

    if (carrito.length === 0) {
        carritoVacioMensaje.style.display = 'block'; // Mostrar mensaje de carrito vacío
        finalizarCompraBtn.disabled = true;
        vaciarCarritoBtn.disabled = true;
    } else {
        carritoVacioMensaje.style.display = 'none'; // Ocultar mensaje de carrito vacío
        finalizarCompraBtn.disabled = false;
        vaciarCarritoBtn.disabled = false;

        // Agrupar elementos por ID para mostrar la cantidad
        const groupedCart = carrito.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = { ...item, quantity: 0 };
            }
            acc[item.id].quantity++;
            return acc;
        }, {});

        Object.values(groupedCart).forEach(item => {
            const product = productos.find(p => p.id === item.id); // Obtener detalles completos del producto para la imagen
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('d-flex', 'align-items-center', 'mb-3', 'border-bottom', 'pb-3');
            cartItemDiv.innerHTML = `
                <img src="${product ? product.imagen : 'https://via.placeholder.com/60'}" alt="${item.nombre}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px; border-radius: 5px;">
                <div class="flex-grow-1">
                    <h6 class="mb-0">${item.nombre}</h6>
                    <small class="text-muted">Cantidad: ${item.quantity} x S/ ${item.precio.toFixed(2)}</small>
                </div>
                <span class="fw-bold me-3">S/ ${(item.quantity * item.precio).toFixed(2)}</span>
                <button class="btn btn-danger btn-sm eliminar-btn" data-id="${item.id}">Eliminar</button>
            `;
            carritoItemsContainer.appendChild(cartItemDiv);
            total += (item.quantity * item.precio);
        });

        // Añadir event listeners a los botones de "Eliminar"
        document.querySelectorAll('.eliminar-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.id);
                removeFromCart(productId);
            });
        });
    }
    totalPagarSpan.textContent = total.toFixed(2);
}

function removeFromCart(productIdToRemove) {
    let carrito = getCarritoFromLocalStorage();
    // Encontrar la primera ocurrencia del producto y eliminarla
    const indexToRemove = carrito.findIndex(item => item.id === productIdToRemove);
    if (indexToRemove !== -1) {
        carrito.splice(indexToRemove, 1);
        saveCarritoToLocalStorage(carrito);
        updateCartDisplay();
    }
}

function finalizePurchase() {
    let carrito = getCarritoFromLocalStorage();
    if (carrito.length > 0) {
        alert(`¡Compra finalizada! Has adquirido ${carrito.length} productos por un total de S/ ${totalPagarSpan.textContent}. ¡Gracias por tu compra!`);
        localStorage.removeItem('carritoOncebay'); // Vaciar el carrito de localStorage
        updateCartDisplay(); // Actualizar la vista para mostrar el carrito vacío
    } else {
        alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
    }
}

function clearCart() {
    if (confirm("¿Estás seguro de que quieres vaciar todo el carrito?")) {
        localStorage.removeItem('carritoOncebay');
        updateCartDisplay();
        alert("Tu carrito ha sido vaciado.");
    }
}

// --- Event Listeners ---
finalizarCompraBtn.addEventListener('click', finalizePurchase);
vaciarCarritoBtn.addEventListener('click', clearCart);

// --- Inicialización del Simulador ---
document.addEventListener('DOMContentLoaded', updateCartDisplay);