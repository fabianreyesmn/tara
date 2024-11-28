document.addEventListener('DOMContentLoaded', function() {
    const contenedorRegistro = document.querySelector('.register-form');
    const contenedorInicio = document.querySelector('.login-form');
    
    // Botones de envío de los formularios
    const botonRegistro = contenedorRegistro.querySelector('button[type="submit"]');
    const botonInicio = contenedorInicio.querySelector('button[type="submit"]');

    // Manejador de clic para el formulario de registro
    botonRegistro.addEventListener('click', function(evento) {
        evento.preventDefault();
        limpiarErrores(contenedorRegistro);
    
        if (validarFormularioRegistro()) {
            console.log('Formulario de registro válido');
            procesarFormularioRegistro();
        }
    });

    // Manejador de clic para el formulario de inicio de sesión
    botonInicio.addEventListener('click', function(evento) {
        evento.preventDefault();
        limpiarErrores(contenedorInicio);
    
        if (validarFormularioInicioSesion()) {
            console.log('Formulario de inicio de sesión válido');
            procesarFormularioInicioSesion();
        }
    });

    // Limpiar errores en los inputs de un formulario específico
    function limpiarErrores(contenedor) {
        const inputs = contenedor.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }

    // Validar el formulario de registro
    function validarFormularioRegistro() {
        let esValido = true;
        const inputs = contenedorRegistro.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('error');
                setTimeout(() => {
                    input.classList.remove('error');
                }, 500);
                esValido = false;
            }
        });
        
        const emailInput = contenedorRegistro.querySelector('input[placeholder="Correo Electrónico"]');
        const email = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailRegex.test(email)) {
            emailInput.classList.add('error');
            setTimeout(() => {
                emailInput.classList.remove('error');
            }, 500);
            esValido = false;
        }
        
        return esValido;
    }

    // Validar el formulario de inicio de sesión
    function validarFormularioInicioSesion() {
        let esValido = true;
        const inputs = contenedorInicio.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('error');
                setTimeout(() => {
                    input.classList.remove('error');
                }, 500);
                esValido = false;
            }
        });
        
        return esValido;
    }

    // Procesar el formulario de registro
    async function procesarFormularioRegistro() {
        const datos = {
            nombre: contenedorRegistro.querySelector('input[placeholder="Nombre"]').value.trim(),
            apellidoPaterno: contenedorRegistro.querySelector('input[placeholder="Apellido Paterno"]').value.trim(),
            apellidoMaterno: contenedorRegistro.querySelector('input[placeholder="Apellido Materno"]').value.trim(),
            correo: contenedorRegistro.querySelector('input[placeholder="Correo Electrónico"]').value.trim(),
            contrasena: contenedorRegistro.querySelector('input[placeholder="Contraseña"]').value.trim()
        };
    
        console.log('Datos del formulario de registro:', datos);
    
        // Enviar datos al servidor
        try {
            const response = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
    
            const resultado = await response.json();
            if (response.ok) {
                console.log('Registro exitoso:', resultado);
                alert('Registro exitoso');
            } else {
                console.error('Error al registrar:', resultado.error);
                alert(`Error: ${resultado.error}`);
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
            alert('Ocurrió un error en el registro');
        }
    
        // Limpiar los campos del formulario de registro
        contenedorRegistro.querySelector('input[placeholder="Nombre"]').value = '';
        contenedorRegistro.querySelector('input[placeholder="Apellido Paterno"]').value = '';
        contenedorRegistro.querySelector('input[placeholder="Apellido Materno"]').value = '';
        contenedorRegistro.querySelector('input[placeholder="Correo Electrónico"]').value = '';
        contenedorRegistro.querySelector('input[placeholder="Contraseña"]').value = '';
    }
    
    // Procesar el formulario de inicio de sesión
    async function procesarFormularioInicioSesion() {
        const nombre = contenedorInicio.querySelector('input[placeholder="Nombre"]').value.trim();
        const contrasena = contenedorInicio.querySelector('input[placeholder="Contraseña"]').value.trim();

        // Crear el objeto de datos para el login
        const datosEmpleado = {
            tipo: 'empleado',
            nombre: nombre,
            contrasena: contrasena
        };

        const datosCliente = {
            tipo: 'cliente',
            nombre: nombre,
            contrasena: contrasena
        };

        console.log('Datos del formulario de inicio de sesión:', datosEmpleado);

        // Limpiar los campos del formulario de inicio de sesión
        contenedorInicio.querySelector('input[placeholder="Nombre"]').value = '';
        contenedorInicio.querySelector('input[placeholder="Contraseña"]').value = '';

        try {
            // Intentar iniciar sesión como empleado
            let response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosEmpleado)
            });

            let result = await response.json();

            // Si el login de empleado es exitoso, proceder
            if (response.ok) {
                console.log('Inicio de sesión exitoso como empleado:', result);
                localStorage.setItem('nombreUsuario', result.nombre);
                localStorage.setItem('tipoUsuario', result.tipo);
                localStorage.setItem('idUsuario', result.idUsuario);

                window.location.href = 'index.html';
            } else {
                // Si el login de empleado falla, intentar login como cliente
                console.log('Login como empleado fallido. Intentando como cliente...');

                response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosCliente)
                });

                result = await response.json();

                if (response.ok) {
                    console.log('Inicio de sesión exitoso como cliente:', result);
                    localStorage.setItem('nombreUsuario', result.nombre);
                    localStorage.setItem('tipoUsuario', result.tipo);
                    localStorage.setItem('idUsuario', result.idUsuario);
                    window.location.href = 'index.html';
                } else {
                    console.error('Error de inicio de sesión:', result.error);
                    // Mostrar mensaje de error en la interfaz si ambos intentos fallan
                }
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de inicio de sesión:', error);
            // Manejar errores de la red o de la API
        }
    }
});
