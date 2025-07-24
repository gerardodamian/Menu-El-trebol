let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let pedidoEditandoIndex = null; // Variable para trackear si estamos editando un pedido

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
    console.log("Mostrando carrito con items:", carrito); // Debug
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
    
    // Actualizar los botones del modal según si estamos editando o no
    actualizarBotonesModal();
    
    new bootstrap.Modal(document.getElementById("carritoModal")).show();

    document.getElementById("mozo").value = localStorage.getItem("mozo") || "";
    document.getElementById("mesa").value = localStorage.getItem("mesa") || "";

}

function actualizarBotonesModal() {
    const modalFooter = document.querySelector("#carritoModal .modal-footer");
    
    if (pedidoEditandoIndex !== null) {
        // Estamos editando un pedido existente
        modalFooter.innerHTML = `
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal" onclick="cancelarEdicion()">Cancelar</button>
            <button class="btn btn-primary" onclick="actualizarPedido()">Actualizar Pedido</button>
            <button class="btn btn-warning" onclick="guardarComoNuevo()">Guardar Como Nuevo</button>
            <button class="btn btn-success" onclick="enviarPedido()">Enviar por WhatsApp</button>
            <button class="btn btn-danger me-auto" onclick="vaciarCarrito()">Vaciar Pedido</button>
        `;
    } else {
        // Pedido nuevo
        modalFooter.innerHTML = `
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-warning" onclick="guardarPedido()">Guardar Pedido</button>
            <button class="btn btn-success" onclick="enviarPedido()">Enviar por WhatsApp</button>
            <button class="btn btn-danger me-auto" onclick="vaciarCarrito()">Vaciar Pedido</button>
        `;
    }
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
    // Resetear estado de edición al cargar la página
    pedidoEditandoIndex = null;
    actualizarContador();
    renderMenu();
});

function vaciarCarrito() {
    if (confirm("¿Estás seguro de que querés vaciar el pedido?")) {
        carrito = [];
        localStorage.removeItem("carrito");
        pedidoEditandoIndex = null; // Resetear estado de edición
        actualizarContador();
        mostrarCarrito();
    }
}

// Funciones para gestionar pedidos guardados
function limpiarModales() {
    // Remover cualquier backdrop que pueda quedar
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    
    // Restaurar el estado del body
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.style.marginRight = '';
}

function reinicializarCarrito() {
    // Función para limpiar completamente el carrito
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarContador();
    console.log("Carrito reinicializado:", carrito); // Debug
}

function guardarPedido() {
    const mozo = document.getElementById("mozo").value.trim();
    const mesa = document.getElementById("mesa").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (!mozo || !mesa || carrito.length === 0) {
        alert("Faltan datos o el pedido está vacío.");
        return;
    }

    const pedido = {
        id: Date.now(),
        fecha: new Date().toLocaleString('es-AR'),
        mozo: mozo,
        mesa: mesa,
        comentario: comentario,
        items: [...carrito],
        total: carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0)
    };

    let pedidosGuardados = JSON.parse(localStorage.getItem("pedidosGuardados")) || [];
    pedidosGuardados.push(pedido);
    localStorage.setItem("pedidosGuardados", JSON.stringify(pedidosGuardados));

    alert("Pedido guardado exitosamente");
    
    // Resetear estado de edición
    pedidoEditandoIndex = null;
    
    // Vaciar el carrito después de guardar para empezar un nuevo pedido
    reinicializarCarrito();
    
    // Limpiar TODOS los campos del formulario para el nuevo pedido
    document.getElementById("mozo").value = "";
    document.getElementById("mesa").value = "";
    document.getElementById("comentario").value = "";
    
    // Cerrar modal de manera más segura
    const modal = bootstrap.Modal.getInstance(document.getElementById("carritoModal"));
    if (modal) {
        modal.hide();
    }
    
    // Limpiar cualquier residuo de modal
    setTimeout(() => {
        limpiarModales();
    }, 300);
}

function actualizarPedido() {
    const mozo = document.getElementById("mozo").value.trim();
    const mesa = document.getElementById("mesa").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (!mozo || !mesa || carrito.length === 0) {
        alert("Faltan datos o el pedido está vacío.");
        return;
    }

    if (pedidoEditandoIndex === null) {
        alert("Error: No hay pedido en edición.");
        return;
    }

    const pedidoActualizado = {
        id: Date.now(), // Nuevo ID para indicar que fue actualizado
        fecha: new Date().toLocaleString('es-AR'),
        mozo: mozo,
        mesa: mesa,
        comentario: comentario,
        items: [...carrito],
        total: carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0)
    };

    let pedidosGuardados = JSON.parse(localStorage.getItem("pedidosGuardados")) || [];
    pedidosGuardados[pedidoEditandoIndex] = pedidoActualizado;
    localStorage.setItem("pedidosGuardados", JSON.stringify(pedidosGuardados));

    alert("Pedido actualizado exitosamente");
    
    // Limpiar el estado de edición
    pedidoEditandoIndex = null;
    
    // Vaciar el carrito después de actualizar
    reinicializarCarrito();
    
    // Limpiar los campos del formulario
    document.getElementById("mozo").value = "";
    document.getElementById("mesa").value = "";
    document.getElementById("comentario").value = "";
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("carritoModal"));
    if (modal) {
        modal.hide();
    }
    
    setTimeout(() => {
        limpiarModales();
    }, 300);
}

function guardarComoNuevo() {
    // Resetear el estado de edición para guardar como nuevo
    pedidoEditandoIndex = null;
    // Llamar a la función normal de guardar
    guardarPedido();
}

function cancelarEdicion() {
    // Limpiar el estado de edición
    pedidoEditandoIndex = null;
    
    // Vaciar el carrito
    reinicializarCarrito();
    
    // El modal se cierra automáticamente por el data-bs-dismiss
}

function mostrarPedidosGuardados() {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidosGuardados")) || [];
    const lista = document.getElementById("pedidosGuardadosLista");
    
    if (pedidosGuardados.length === 0) {
        lista.innerHTML = '<div class="text-center p-4"><p class="text-muted">No hay pedidos guardados</p></div>';
    } else {
        lista.innerHTML = '';
        pedidosGuardados.forEach((pedido, index) => {
            const pedidoDiv = document.createElement("div");
            pedidoDiv.className = "card mb-3";
            
            const itemsHTML = pedido.items.map(item => 
                `<li class="list-group-item d-flex justify-content-between">
                    <span>${item.nombre}</span>
                    <span>x${item.cantidad} - $${item.precio * item.cantidad}</span>
                </li>`
            ).join('');

            pedidoDiv.innerHTML = `
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Mesa ${pedido.mesa} - Mozo: ${pedido.mozo}</strong>
                        <br><small class="text-muted">${pedido.fecha}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-success me-2" onclick="cargarPedido(${index})">
                            <i class="bi bi-pencil"></i> Editar
                        </button>
                        <button class="btn btn-sm btn-primary me-2" onclick="enviarPedidoGuardado(${index})">
                            <i class="bi bi-whatsapp"></i> Enviar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarPedido(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        ${itemsHTML}
                    </ul>
                    ${pedido.comentario ? `<div class="mt-2"><strong>Comentario:</strong> ${pedido.comentario}</div>` : ''}
                    <div class="mt-2"><strong>Total: $${pedido.total}</strong></div>
                </div>
            `;
            lista.appendChild(pedidoDiv);
        });
    }
    
    new bootstrap.Modal(document.getElementById("pedidosGuardadosModal")).show();
}

function cargarPedido(index) {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidosGuardados")) || [];
    const pedido = pedidosGuardados[index];
    
    if (pedido) {
        console.log("Carrito antes de limpiar:", carrito); // Debug
        
        // Confirmar si hay items en el carrito actual
        if (carrito.length > 0) {
            if (!confirm("¿Querés reemplazar el pedido actual? Se perderán los cambios no guardados.")) {
                return;
            }
        }
        
        // Reinicializar completamente el carrito
        reinicializarCarrito();
        
        // Establecer que estamos editando este pedido
        pedidoEditandoIndex = index;
        
        console.log("Carrito después de limpiar:", carrito); // Debug
        console.log("Pedido a cargar:", pedido.items); // Debug
        
        // Ahora cargar el pedido guardado
        carrito = [...pedido.items];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContador();
        
        console.log("Carrito después de cargar:", carrito); // Debug
        
        // Cerrar modal de pedidos guardados de forma más segura
        const modalGuardados = bootstrap.Modal.getInstance(document.getElementById("pedidosGuardadosModal"));
        if (modalGuardados) {
            modalGuardados.hide();
        }
        
        // Limpiar cualquier backdrop residual y abrir modal del carrito
        setTimeout(() => {
            // Limpiar modales residuales
            limpiarModales();
            
            console.log("Carrito al abrir modal:", carrito); // Debug
            
            // Abrir modal del carrito
            mostrarCarrito();
            document.getElementById("mozo").value = pedido.mozo;
            document.getElementById("mesa").value = pedido.mesa;
            document.getElementById("comentario").value = pedido.comentario || '';
        }, 500);
    }
}

function enviarPedidoGuardado(index) {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidosGuardados")) || [];
    const pedido = pedidosGuardados[index];
    
    if (pedido) {
        let mensaje = `*Pedido para cocina - El Trébol*%0A🧍 Mozo: ${pedido.mozo}%0A🪑 Mesa: ${pedido.mesa}%0A🍽 Detalle:%0A`;
        pedido.items.forEach((p) => {
            mensaje += `• ${p.nombre} x${p.cantidad}%0A`;
        });
        if (pedido.comentario) mensaje += `💬 Comentario: ${pedido.comentario}%0A`;

        const numero = "5493517181975";
        const url = `https://wa.me/${numero}?text=${mensaje}`;
        window.open(url, "_blank");
    }
}

function eliminarPedido(index) {
    if (confirm("¿Estás seguro de que querés eliminar este pedido?")) {
        let pedidosGuardados = JSON.parse(localStorage.getItem("pedidosGuardados")) || [];
        pedidosGuardados.splice(index, 1);
        localStorage.setItem("pedidosGuardados", JSON.stringify(pedidosGuardados));
        
        // Refrescar la lista sin cerrar el modal
        setTimeout(() => {
            mostrarPedidosGuardados();
        }, 100);
    }
}

function eliminarTodosPedidos() {
    if (confirm("¿Estás seguro de que querés eliminar TODOS los pedidos guardados?")) {
        localStorage.removeItem("pedidosGuardados");
        
        // Refrescar la lista sin cerrar el modal
        setTimeout(() => {
            mostrarPedidosGuardados();
        }, 100);
    }
}
  