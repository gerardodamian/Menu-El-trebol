/**
 * Script para la página de menú
 * Gestiona la visualización de platos y la interacción del usuario
 */

// Variable para almacenar el plato actual seleccionado
let productoActual = null;

// Array global de datos del menú
let menuData = [];

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    
    // Cargar datos del menú
    cargarMenu();
    
    // Configurar eventos
    configurarEventos();
});

// Función para cargar el menú desde un archivo JSON
function cargarMenu() {
    
    
    // Datos del menú
    menuData = [
        {
            id: 1,
            nombre: "Ensalada César",
            precio: 1200,
            categoria: "Entradas",
            descripcion:
                "Lechuga fresca, crutones, queso parmesano y aderezo César casero.",
            ingredientes: [
                "Lechuga romana",
                "Crutones",
                "Queso parmesano",
                "Aderezo César",
            ],
            imagen: "https://imag.bonviveur.com/ensalada-cesar-casera.jpg",
            destacado: false,
        },
        {
            id: 2,
            nombre: "Carpaccio de Lomo",
            precio: 1500,
            categoria: "Entradas",
            descripcion:
                "Finas láminas de lomo con rúcula, queso parmesano y aceite de oliva.",
            ingredientes: [
                "Lomo",
                "Rúcula",
                "Queso parmesano",
                "Aceite de oliva",
                "Sal",
                "Pimienta",
            ],
            imagen: "https://www.cucinare.tv/wp-content/uploads/2019/12/Dise%C3%B1o-sin-t%C3%ADtulo-7-4.png",
            destacado: true,
        },
        {
            id: 3,
            nombre: "Provoleta",
            precio: 1400,
            categoria: "Entradas",
            descripcion:
                "Queso provolone fundido con orégano y aceite de oliva.",
            ingredientes: ["Queso provolone", "Orégano", "Aceite de oliva"],
            imagen: "https://i0.wp.com/www.brasasysabores.com/wp-content/uploads/2017/11/Provoleta-el-queso-del-asado.jpg",
            destacado: false,
        },
        {
            id: 4,
            nombre: "Bife de Chorizo",
            precio: 4800,
            categoria: "Platos Principales",
            descripcion:
                "Jugoso bife de chorizo servido con papas fritas y ensalada.",
            ingredientes: [
                "Bife de chorizo",
                "Papas",
                "Mix de verdes",
                "Sal",
                "Pimienta",
            ],
            imagen: "https://www.kingarthur.com.ar/wp-content/uploads/2016/01/CARNE-bife-chorizo-21.jpg",
            destacado: true,
        },
        {
            id: 5,
            nombre: "Milanesa Napolitana",
            precio: 3800,
            categoria: "Platos Principales",
            descripcion:
                "Milanesa de ternera cubierta con salsa de tomate, jamón y queso, acompañada de papas fritas.",
            ingredientes: [
                "Carne de ternera",
                "Pan rallado",
                "Salsa de tomate",
                "Jamón",
                "Queso mozzarella",
                "Papas",
            ],
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlAHaelvDmG0QRTk3P4k_H3xDagXzvYuT-zA&s",
            destacado: false,
        },
        {
            id: 6,
            nombre: "Salmón Grillado",
            precio: 5200,
            categoria: "Platos Principales",
            descripcion:
                "Filete de salmón cocinado a la parrilla con salsa de limón y hierbas, acompañado de puré de papas.",
            ingredientes: [
                "Salmón",
                "Limón",
                "Hierbas frescas",
                "Papas",
                "Manteca",
                "Leche",
            ],
            imagen: "https://dcdn-us.mitiendanube.com/stores/001/622/600/products/salmon-rosado-grille1-06c9591946798934b716168667005820-640-0.jpg",
            destacado: false,
        },
        {
            id: 7,
            nombre: "Lomo al Malbec",
            precio: 5500,
            categoria: "Platos Principales",
            descripcion:
                "Medallones de lomo en reducción de vino Malbec, acompañados de puré de calabaza.",
            ingredientes: [
                "Lomo",
                "Vino Malbec",
                "Caldo",
                "Calabaza",
                "Manteca",
                "Especias",
            ],
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8Y7DjoOI216V3ErN9KkeVre7U9sAxKBc0w&s",
            destacado: true,
        },
        {
            id: 8,
            nombre: "Ravioles de Ricotta y Espinaca",
            precio: 3200,
            categoria: "Pastas",
            descripcion:
                "Pasta casera rellena de ricotta y espinaca, con salsa filetto.",
            ingredientes: [
                "Harina",
                "Huevo",
                "Ricotta",
                "Espinaca",
                "Tomate",
                "Albahaca",
            ],
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WrH9egNZPRBuFcBnDA2mGbm4W1aEEzBXoA&s",
            destacado: false,
        },
        {
            id: 9,
            nombre: "Tallarines a la Bolognesa",
            precio: 2900,
            categoria: "Pastas",
            descripcion:
                "Pasta casera con salsa de carne a la bolognesa y queso parmesano.",
            ingredientes: [
                "Harina",
                "Huevo",
                "Carne picada",
                "Tomate",
                "Zanahoria",
                "Cebolla",
                "Queso parmesano",
            ],
            imagen: "https://www.paulinacocina.net/wp-content/uploads/2015/05/bolo-1200x675.jpg",
            destacado: false,
        },
        {
            id: 10,
            nombre: "Ñoquis de Papa",
            precio: 2800,
            categoria: "Pastas",
            descripcion:
                "Ñoquis caseros de papa con salsa a elección: filetto, bolognesa o estofado.",
            ingredientes: ["Papa", "Harina", "Huevo", "Nuez moscada"],
            imagen: "https://www.unileverfoodsolutions.com.mx/dam/global-ufs/mcos/NOLA/calcmenu/recipes/MX-recipes/In-Development/FULL-GNOCCHIS.png",
            destacado: false,
        },
        {
            id: 11,
            nombre: "Locro",
            precio: 3200,
            categoria: "Pastas",
            descripcion:
                "Guiso tradicional argentino con maíz, porotos, zapallo, chorizo y carne.",
            ingredientes: [
                "Maíz blanco",
                "Porotos",
                "Zapallo",
                "Carne",
                "Chorizo",
                "Condimentos",
            ],
            imagen: "https://resizer.glanacion.com/resizer/v2/locr-FYF74VQQ5FF2HBH53E2DCOQU74.jpg?auth=a405149af1a14d4302200ab7bc2419adecef9f2d4f2ba367e7fb01fc5dda9e4c&width=1200&height=701&quality=70&smart=true",
            destacado: true,
        },
        {
            id: 12,
            nombre: "Risotto de Hongos",
            precio: 3400,
            categoria: "Arroces",
            descripcion:
                "Arroz arbóreo con variedad de hongos, vino blanco y queso parmesano.",
            ingredientes: [
                "Arroz arbóreo",
                "Hongos",
                "Vino blanco",
                "Caldo",
                "Queso parmesano",
                "Manteca",
            ],
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Z1d2qthOFqya4YHepapOuCBRPTkQG4F2ww&s",
            destacado: false,
        },
        {
            id: 13,
            nombre: "Paella Valenciana",
            precio: 4900,
            categoria: "Arroces",
            descripcion:
                "Arroz con azafrán, mariscos, pollo y verduras, preparado al estilo español.",
            ingredientes: [
                "Arroz",
                "Azafrán",
                "Mariscos",
                "Pollo",
                "Pimiento",
                "Arvejas",
            ],
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI4Hw1tYONFPTzh90JZBNmUF9Jv6Bptzuj3Q&s",
            destacado: false,
        },
        {
            id: 14,
            nombre: "Arroz al Ajillo con Mariscos",
            precio: 4700,
            categoria: "Arroces",
            descripcion:
                "Arroz salteado con ajo, camarones, calamares y mejillones.",
            ingredientes: [
                "Arroz",
                "Ajo",
                "Camarones",
                "Calamares",
                "Mejillones",
                "Vino blanco",
            ],
            imagen: "https://lacocinademasito.com/wp-content/uploads/2023/01/Arroz-con-gambas-al-ajillo-1.jpg",
            destacado: false,
        },
        {
            id: 15,
            nombre: "Rabas al Ajillo",
            precio: 3700,
            categoria: "Platos Principales",
            descripcion:
                "Aros de calamar fritos servidos con salsa de ajo y limón.",
            ingredientes: ["Calamares", "Ajo", "Limón", "Perejil", "Harina"],
            imagen: "https://i.ytimg.com/vi/DVyc7BIhYvs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDgaQA2l-X3kXXFiENRpeQwzZjOjA",
            destacado: false,
        },
        {
            id: 16,
            nombre: "Flan Casero",
            precio: 1000,
            categoria: "Postres",
            descripcion: "Flan tradicional con caramelo y dulce de leche.",
            ingredientes: [
                "Huevos",
                "Leche",
                "Azúcar",
                "Vainilla",
                "Dulce de leche",
            ],
            imagen: "https://img-global.cpcdn.com/recipes/95771e69abfbed20/680x482cq90/flan-casero-foto-principal.jpg",
            destacado: false,
        },
        {
            id: 17,
            nombre: "Tiramisú",
            precio: 1200,
            categoria: "Postres",
            descripcion:
                "Postre italiano con capas de bizcochuelo, café, mascarpone y cacao.",
            ingredientes: [
                "Bizcochuelo",
                "Café",
                "Queso mascarpone",
                "Cacao",
                "Azúcar",
            ],
            imagen: "https://www.paulinacocina.net/wp-content/uploads/2020/01/receta-de-tiramisu-facil-y-economico-1740483918-1200x675.jpg",
            destacado: true,
        },
        {
            id: 18,
            nombre: "Cheesecake de Frutos Rojos",
            precio: 1300,
            categoria: "Postres",
            descripcion:
                "Tarta de queso con base de galleta y cobertura de frutos rojos.",
            ingredientes: [
                "Galletas",
                "Queso crema",
                "Crema",
                "Azúcar",
                "Frutos rojos",
            ],
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4yaz_qCb-qKeWOTQCpeeCHwN7LkoGcCKvfw&s",
            destacado: false,
        },
        {
            id: 19,
            nombre: "Gaseosa Línea Coca-Cola",
            precio: 900,
            categoria: "Bebidas",
            descripcion: "Coca-Cola, Coca-Cola Light, Sprite o Fanta (500ml).",
            ingredientes: [],
            imagen: "https://depositoelmayorista.com.ar/wp-content/uploads/2019/12/WhatsApp-Image-2020-02-14-at-18.54.52.jpeg",
            destacado: false,
        },
        {
            id: 20,
            nombre: "Agua Mineral",
            precio: 800,
            categoria: "Bebidas",
            descripcion: "Agua mineral con o sin gas (500ml).",
            ingredientes: [],
            imagen: "https://newbarmdp.com/wp-content/uploads/AGUA-MINERAL-KIN-500CC.-1.jpg",
            destacado: false,
        },
        {
            id: 21,
            nombre: "Vino Malbec",
            precio: 7000,
            categoria: "Bebidas",
            descripcion: "Botella de vino Malbec reserva.",
            ingredientes: ["Uva Malbec"],
            imagen: "https://www.bodegafincasavina.com/wp-content/uploads/2024/05/IMG-20240406-WA0022-scaled.jpg",
            destacado: false,
        },
        {
            id: 22,
            nombre: "Cerveza Artesanal",
            precio: 1200,
            categoria: "Bebidas",
            descripcion: "Botella de cerveza artesanal local (500ml).",
            ingredientes: ["Malta", "Lúpulo", "Levadura"],
            imagen: "https://topbeer.mx/wp-content/uploads/2022/08/tipos-de-cerveza-en-beer-flight.jpg",
            destacado: false,
        },
        {
            id: 23,
            nombre: "Lomito completo con papas fritas",
            precio: 3700,
            categoria: "Entradas",
            descripcion:
                "Un clásico de la cocina argentina que no tiene nada que envidiarle a las hamburguesas más famosas del mundo. Sencillo, pero con una combinación de sabores imbatible, es perfecto para cualquier momento del día.",
            ingredientes: [
                "Pan",
                "Lomo",
                "Huevo",
                "Lechuga",
                "Tomate",
                "Mayonesa",
                "Papas fritas",
            ],
            imagen: "https://www.circuitogastronomico.com/wp-content/uploads/2023/04/pizzar-lomito-2.jpg",
            destacado: false,
        },
        {
            id: 24,
            nombre: "Tabla de Quesos y Fiambres",
            precio: 4500,
            categoria: "Entradas",
            descripcion:
                "Selección de quesos y fiambres argentinos con pan casero.",
            ingredientes: ["Queso", "Fiambres", "Pan", "Aceitunas"],
            imagen: "https://img-global.cpcdn.com/recipes/3cf34d8d1a9fd951/1200x630cq70/photo.jpg",
            destacado: false,
        },
        {
            id: 25,
            nombre: "Pizza muzarella con jamón y morrones",
            precio: 4500,
            categoria: "Entradas",
            descripcion:
                "Deliciosa pizza con base de masa casera, salsa de tomate, queso muzzarella, jamón y morrones asados.",
            ingredientes: [
                "Masa de pizza",
                "Salsa de tomate",
                "Queso muzzarella",
                "Jamón",
                "Morrones",
            ],
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT83k-Dw0oTvfqnpwDAG8cHvA_Z8_54LQ42g&s",
            destacado: false,
        },
        {
            id: 26,
            nombre: "Fugazztea rellena con jamón y morrones",
            precio: 4500,
            categoria: "Entradas",
            descripcion:
                "Fugazztea rellena con jamón y morrones asados, ideal para compartir.",
            ingredientes: [
                "Masa de fugazztea",
                "Cebolla",
                "Queso muzzarella",
                "Jamón",
                "Morrones",
            ],
            imagen: "https://i.ytimg.com/vi/CcOzFZ4WrK4/maxresdefault.jpg",
            destacado: false,
        },
    ];

    // Renderizar el menú en la página
    renderizarMenu(menuData);
    
    
}

// Función para renderizar los platos del menú
function renderizarMenu(platos) {
    const menuContainer = document.getElementById('menuCompleto');
    const ofertasContainer = document.getElementById('ofertasGrid');
    const productosContainer = document.getElementById('productosGrid');
    
    if (!menuContainer || !ofertasContainer || !productosContainer) {
        console.error('No se encontraron los contenedores para el menú');
        return;
    }
    
    // Limpiar contenedores
    menuContainer.innerHTML = '';
    ofertasContainer.innerHTML = '';
    productosContainer.innerHTML = '';
    
    // Destacados para la sección de ofertas
    const platosDestacados = platos.filter(plato => plato.destacado);
    
    // Platos regulares (no destacados)
    const platosRegulares = platos.filter(plato => !plato.destacado);
    
    // Renderizar platos destacados
    platosDestacados.forEach(plato => {
        ofertasContainer.appendChild(crearTarjetaPlato(plato, true));
    });
    
    // Renderizar platos regulares
    platosRegulares.forEach(plato => {
        productosContainer.appendChild(crearTarjetaPlato(plato));
        
        // También agregar al grid principal
        menuContainer.appendChild(crearTarjetaPlato(plato));
    });
}

// Función para crear una tarjeta de plato
function crearTarjetaPlato(plato, esOferta = false) {
    // Crear el elemento col
    const col = document.createElement('div');
    col.className = 'col';
    
    // Crear la tarjeta
    const card = document.createElement('div');
    card.className = `card h-100 ${esOferta ? 'border-success' : ''}`;
    
    // Imagen
    const imgSrc = plato.imagen || `https://via.placeholder.com/300x200/6c757d/ffffff?text=${encodeURIComponent(plato.nombre)}`;
    const img = document.createElement('img');
    img.src = imgSrc;
    img.className = 'card-img-top';
    img.alt = plato.nombre;
    img.style.height = '200px';
    img.style.objectFit = 'cover';
    img.onerror = function() {
        this.src = `https://via.placeholder.com/300x200/6c757d/ffffff?text=${encodeURIComponent(plato.nombre)}`;
    };
    
    // Cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    // Badge para categoría
    const categoriaBadge = document.createElement('span');
    categoriaBadge.className = 'badge bg-light text-dark mb-2';
    categoriaBadge.textContent = plato.categoria;
    
    // Título
    const titulo = document.createElement('h5');
    titulo.className = 'card-title';
    titulo.textContent = plato.nombre;
    
    // Precio
    const precio = document.createElement('p');
    precio.className = 'card-text fw-bold fs-5';
    precio.textContent = `$${plato.precio}`;
    
    // Descripción
    const descripcion = document.createElement('p');
    descripcion.className = 'card-text small';
    descripcion.textContent = plato.descripcion.length > 100 
        ? plato.descripcion.substring(0, 97) + '...' 
        : plato.descripcion;
    
    // Footer
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer bg-transparent border-top-0 d-flex justify-content-between';
    
    // Botón de info
    const infoBtn = document.createElement('button');
    infoBtn.className = 'btn btn-sm btn-outline-secondary info-btn';
    infoBtn.innerHTML = '<i class="bi bi-info-circle me-1"></i> Info';
    infoBtn.dataset.id = plato.id;
    
    // Botón de agregar
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-sm btn-success add-btn';
    addBtn.innerHTML = '<i class="bi bi-cart-plus me-1"></i> Agregar';
    addBtn.dataset.id = plato.id;
    
    // Agregar badge especial para ofertas
    if (esOferta) {
        const ofertaBadge = document.createElement('div');
        ofertaBadge.className = 'position-absolute top-0 end-0 m-2';
        ofertaBadge.innerHTML = '<span class="badge bg-success">Especial del Chef</span>';
        card.appendChild(ofertaBadge);
    }
    
    // Ensamblar la tarjeta
    cardFooter.appendChild(infoBtn);
    cardFooter.appendChild(addBtn);
    
    cardBody.appendChild(categoriaBadge);
    cardBody.appendChild(titulo);
    cardBody.appendChild(precio);
    cardBody.appendChild(descripcion);
    
    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    
    col.appendChild(card);
    
    return col;
}

// Función para configurar todos los eventos
function configurarEventos() {
    // Manejar clic en los botones de filtro por categorías
    document.querySelectorAll("[data-category]").forEach((btn) => {
        btn.addEventListener("click", function () {
            const categoria = this.dataset.category;

            // Quitar clase active de todos los botones
            document.querySelectorAll("[data-category]").forEach((b) => {
                b.classList.remove("active");
            });

            // Agregar clase active al botón clickeado
            this.classList.add("active");

            // Filtrar platos
            filtrarPlatosPorCategoria(categoria);
        });
    });

    document.addEventListener("change", function (e) {
        if (e.target.name === "tipoEntrega") {
            const direccionContainer =
                document.getElementById("direccionContainer");
            const inputDireccion = document.getElementById("inputDireccion");

            if (e.target.value === "delivery") {
                // Mostrar campo de dirección
                direccionContainer.style.display = "block";
                inputDireccion.required = true;
            } else {
                // Ocultar campo de dirección
                direccionContainer.style.display = "none";
                inputDireccion.required = false;
                inputDireccion.value = ""; // Limpiar el campo
            }
        }
    });

    // Agregar al final de la función configurarEventos(), justo antes del cierre:

    // Configurar eventos para el tipo de entrega en el modal del carrito
    document
        .getElementById("cartModal")
        .addEventListener("shown.bs.modal", function () {
            // Configurar eventos cuando se abre el modal
            const radioDelivery = document.getElementById("radioDelivery");
            const radioRetiro = document.getElementById("radioRetiro");
            const direccionContainer =
                document.getElementById("direccionContainer");
            const inputDireccion = document.getElementById("inputDireccion");

            function toggleDireccion() {
                if (radioDelivery.checked) {
                    direccionContainer.style.display = "block";
                    inputDireccion.required = true;
                } else {
                    direccionContainer.style.display = "none";
                    inputDireccion.required = false;
                    inputDireccion.value = "";
                }
            }

            // Ejecutar al abrir el modal
            toggleDireccion();

            // Agregar listeners a los radio buttons
            radioDelivery.addEventListener("change", toggleDireccion);
            radioRetiro.addEventListener("change", toggleDireccion);
        });

    // Fin de configurarEventos

    // Configurar modal de producto
    document.addEventListener("click", function (e) {
        // Botones de info
        if (e.target.closest(".info-btn")) {
            const id = parseInt(e.target.closest(".info-btn").dataset.id);
            mostrarDetallesProducto(id);
        }

        // Botones de agregar
        if (e.target.closest(".add-btn")) {
            const id = parseInt(e.target.closest(".add-btn").dataset.id);
            agregarProductoAlCarrito(id);
        }
    });

    // Fin de configurarEventos
}


// Filtrar platos por categoría
function filtrarPlatosPorCategoria(categoria) {
    // Obtener todos los platos
    const platos = document.querySelectorAll('.col');
    
    platos.forEach(plato => {
        const categoriaPlato = plato.querySelector('.badge').textContent;
        
        if (categoria === 'all' || categoriaPlato === categoria) {
            plato.style.display = '';
        } else {
            plato.style.display = 'none';
        }
    });
}

// Función para mostrar detalles del producto
function mostrarDetallesProducto(id) {
    // Buscar el plato por ID
    const plato = getProductoPorId(id);
    
    if (!plato) {
        console.error('Producto no encontrado:', id);
        return;
    }
    
    // Guardar el producto actual
    productoActual = plato;
    
    // Actualizar el modal con los datos del producto
    const modalImg = document.getElementById('modalProductoImagen');
    if (modalImg) {
        modalImg.src = plato.imagen || `https://via.placeholder.com/400x300/28a745/ffffff?text=${plato.nombre}`;
        modalImg.alt = plato.nombre;
        
        // Manejar errores de carga de imagen
        modalImg.onerror = function() {
            this.src = `https://via.placeholder.com/400x300/28a745/ffffff?text=${plato.nombre}`;
        };
    }
    
    document.getElementById('modalProductoTitulo').textContent = plato.nombre;
    document.getElementById('modalProductoCategoria').textContent = plato.categoria;
    document.getElementById('modalProductoPrecio').textContent = `$${plato.precio}`;
    document.getElementById('modalProductoDescripcion').textContent = plato.descripcion;
    
    // Mostrar ingredientes
    const ingredientesContainer = document.getElementById('modalProductoIngredientes');
    ingredientesContainer.innerHTML = '';
    
    if (plato.ingredientes && plato.ingredientes.length > 0) {
        plato.ingredientes.forEach(ingrediente => {
            const li = document.createElement('li');
            li.className = 'mb-1';
            li.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2"></i> ${ingrediente}`;
            ingredientesContainer.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.innerHTML = '<i class="bi bi-info-circle text-secondary me-2"></i> Información de ingredientes no disponible';
        ingredientesContainer.appendChild(li);
    }
    
    // Mostrar platos similares (opcional)
    const similaresContainer = document.getElementById('modalPlatosSimilares');
    similaresContainer.innerHTML = '';
    
    const platosSimilares = getPlatosSimilares(plato);
    
    if (platosSimilares.length > 0) {
        const titulo = document.createElement('h6');
        titulo.className = 'border-bottom pb-2 mt-4';
        titulo.textContent = 'También te puede interesar:';
        similaresContainer.appendChild(titulo);
        
        const ul = document.createElement('ul');
        ul.className = 'list-unstyled';
        
        platosSimilares.forEach(similar => {
            const li = document.createElement('li');
            li.className = 'mb-2';
            li.innerHTML = `
                <a href="#" class="text-decoration-none plato-similar" data-id="${similar.id}">
                    <i class="bi bi-arrow-right-circle text-success me-2"></i>
                    ${similar.nombre} - $${similar.precio}
                </a>
            `;
            ul.appendChild(li);
        });
        
        similaresContainer.appendChild(ul);
        
        // Configurar eventos para los platos similares
        similaresContainer.querySelectorAll('.plato-similar').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const id = parseInt(this.dataset.id);
                mostrarDetallesProducto(id);
            });
        });
    }
    
    // Abrir el modal
    const productoModal = new bootstrap.Modal(document.getElementById('productoModal'));
    productoModal.show();
}

// Obtener producto por ID
function getProductoPorId(id) {
    // Primero intentamos encontrar el plato en el array original
    const originalPlato = menuData.find(plato => plato.id === id);
    
    if (originalPlato) {
        
        return originalPlato;
    }
    
    // Si no lo encontramos en el array original, buscamos en el DOM como fallback
    
    const todosLosPlatos = Array.from(document.querySelectorAll('.card')).map(card => {
        const idBtn = card.querySelector('.info-btn')?.dataset.id;
        if (idBtn && parseInt(idBtn) === id) {
            return {
                id: id,
                nombre: card.querySelector('.card-title').textContent,
                precio: parseInt(card.querySelector('.fw-bold').textContent.replace('$', '')),
                categoria: card.querySelector('.badge').textContent,
                descripcion: card.querySelector('.card-text:not(.fw-bold)').textContent,
                imagen: card.querySelector('.card-img-top').src,
                ingredientes: ['Consultar disponibilidad'] // Mensaje por defecto
            };
        }
        return null;
    }).filter(Boolean);
    
    return todosLosPlatos[0];
}

// Obtener platos similares
function getPlatosSimilares(plato) {
    // Esta función simula la búsqueda de platos similares
    const todosLosPlatos = Array.from(document.querySelectorAll('.card')).map(card => {
        const idBtn = card.querySelector('.info-btn')?.dataset.id;
        if (idBtn) {
            return {
                id: parseInt(idBtn),
                nombre: card.querySelector('.card-title').textContent,
                precio: parseInt(card.querySelector('.fw-bold').textContent.replace('$', '')),
                categoria: card.querySelector('.badge').textContent
            };
        }
        return null;
    }).filter(Boolean);
    
    // Filtrar platos de la misma categoría, excluyendo el plato actual
    return todosLosPlatos
        .filter(p => p.categoria === plato.categoria && p.id !== plato.id)
        .slice(0, 3); // Limitar a 3 platos similares
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(id) {
    const plato = getProductoPorId(id);
    
    if (!plato) {
        console.error('Producto no encontrado:', id);
        return;
    }
    
    // Usar la función global para agregar al carrito
    if (window.agregarAlCarrito) {
        window.agregarAlCarrito(plato);
        
        // Mensaje de éxito
        mostrarToastExito(`¡${plato.nombre} agregado al pedido!`);
    } else {
        console.error('La función agregarAlCarrito no está disponible');
    }
}

// Función para mostrar toast de éxito
function mostrarToastExito(mensaje) {
    // Crear el toast
    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '11';
    
    toastContainer.innerHTML = `
        <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    ${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    // Agregar al cuerpo del documento
    document.body.appendChild(toastContainer);
    
    // Inicializar el toast
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();
    
    // Eliminar después de cerrado
    toastContainer.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

