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