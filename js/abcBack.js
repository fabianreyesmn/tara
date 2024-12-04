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
    document.querySelector('form.formulario[id^="formProducto"]').addEventListener('submit', function(event) {
        event.preventDefault();

        // Prepare form data
        const formData = new FormData(this);
        const imagenInput = document.getElementById('imagenProducto');
        
        // Convert form data to an object
        const productoData = {
            nombreProducto: document.getElementById('nombreProducto').value.trim(),
            descripcion: document.getElementById('descripcion').value.trim(),
            idCategoria: document.getElementById('idCategoria').value.trim(),
            idProveedor: document.getElementById('idProveedor').value.trim(),
            idTalla: document.getElementById('idTalla').value.trim(),
            cantidad: document.getElementById('cantidad').value.trim(),
            precio: document.getElementById('precio').value.trim(),
            imagenProducto: '' // We'll handle image upload separately if needed
        };

        // Validate fields
        const requiredFields = Object.values(productoData);
        if (requiredFields.some(field => field === '')) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Send data to backend
        fetch('http://localhost:3000/addProducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.mensaje);
                // Reset form
                this.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un error al procesar la solicitud.");
        });
    });
    
    
});

