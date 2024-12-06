document.addEventListener("DOMContentLoaded", function () {
    const nombreUsuario = localStorage.getItem("nombreUsuario");

    if (!nombreUsuario) {
        console.error("No se encontró el ID de usuario");
        return;
    }

    cargarCarrito();

    function cargarCarrito() {
        fetch(`http://localhost:3000/carr/${nombreUsuario}`)
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos del servidor:', data);
                if (Array.isArray(data)) {
                    mostrarProductosEnCarrito(data);
                } else {
                    console.error("Error: Los datos no son un array", data);
                }
            })
            .catch(error => console.error("Error al cargar el carrito:", error));
    }

    function mostrarProductosEnCarrito(productos) {
        const carritoContainer = document.getElementById("carritoContainer");
        if (!carritoContainer) {
            console.error("No se encontró el contenedor del carrito");
            return;
        }

        carritoContainer.innerHTML = '';
        let total = 0;

        productos.forEach(producto => {
            console.log('Procesando producto:', producto);
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto-carrito");

            const subtotalProducto = producto.Precio_Original * producto.Cantidad;
            const idProductoTalla = producto.Id_Producto_Talla;
            console.log('ID Producto Talla:', idProductoTalla); 

            productoDiv.innerHTML = `
                <div class="producto-info">
                    <p><strong>${producto.Nombre_Producto}</strong></p>
                    <p><strong>Talla:</strong> ${producto.Talla}</p>
                    <p><strong>Precio:</strong> $${producto.Precio_Original}</p>
                    <p><strong>Cantidad:</strong> ${producto.Cantidad}</p>
                    <p><strong>Subtotal:</strong> $${subtotalProducto.toFixed(2)}</p>
                </div>
                <button 
                    class="btn-eliminar" 
                    onclick="eliminarProducto(${idProductoTalla})"
                >
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            `;

            carritoContainer.appendChild(productoDiv);
            total += subtotalProducto;
        });

        const totalAmount = document.getElementById("totalAmount");
        if (totalAmount) {
            totalAmount.textContent = `$${total.toFixed(2)}`;
        }
    }

    // Función global para eliminar producto
    window.eliminarProducto = async function(idProductoTalla) {
        console.log('Intentando eliminar:', { idProductoTalla });

        try {
            const response = await fetch('http://localhost:3000/carr/eliminar', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idProductoTalla: idProductoTalla
                })
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
            if (data.success) {
                cargarCarrito();
            } else {
                console.error("Error al eliminar:", data.error);
                alert("Error al eliminar el producto");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al eliminar el producto");
        }
    };
});

