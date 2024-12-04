document.addEventListener('DOMContentLoaded', function() {
   var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    } 

    document.getElementById('formNacionalidad').addEventListener('submit', function(event) {
        event.preventDefault();
    
        let nombreNacionalidad = document.getElementById('nombreNacionalidad').value.trim();
    
        if (nombreNacionalidad === '') {
            alert("Por favor, ingrese una nacionalidad válida.");
        } else {
            fetch('http://localhost:3000/addNacionalidad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nacionalidad: nombreNacionalidad })
            })
            .then(response => response.json()) // Parsear la respuesta a JSON
            .then(data => {
                if (data.error) {
                    // Si hay un error (por ejemplo, nacionalidad ya existe)
                    alert(data.error); // Muestra el error recibido desde el backend
                } else {
                    // Si no hay error, es porque la nacionalidad se guardó correctamente
                    alert(data.mensaje); // Muestra el mensaje de éxito
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al procesar la solicitud.");
            });
        } 
        document.getElementById('nombreNacionalidad').value = '';
    });
    

    document.getElementById('formTalla').addEventListener('submit', function(event) {
        event.preventDefault();

        let nombreTalla = document.getElementById('nombreTalla').value.trim();
        let descripcionTalla = document.getElementById('descripcionTalla').value.trim();
        console.log(nombreTalla+ "\n"+ descripcionTalla);
        if (nombreTalla === '') {
            alert("Por favor, ingrese una talla válida.");
        } else {
            fetch('http://localhost:3000/addTalla', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ talla: nombreTalla, descripcion: descripcionTalla })
            })
            .then(response => response.json()) // Parsear la respuesta a JSON
            .then(data => {
                if (data.error) {
                    // Si hay un error (por ejemplo, nacionalidad ya existe)
                    alert(data.error); // Muestra el error recibido desde el backend
                } else {
                    // Si no hay error, es porque la nacionalidad se guardó correctamente
                    alert(data.mensaje); // Muestra el mensaje de éxito
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al procesar la solicitud.");
            });
        } 
        document.getElementById('nombreTalla').value = '';
        document.getElementById('descripcionTalla').value = '';
    });

    document.getElementById('formProveedor').addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Obtener valores de los campos
        let nombreProvedor = document.getElementById('nombrePrvedor').value.trim();
        let apellidop = document.getElementById('apellidop').value.trim();
        let apellidom = document.getElementById('apellidom').value.trim();
        let direccion = document.getElementById('direccion').value.trim();
        let telefono = document.getElementById('telefono').value.trim();
        let correo = document.getElementById('correo').value.trim();
        let nacionalidad = document.getElementById('nacionalidad').value.trim();
    
        // Validar campos vacíos
        if (!nombreProvedor || !apellidop || !apellidom || !direccion || !telefono || !correo || !nacionalidad) {
            alert("Por favor, complete todos los campos.");
            return;
        }
    
        // Enviar los datos al backend
        fetch('http://localhost:3000/addProveedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreProvedor,
                apellidop,
                apellidom,
                direccion,
                telefono,
                correo,
                nacionalidad
            })
        })
        .then(response => response.json()) // Parsear la respuesta a JSON
        .then(data => {
            if (data.error) {
                // Si hay un error (por ejemplo, proveedor ya existe)
                alert(data.error); // Muestra el error recibido desde el backend
            } else {
                // Si no hay error, es porque el proveedor se guardó correctamente
                alert(data.mensaje); // Muestra el mensaje de éxito
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un error al procesar la solicitud.");
        });
    
        // Limpiar el formulario
        document.getElementById('nombrePrvedor').value = '';
        document.getElementById('apellidop').value = '';
        document.getElementById('apellidom').value = '';
        document.getElementById('direccion').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('nacionalidad').value = '';
    });



    document.querySelector('form[id^="formCategoria"]').addEventListener('submit', function(event) {
        event.preventDefault();
    
        let nombreCategoria = document.getElementById('nombreCategoria').value.trim();
    
        if (nombreCategoria === '') {
            alert("Por favor, ingrese un nombre de categoría válido.");
        } else {
            fetch('http://localhost:3000/addCategoria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombreCategoria: nombreCategoria })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert(data.mensaje);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al procesar la solicitud.");
            });
        } 
        document.getElementById('nombreCategoria').value = '';
    });

    // Agregar Producto
app.post('/addProducto', async (req, res) => {
    const { 
      nombreProducto, 
      descripcion, 
      idCategoria, 
      idProveedor, 
      idTalla, 
      cantidad, 
      precio, 
      imagenProducto 
    } = req.body;
  
    const connection = await pool.getConnection();
  
    
    try {
      // Iniciar una transacción
      await connection.beginTransaction();
  
      // 1. Verificar que la categoría exista
      const [categoriaRows] = await connection.execute(
        'SELECT * FROM Categoria WHERE Id_Categoria = ?', 
        [idCategoria]
      );
      if (categoriaRows.length === 0) {
        await connection.rollback();
        return res.status(404).json({ error: 'La categoría no existe.' });
      }
  
      // 2. Verificar que el proveedor exista
      const [proveedorRows] = await connection.execute(
        'SELECT * FROM Proveedor WHERE Id_Proveedor = ?', 
        [idProveedor]
      );
      if (proveedorRows.length === 0) {
        await connection.rollback();
        return res.status(404).json({ error: 'El proveedor no existe.' });
      }
  
      // 3. Verificar que la talla exista
      const [tallaRows] = await connection.execute(
        'SELECT * FROM Talla WHERE Id_Talla = ?', 
        [idTalla]
      );
      if (tallaRows.length === 0) {
        await connection.rollback();
        return res.status(404).json({ error: 'La talla no existe.' });
      }
  
      // 4. Insertar el producto
      const [productoResult] = await connection.execute(
        'INSERT INTO Producto (Nombre, Descripcion, Id_Categoria, Id_Proveedor, Imagen) VALUES (?, ?, ?, ?, ?)', 
        [nombreProducto, descripcion, idCategoria, idProveedor, imagenProducto]
      );
      const idProducto = productoResult.insertId;
  
      // 5. Insertar en Producto_Talla
      await connection.execute(
        'INSERT INTO Producto_Talla (Precio, Stock, Id_Producto, Id_Talla) VALUES (?, ?, ?, ?)', 
        [precio, cantidad, idProducto, idTalla]
      );
  
      // Confirmar la transacción
      await connection.commit();
  
      res.status(201).json({ 
        mensaje: 'Producto guardado correctamente', 
        idProducto: idProducto 
      });
  
    } catch (error) {
      // En caso de error, revertir la transacción
      await connection.rollback();
      console.error('Error al agregar producto:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
      // Liberar la conexión
      connection.release();
    }
  });
    
});

