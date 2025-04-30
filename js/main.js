// Datos base
const productos = [
    { nombre: "Tapiz Andino", precio: 120 },
    { nombre: "Bolso Artesanal", precio: 80 },
    { nombre: "Cojín Decorativo", precio: 60 },
    { nombre: "Camino de Mesa", precio: 100 },
];

let carrito = [];

// Mostrar productos
function mostrarProductos() {
    console.log("Lista de productos disponibles:");
    productos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - S/ ${producto.precio}`);
    });
}

// Agregar productos al carrito
function agregarProducto() {
    let continuar = true;
    while (continuar) {
        mostrarProductos();
        let seleccion = prompt("Escribe el número del producto que deseas agregar al carrito:");
        let indice = parseInt(seleccion) - 1;

        if (indice >= 0 && indice < productos.length) {
            carrito.push(productos[indice]);
            alert(`✅ ${productos[indice].nombre} fue agregado al carrito.`);
        } else {
            alert("❌ Selección inválida. Intenta nuevamente.");
        }

        continuar = confirm("¿Deseas agregar otro producto?");
    }
}

// Calcular total
function calcularTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio;
    });

    if (carrito.length > 0) {
        alert(`🛍️ Compraste ${carrito.length} productos.\nTotal a pagar: S/ ${total}`);
    } else {
        alert("Tu carrito está vacío.");
    }
}

// Iniciar simulador
function iniciarSimulador() {
    alert("Bienvenido a Textil Oncebay 🧶");
    agregarProducto();
    calcularTotal();
    alert("¡Gracias por tu visita! 👋");
}

// Ejecutar
iniciarSimulador();
