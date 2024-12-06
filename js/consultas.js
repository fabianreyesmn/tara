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
        case 5: cargarGrafica(1)
        break;
        case 6: cargarGrafica(2)
        break;
        case 7: cargarPrecioCategoria(1)
        break;
        case 8: cargarPrecioCategoria(2)
        break;
        case 9: mostrarInactivos()
        break;
        case 10: mostrarIngresos()
        break;
        case 11: mostrarProductosConPrecioBajo()
        break;
        case 12: mostrarPrecioPromedioPorCategoria()
        break;
        default: cargarProductos(1)
        break;
    }
}

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

async function cargarGrafica(opc) {
    if (opc === 1) {
        // Aquí usaremos Fetch para obtener los datos del servidor (API Node.js)
        fetch('http://localhost:3000/total-genero')
        .then(response => response.json())
        .then(data => {
            // Una vez que tengamos los datos, construimos la gráfica
            const ctx = document.getElementById('genderChart').getContext('2d');
            
            const genderChart = new Chart(ctx, {
                type: 'pie', // Tipo de gráfico (pastel)
                data: {
                    labels: ['Hombres', 'Mujeres', 'Sin Género'], // Etiquetas de los segmentos
                    datasets: [{
                        label: 'Total de Géneros',
                        data: [data.hombres, data.mujeres, data.sinGenero], // Datos
                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'], // Colores de cada segmento
                        hoverOffset: 4 // Desplazamiento al pasar el ratón
                    }]
                },
                options: {
                    responsive: true, // Hace la gráfica responsive
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top', // Posición de la leyenda
                        },
                        tooltip: {
                            enabled: true // Habilita los tooltips al pasar el ratón
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
    }else {
        // Realizar la solicitud a la API para obtener los datos
        fetch('http://localhost:3000/productos-precio')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('precioChart').getContext('2d');
            
            // Extraer los valores de los resultados de la consulta
            const sobre600 = data.find(item => item.Rango_Precio === 'Sobre 600').Total;
            const hasta600 = data.find(item => item.Rango_Precio === 'Hasta 600').Total;

            // Crear la gráfica
            new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Sobre 600', 'Hasta 600'],
                datasets: [{
                data: [sobre600, hasta600],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + ' productos';
                    }
                    }
                }
                }
            }
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos para la gráfica:', error);
        });
    }
}

async function cargarPrecioCategoria(opc) {
    if (opc === 1) {
        fetch('http://localhost:3000/total-stock-categoria-mayor')
        .then(response => response.json())
        .then(data => {
          const tableBody = document.querySelector('#stockTableMayor tbody');
          tableBody.innerHTML = '';
          data.forEach(item => {
            const row = document.createElement('tr');
            const categoriaCell = document.createElement('td');
            categoriaCell.textContent = item.Categoria;
            const stockCell = document.createElement('td');
            stockCell.textContent = item.Total_Stock;
            row.appendChild(categoriaCell);
            row.appendChild(stockCell);
            tableBody.appendChild(row);
          });
        })
        .catch(error => {
          console.error('Error al cargar los datos:', error);
        });
    }else {
        fetch('http://localhost:3000/total-stock-categoria-menor')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#stockTableMenor tbody');
      tableBody.innerHTML = '';
      data.forEach(item => {
        const row = document.createElement('tr');
        const categoriaCell = document.createElement('td');
        categoriaCell.textContent = item.Categoria;
        const stockCell = document.createElement('td');
        stockCell.textContent = item.Total_Stock;
        row.appendChild(categoriaCell);
        row.appendChild(stockCell);
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error);
    });
    }
}

async function mostrarIngresos(){
    try{
        const respuesta = await fetch('http://localhost:3000/obtenerIngresosPorCategoria'); // Asegúrate que la URL sea la correcta
        const datos = await respuesta.json();
        const ingreso = document.getElementById('ingreso');
        ingreso.textContent = '';
        ingreso.textContent = `Ingreso en la categoria Ropa Deportiva: $${datos.Total_Ingresos}`;
    }catch (error) {
        console.error('Error al obtener inactivos:', error);

    }
}

async function mostrarInactivos() {
    try {
        const respuesta = await fetch('http://localhost:3000/obtenerInactivos');
        const datos = await respuesta.json();
        console.log(datos);
        const divInactivos = document.getElementById('inactivos');
        
        // Limpiar contenido previo
        divInactivos.innerHTML = '';
        
        // Crear tabla para mostrar los resultados
        const tabla = document.createElement('table');
        tabla.classList.add('table', 'table-striped');
        
        // Crear encabezado de tabla
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo</th>
            </tr>
        `;
        tabla.appendChild(thead);
        
        // Crear cuerpo de tabla
        const tbody = document.createElement('tbody');
        
        // Iterar sobre los datos y crear filas
        datos.forEach(item => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${item.Id_Producto || item.Id_Categoria || item.Id_Proveedor}</td>
                <td>${item.Nombre_Producto || item.Nombre_Categoria || item.Nombre_Proveedor}</td>
                <td>${item.Tipo}</td>
            `;
            tbody.appendChild(fila);
        });
        
        tabla.appendChild(tbody);
        divInactivos.appendChild(tabla);
        
    } catch (error) {
        console.error('Error al obtener inactivos:', error);
        
        // Mostrar mensaje de error en el div
        const divInactivos = document.getElementById('inactivos');
        divInactivos.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Error al cargar los registros inactivos.
            </div>
        `;
    }
}

async function mostrarProductosConPrecioBajo() {
    try {
        const respuesta = await fetch('http://localhost:3000/obtenerProductosConPrecioBajo');
        const datos = await respuesta.json();
        if (datos.ProductosConPrecioBajo) {
            const ingreso = document.getElementById('precioBajo');
            ingreso.innerHTML = '';
            const productosString = datos.ProductosConPrecioBajo;
            const productos = productosString.split(', ');
            const lista = document.createElement('ul');
            productos.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = item; 
                lista.appendChild(li);
            });
        
            ingreso.appendChild(lista);

        } else {
            const ingreso = document.getElementById('precioBajo');
            ingreso.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    No se encontraron productos con precio bajo después de la fecha especificada.
                </div>
            `;
        }

    } catch (error) {
        console.error('Error al obtener los productos con precio bajo:', error);
        const ingreso = document.getElementById('precioBajo');
        ingreso.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Error al cargar los productos con precio bajo.
            </div>
        `;
    }
}

async function mostrarPrecioPromedioPorCategoria() {
    try {
        const respuesta = await fetch('http://localhost:3000/obtenerPrecioPromedioPorCategoria');
        const datos = await respuesta.json();

        // Verificar si la respuesta es un array o un objeto con una propiedad de array
        console.log(datos);  // Añadir para depuración

        const ingreso = document.getElementById('precioPromedioPorCategoria');
        ingreso.innerHTML = ''; // Limpiar contenido previo

        // Si 'datos' es un array, no necesitas acceder a una propiedad específica
        if (Array.isArray(datos)) {
            // Crear tabla
            const tabla = document.createElement('table');
            tabla.classList.add('table', 'table-striped'); // Agregar clases para estilo

            // Crear encabezado de tabla
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>Categoría</th>
                    <th>Precio Promedio</th>
                </tr>
            `;
            tabla.appendChild(thead);

            // Crear cuerpo de tabla
            const tbody = document.createElement('tbody');

            // Iterar sobre los datos y agregar una fila por cada producto
            datos.forEach(item => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${item.Categoria}</td>
                    <td>${item.Precio_Promedio}</td>
                `;
                tbody.appendChild(fila);
            });

            tabla.appendChild(tbody);

            // Añadir la tabla al contenedor
            ingreso.appendChild(tabla);
        } else {
            ingreso.innerHTML = `<div class="alert alert-danger" role="alert">
                Los datos no están en el formato esperado.
            </div>`;
        }

    } catch (error) {
        console.error('Error al obtener el precio promedio por categoría:', error);

        const ingreso = document.getElementById('precioPromedioPorCategoria');
        ingreso.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Error al cargar los precios promedio por categoría.
            </div>
        `;
    }
}