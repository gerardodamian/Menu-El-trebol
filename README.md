# 🍽️ Sistema de Pedidos - El Trébol

Un sistema web moderno y completo para gestionar pedidos en restaurantes, desarrollado especialmente para **El Trébol**. Permite a los mozos tomar pedidos de manera eficiente, guardarlos, editarlos y enviarlos directamente por WhatsApp.

## ✨ Características Principales

### 📱 **Interfaz Moderna y Responsive**
- Diseño adaptable para móviles, tablets y escritorio
- Interfaz intuitiva con Bootstrap 5
- Categorización visual del menú
- Botones flotantes para acceso rápido

### 🛒 **Gestión de Pedidos**
- ✅ Agregar/quitar items del pedido
- ✅ Modificar cantidades en tiempo real
- ✅ Cálculo automático de totales
- ✅ Campos para mozo, mesa y comentarios
- ✅ Validación de datos antes del envío

### 💾 **Sistema de Guardado**
- 🔄 **Guardar pedidos** para continuar más tarde
- ✏️ **Editar pedidos guardados** con opciones de:
  - Actualizar el pedido original
  - Guardar como nuevo pedido
- 🗂️ **Visualizar todos los pedidos guardados** con detalles completos
- 🗑️ **Eliminar pedidos** individuales o todos a la vez

### 📱 **Integración WhatsApp**
- Envío directo de pedidos formateados por WhatsApp
- Mensaje estructurado con todos los detalles
- Información del mozo, mesa y comentarios
- Integración perfecta con el flujo de trabajo del restaurante

### 🎨 **Categorías del Menú**
- **Entradas** - Aperitivos y platos de entrada
- **Platos Principales** - Carnes y platos principales
- **Pastas** - Variedad de pastas y salsas
- **Arroces** - Platos de arroz y paellas
- **Bebidas** - Refrescos, jugos y bebidas
- **Postres** - Dulces y postres caseros

## 🚀 Demo en Vivo

[Ver Demo](https://gerardodamian.github.io/Menu-El-trebol/) *(Próximamente)*

## 📸 Capturas de Pantalla

### Vista Principal del Menú
![Menú Principal](./docs/menu-principal.png) *(Agregar imagen)*

### Gestión de Pedidos
![Carrito de Pedidos](./docs/carrito-pedidos.png) *(Agregar imagen)*

### Pedidos Guardados
![Pedidos Guardados](./docs/pedidos-guardados.png) *(Agregar imagen)*

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados y responsive design
- **JavaScript (ES6+)** - Lógica de la aplicación
- **Bootstrap 5.3.3** - Framework CSS y componentes
- **Bootstrap Icons** - Iconografía moderna
- **LocalStorage** - Persistencia de datos local
- **WhatsApp API** - Integración de mensajería

## 📋 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Instalación
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/gerardodamian/Menu-El-trebol.git
   cd Menu-El-trebol
   ```

2. **Abrir en navegador**
   ```bash
   # Opción 1: Abrir directamente
   open index.html
   
   # Opción 2: Servidor local (recomendado)
   python -m http.server 8000
   # o
   npx serve .
   ```

3. **Acceder a la aplicación**
   ```
   http://localhost:8000
   ```

## 📖 Guía de Uso

### Para Mozos/Personal del Restaurante:

#### 🆕 **Crear un Nuevo Pedido**
1. Navegar por las categorías del menú
2. Clickear "Agregar" en los items deseados
3. Revisar el pedido clickeando el botón del carrito
4. Completar datos del mozo y mesa
5. Agregar comentarios si es necesario
6. **Guardar** o **Enviar por WhatsApp**

#### ✏️ **Editar un Pedido Guardado**
1. Clickear "Pedidos Guardados"
2. Seleccionar "Editar" en el pedido deseado
3. Modificar items, cantidades o datos
4. Elegir entre:
   - **Actualizar Pedido**: Sobrescribe el original
   - **Guardar Como Nuevo**: Crea una copia
   - **Enviar por WhatsApp**: Envía directamente

#### 📱 **Envío por WhatsApp**
- Los pedidos se formatean automáticamente
- Se incluyen todos los detalles necesarios
- Se abre WhatsApp Web con el mensaje listo
- Solo falta enviar al número de cocina

## ⚙️ Configuración

### 📞 **Número de WhatsApp**
Para cambiar el número de destino, editar en `script.js`:
```javascript
const numero = "5493517181975"; // Reemplazar con tu número
```

### 🍽️ **Personalizar Menú**
Editar el archivo `menu.js` para agregar/modificar platos:
```javascript
const menuData = [
    {
        id: 1,
        nombre: "Nombre del Plato",
        precio: 1200,
        categoria: "Categoría",
        descripcion: "Descripción del plato",
        imagen: "URL_de_la_imagen"
    }
    // Agregar más platos...
];
```

### 🎨 **Personalización Visual**
- **Logo**: Reemplazar `logo.jpg` con tu logo
- **Colores**: Modificar variables CSS en `style.css`
- **Estilos**: Personalizar clases Bootstrap según marca

## 🔧 Estructura del Proyecto

```
Menu-El-trebol/
├── 📄 index.html          # Página principal
├── 🎨 style.css           # Estilos personalizados
├── ⚙️ script.js           # Lógica principal de la aplicación
├── 🍽️ menu.js             # Datos del menú del restaurante
├── 🖼️ logo.jpg            # Logo del restaurante
├── 📚 README.md           # Documentación del proyecto
└── 📁 docs/               # Documentación e imágenes
    ├── menu-principal.png
    ├── carrito-pedidos.png
    └── pedidos-guardados.png
```

## 🤝 Contribución

Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el proyecto
2. Crear una **rama feature** (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un **Pull Request**

### 💡 Ideas para Contribuir
- [ ] Sistema de autenticación para mozos
- [ ] Dashboard administrativo
- [ ] Reportes de ventas
- [ ] Integración con sistemas de punto de venta
- [ ] Modo offline con sincronización
- [ ] Notificaciones push
- [ ] Múltiples idiomas

## 🐛 Reportar Issues

¿Encontraste un bug o tienes una sugerencia? 
[Abre un issue](https://github.com/gerardodamian/Menu-El-trebol/issues) describiendo:

- **Navegador y versión**
- **Pasos para reproducir**
- **Comportamiento esperado vs actual**
- **Capturas de pantalla** (si aplica)

## 📝 Changelog

### v2.0.0 - 2025-01-24
- ✨ **Nuevo**: Sistema completo de guardado y edición de pedidos
- ✨ **Nuevo**: Botones dinámicos según contexto (nuevo vs editando)
- ✨ **Nuevo**: Opción "Actualizar Pedido" vs "Guardar Como Nuevo"
- 🔧 **Mejorado**: Gestión de modales más robusta
- 🔧 **Mejorado**: Interfaz de usuario más intuitiva
- 🐛 **Corregido**: Problemas de duplicación de items
- 🎨 **Mejorado**: Contraste de botones activos

### v1.0.0 - 2025-01-20
- 🎉 **Lanzamiento inicial**
- ✨ Interfaz responsive con Bootstrap
- ✨ Sistema básico de carrito
- ✨ Integración con WhatsApp
- ✨ Categorización del menú

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Desarrollado por

**Gerardo Damián**
- GitHub: [@gerardodamian](https://github.com/gerardodamian)
- Email: [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

---

## 🌟 Agradecimientos

- **Bootstrap Team** por el excelente framework CSS
- **Bootstrap Icons** por la iconografía
- **El Trébol Restaurant** por la inspiración y testing

---

<div align="center">

**¿Te gusta el proyecto? ¡Dale una ⭐!**

Made with ❤️ for the restaurant industry

</div>
