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

    

    document.querySelector('.boton-enviarB').addEventListener('click', function (event) {
         event.preventDefault(); // Prevenir el envío del formulario por defecto
    
         // Obtener la tabla seleccionada
         const nombreTabla = document.getElementById('nombreProductoB').value.trim();
         if (!nombreTabla) {
             alert('Por favor, seleccione una tabla.');
             return;
         }
    
         // Recoger dinámicamente los datos según la opción seleccionada
         let datos = {};
         if (nombreTabla === "Producto") {
             const nombreProducto = document.getElementById('productoInput')?.value.trim();
             if (!nombreProducto) {
                 alert('Por favor, ingrese el nombre del producto.');
                 return;
             }
             datos = { 
                 nombreTabla: "Producto", 
                 nombreElemento: nombreProducto, 
                 apellidoP: "-",
                 apellidoM: "-" };
         } else if (nombreTabla === "Categoria") {
             const nombreCategoria = document.getElementById('categoriaInput')?.value.trim();
             if (!nombreCategoria) {
                 alert('Por favor, ingrese el nombre de la categoría.');
                 return;
             }
             datos = { 
                 nombreTabla: "Categoria", 
                 nombreElemento: nombreCategoria, 
                 apellidoP: "-",
                 apellidoM: "-" };
         } else if (nombreTabla === "Proveedor") {
             const nombreProveedor = document.getElementById('nombreProveedor')?.value.trim();
             const apellidoPaterno = document.getElementById('apellidoPaterno')?.value.trim();
             const apellidoMaterno = document.getElementById('apellidoMaterno')?.value.trim();
             if (!nombreProveedor || !apellidoPaterno || !apellidoMaterno) {
                 alert('Por favor, complete todos los datos del proveedor (nombre y apellidos).');
                 return;
             }
             datos = {
                 nombreTabla: "Proveedor",
                 nombreElemento: nombreProveedor,
                 apellidoP: apellidoPaterno,
                 apellidoM: apellidoMaterno
             };
         }
    
         // Imprimir los datos en la consola
         console.log("Datos ingresados:", datos);
    
         // // Enviar los datos al servidor con fetch
         fetch('http://localhost:3000/bajaLogica', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(datos)
         })
         .then(response => response.json())
         .then(result => {
           if (result.mensaje) {
             alert(result.mensaje);
           } else if (result.error) {
             alert(result.error);
           }
         })
         .catch(error => {
           console.error('Error al enviar la solicitud:', error);
           alert('Hubo un problema con la solicitud.');
         });
     });


    // ----------------------------------

    document.querySelector('form[id="formProducto"]').addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Obtener valores del formulario
        let nombreProducto = document.getElementById('nombreProducto').value.trim();
        let descripcion = document.getElementById('descripcion').value.trim();
        let idCategoria = document.getElementById('idCategoria').value.trim();
        let idProveedor = document.getElementById('idProveedor').value.trim();
        let idTalla = document.getElementById('idTalla').value.trim();
        let cantidad = document.getElementById('cantidad').value.trim();
        let precio = document.getElementById('precio').value.trim();
        let file = document.getElementById('imagenProducto').files[0];
    
        // Validar campos obligatorios
        if (nombreProducto === '' || descripcion === '') {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }
    
        // Verificar que se haya seleccionado una imagen
        if (!file) {
            alert('Por favor, selecciona una imagen primero');
            return;
        }
    

 const formData = new FormData();
formData.append('imagen', file);
formData.append('nombreProducto', nombreProducto); 
    
        // Realizar la solicitud de subida
        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(imageData => {
  
            const productoData = {
                nombreProducto,
                descripcion,
                idCategoria,
                idProveedor,
                idTalla,
                cantidad,
                precio,
                imagen: imageData.filename 
            };
    
            return fetch('http://localhost:3000/addProducto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoData)
            });
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.mensaje);
                // Limpiar formulario
                document.getElementById('formProducto').reset();
            }
        })
        .catch(error => {
          console.error('Error al enviar la solicitud:', error);
          alert('Hubo un problema con la solicitud.');
        });
    });

    // ----------------------------------
});
function mostrarCampos() {
    const contenedor = document.getElementById("contenedorCampos");
    const seleccion = document.getElementById("nombreProductoB").value;

    contenedor.innerHTML = "";

    if (seleccion === "Producto") {
      // Campo para Producto
      const inputProducto = document.createElement("input");
      inputProducto.type = "text";
      inputProducto.id = "productoInput";
      inputProducto.name = "productoInput";
      inputProducto.placeholder = "Nombre del Producto";
      inputProducto.required = true;
      contenedor.appendChild(inputProducto);
    } else if (seleccion === "Categoria") {
      // Campo para Categoría
      const inputCategoria = document.createElement("input");
      inputCategoria.type = "text";
      inputCategoria.id = "categoriaInput";
      inputCategoria.name = "categoriaInput";
      inputCategoria.placeholder = "Nombre de la Categoría";
      inputCategoria.required = true;
      contenedor.appendChild(inputCategoria);
    } else if (seleccion === "Proveedor") {
      // Campos para Proveedor
      const inputNombre = document.createElement("input");
      inputNombre.type = "text";
      inputNombre.id = "nombreProveedor";
      inputNombre.name = "nombreProveedor";
      inputNombre.placeholder = "Nombre del Proveedor";
      inputNombre.style.margin = "5px 0";
      inputNombre.required = true;

      const inputApellidoPaterno = document.createElement("input");
      inputApellidoPaterno.type = "text";
      inputApellidoPaterno.id = "apellidoPaterno";
      inputApellidoPaterno.name = "apellidoPaterno";
      inputApellidoPaterno.placeholder = "Apellido Paterno";
      inputApellidoPaterno.style.margin = "5px 0";
      inputApellidoPaterno.required = true;

      const inputApellidoMaterno = document.createElement("input");
      inputApellidoMaterno.type = "text";
      inputApellidoMaterno.id = "apellidoMaterno";
      inputApellidoMaterno.name = "apellidoMaterno";
      inputApellidoMaterno.placeholder = "Apellido Materno";
      inputApellidoMaterno.style.margin = "5px 0";
      inputApellidoMaterno.required = true;

      contenedor.appendChild(inputNombre);
      contenedor.appendChild(inputApellidoPaterno);
      contenedor.appendChild(inputApellidoMaterno);
    }
}

function mostrarCamposG() {
    const contenedor = document.getElementById("contenedorCamposG");
    const seleccion = document.getElementById("selectNombreProducto").value;
    contenedor.innerHTML = "";

    if (seleccion === "Producto") {
        const inputProducto = document.createElement("input");
        inputProducto.type = "text";
        inputProducto.id = "inputProducto";
        inputProducto.name = "productoNombre";
        inputProducto.placeholder = "Nombre del Producto";
        inputProducto.style.margin = "5px 0";
        inputProducto.required = true;
        contenedor.appendChild(inputProducto);
    } else if (seleccion === "Proveedor") {
        const inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.id = "inputProveedorNombre";
        inputNombre.name = "proveedorNombre";
        inputNombre.placeholder = "Nombre del Proveedor";
        inputNombre.style.margin = "5px 0";
        inputNombre.required = true;

        const inputApellidoPaterno = document.createElement("input");
        inputApellidoPaterno.type = "text";
        inputApellidoPaterno.id = "inputProveedorApellidoPaterno";
        inputApellidoPaterno.name = "proveedorApellidoPaterno";
        inputApellidoPaterno.placeholder = "Apellido Paterno";
        inputApellidoPaterno.style.margin = "5px 0";
        inputApellidoPaterno.required = true;

        const inputApellidoMaterno = document.createElement("input");
        inputApellidoMaterno.type = "text";
        inputApellidoMaterno.id = "inputProveedorApellidoMaterno";
        inputApellidoMaterno.name = "proveedorApellidoMaterno";
        inputApellidoMaterno.placeholder = "Apellido Materno";
        inputApellidoMaterno.style.margin = "5px 0";
        inputApellidoMaterno.required = true;

        contenedor.appendChild(inputNombre);
        contenedor.appendChild(inputApellidoPaterno);
        contenedor.appendChild(inputApellidoMaterno);
    }
}

document.querySelector('.boton-enviarConsulta').addEventListener('click', function (event) {
    event.preventDefault();

    const nombreTabla = document.getElementById('selectNombreProducto').value.trim();
    if (!nombreTabla) {
        alert('Por favor, seleccione una tabla.');
        return;
    }

    let datos = {};
    if (nombreTabla === "Proveedor") {
        const nombreProveedor = document.getElementById('inputProveedorNombre')?.value.trim();
        if (!nombreProveedor) {
            alert('Por favor, ingrese el nombre del proveedor.');
            return;
        }
        datos = { nombre: nombreProveedor };
    } else {
        alert('Actualmente solo se pueden consultar proveedores.');
        return;
    }

    fetch('http://localhost:3000/obtenerProveedor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            alert(result.error);
        } else {
            mostrarDatosProveedor(result);
        }
    })
    .catch(error => {
        console.error('Error al enviar la solicitud:', error);
        alert('Hubo un problema con la solicitud.');
    });
});

function mostrarDatosProveedor(data) {
    const contenedor = document.getElementById("contenedorCamposG");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear un formulario para los campos editables
    const form = document.createElement("form");
    form.id = "proveedorForm";

    // Campos ocultos para el ID
    const idInput = document.createElement("input");
    idInput.type = "hidden";
    idInput.name = "Id_Proveedor";
    idInput.value = data.Id_Proveedor;
    form.appendChild(idInput);

    // Campos editables
    const campos = [
        { name: "Nombre", label: "Nombre" },
        { name: "Apellido_Pat", label: "Apellido Paterno" },
        { name: "Apellido_Mat", label: "Apellido Materno" },
        { name: "Direccion", label: "Dirección" },
        { name: "Telefono", label: "Teléfono" },
        { name: "Correo", label: "Correo" }
    ];

    campos.forEach(campo => {
        const div = document.createElement("div");
        
        const label = document.createElement("label");
        label.textContent = campo.label + ": ";
        
        const input = document.createElement("input");
        input.type = "text";
        input.name = campo.name;
        input.value = data[campo.name];
        input.style.margin = "5px 0";
        
        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    });

    // Botón de guardar
    const botonGuardar = document.createElement("button");
    botonGuardar.textContent = "Guardar Cambios";
    botonGuardar.type = "button";
    botonGuardar.addEventListener('click', guardarCambios);
    form.appendChild(botonGuardar);

    contenedor.appendChild(form);
}

function guardarCambios() {
    const form = document.getElementById("proveedorForm");
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/actualizarProveedor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Proveedor actualizado exitosamente');
        } else {
            alert('Error al actualizar el proveedor');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al actualizar el proveedor.');
    });
}






