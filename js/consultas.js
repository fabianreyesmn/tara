// Función para mostrar/ocultar las secciones según el botón presionado
function mostrarSeccion(seccionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.flex').forEach(seccion => {
        seccion.style.display = 'none';
    });

    // Mostrar la sección correspondiente
    const seccion = document.getElementById(`seccion-${seccionId}`);
    if (seccion) {
        seccion.style.display = 'flex';
    }

    // Llamar a la función para cargar la tabla si es la primera sección
    switch (seccionId) {
        case 1: cargarProductos(1)
        break;
        case 2: cargarProductos(2)
        break;
        case 3: cargarProductos(3)
        break;
        case 4: cargarProductos(4)
        break;
        default: cargarProductos(1)
        break;
    }
}

// Función para obtener y cargar los productos en la tabla
async function cargarProductos(opc) {
    let response
    try {
        switch (opc){
            case 1: response = await fetch('http://localhost:3000/vista-productos');
            break;
            case 2: response = await fetch('http://localhost:3000/productos-precio-mayor-promedio');
            break;
            case 3: response = await fetch('http://localhost:3000/productos-precios-mas-altos');
            break;
            case 4: response = await fetch('http://localhost:3000/productos-precios-mas-bajos');
            break;
            default: response = await fetch('http://localhost:3000/vista-productos');
            break;
        }
        
        const data = await response.json();

        const tbody = document.querySelector(`#productos${opc}-table tbody`);
        tbody.innerHTML = ''; // Limpiar contenido anterior

        data.forEach(producto => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${producto.Id_Producto}</td>
                <td>${producto.Nombre_Producto}</td>
                <td>${producto.Descripcion_Producto}</td>
                <td>${producto.Categoria}</td>
                <td>${producto.Proveedor}</td>
                <td>${producto.Talla}</td>
                <td>$${producto.Precio.toFixed(2)}</td>
                <td>${producto.Stock}</td>
            `;

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        alert('Error al cargar los productos.');
    }
}