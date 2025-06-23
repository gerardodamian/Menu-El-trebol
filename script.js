let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderMenu(categoria = "all") {
    const contenedor = document.getElementById("menuContainer");
    contenedor.innerHTML = "";
    const filtrado =
        categoria === "all"
            ? menuData
            : menuData.filter((p) => p.categoria === categoria);
    filtrado.forEach((plato) => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 mb-4";
        col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${plato.imagen}" class="card-img-top producto-img" alt="${plato.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${plato.nombre}</h5>
          <p class="card-text mb-1 text-muted">${plato.descripcion}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <strong>$${plato.precio}</strong>
            <button class="btn btn-sm btn-success" onclick="agregarAlCarrito(${plato.id})">
              <i class="bi bi-plus-circle"></i> Agregar
            </button>
          </div>
        </div>
      </div>`;
        contenedor.appendChild(col);
    });
}

function agregarAlCarrito(id) {
    const producto = menuData.find((p) => p.id === id);
    const existente = carrito.find((p) => p.id === id);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

function mostrarCarrito() {
    const lista = document.getElementById("carritoLista");
    lista.innerHTML = "";
    if (carrito.length === 0) {
        lista.innerHTML =
            '<li class="list-group-item text-center">El carrito está vacío.</li>';
    } else {
        carrito.forEach((p, i) => {
            const li = document.createElement("li");
            li.className =
                "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
        <div>
          <strong>${p.nombre}</strong><br>
          Cantidad: 
          <input type="number" min="1" value="${p.cantidad}" onchange="cambiarCantidad(${i}, this.value)" style="width:60px;">
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="quitarDelCarrito(${i})"><i class="bi bi-trash"></i></button>
      `;
            lista.appendChild(li);
        });
    }
    new bootstrap.Modal(document.getElementById("carritoModal")).show();

    document.getElementById("mozo").value = localStorage.getItem("mozo") || "";
    document.getElementById("mesa").value = localStorage.getItem("mesa") || "";

}

function cambiarCantidad(index, nuevaCantidad) {
    const cantidad = parseInt(nuevaCantidad);
    if (cantidad > 0) {
        carrito[index].cantidad = cantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    actualizarContador();
}

function quitarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    mostrarCarrito();
}

function actualizarContador() {
    document.getElementById("cartCount").innerText = carrito.reduce(
        (sum, p) => sum + p.cantidad,
        0
    );
}

function enviarPedido() {
    const mozo = document.getElementById("mozo").value.trim();
    const mesa = document.getElementById("mesa").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (!mozo || !mesa || carrito.length === 0) {
        alert("Faltan datos o el pedido está vacío.");
        return;
    }

    let mensaje = `*Pedido para cocina - El Trébol*%0A🧍 Mozo: ${mozo}%0A🪑 Mesa: ${mesa}%0A🍽 Detalle:%0A`;
    carrito.forEach((p) => {
        mensaje += `• ${p.nombre} x${p.cantidad}%0A`;
    });
    if (comentario) mensaje += `💬 Comentario: ${comentario}%0A`;

    const numero = "5493517181975";
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    localStorage.removeItem("carrito");
    carrito = [];
    actualizarContador();
    window.open(url, "_blank");
    const modal = bootstrap.Modal.getInstance(
        document.getElementById("carritoModal")
    );
    if (modal) modal.hide();

    localStorage.setItem("mozo", mozo);
    localStorage.setItem("mesa", mesa);

}

document.querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", function () {
        document
            .querySelectorAll("[data-cat]")
            .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        renderMenu(this.dataset.cat);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    renderMenu();
});

function vaciarCarrito() {
    if (confirm("¿Estás seguro de que querés vaciar el pedido?")) {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarContador();
        mostrarCarrito();
    }
}
  