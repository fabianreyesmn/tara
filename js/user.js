document.addEventListener('DOMContentLoaded', function() {
    const camposUsuario = document.getElementById('camposUsuario');
    const editarBtn = document.getElementById('editarBtn');
    const salirBtn = document.getElementById('salirBtn');

    const camposCliente = [
        { id: 'nombre', label: 'Nombre', type: 'text', class: 'sucnac'},
        { id: 'apellidop', label: 'Apellido Paterno', type: 'text', class: 'sucnac' },
        { id: 'apellidom', label: 'Apellido Materno', type: 'text', class: 'sucnac' },
        { id: 'correo', label: 'Correo', type: 'email', class: 'sucnac' },
        { id: 'direccion', label: 'Dirección', type: 'text', class: 'sucnac' },
        { id: 'nacionalidad', label: 'Nacionalidad', type: 'text', class: 'sucnac' },
        { id: 'telefono', label: 'Teléfono', type: 'text', class: 'sucnac', pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}'},
        { id: 'genero', label: 'Sexo', type: 'text', class: 'sucnac', pattern: '.{1}'}
    ];
    const camposEmpleado = [
        { id: 'nombre', label: 'Nombre', type: 'text', class: 'sucnac' },
        { id: 'apellidop', label: 'Apellido Paterno', type: 'text', class: 'sucnac' },
        { id: 'apellidom', label: 'Apellido Materno', type: 'text', class: 'sucnac' },
        { id: 'correo', label: 'Correo', type: 'email', class: 'sucnac'},
        { id: 'direccion', label: 'Dirección', type: 'text', class: 'sucnac'},
        { id: 'sucursal', label: 'Sucursal', type: 'text' },
        { id: 'sueldo', label: 'Sueldo', type: 'number'},
        { id: 'telefono', label: 'Teléfono', type: 'text', class: 'sucnac', pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}'},
    ];

    function generarCampos(campos) {
        camposUsuario.innerHTML = '';
        campos.forEach(campo => {
            const div = document.createElement('div');
            div.classList.add('input-container');
            div.innerHTML = `
                <label for="${campo.id}">${campo.label}</label>
                <input type="${campo.type}" id="${campo.id}" name="${campo.id}" class="${campo.class}" pattern="${campo.pattern}" required disabled>
            `;
            camposUsuario.appendChild(div);
        });
    }

    async function cargarDatosUsuario() {
        const tipoUsuario = localStorage.getItem('tipoUsuario');
        const idUsuario = localStorage.getItem('idUsuario'); // Asegúrate de almacenar el ID del usuario
    
        // Verificar si el tipo y el ID del usuario están disponibles
        if (!tipoUsuario || !idUsuario) {
            alert('Tipo de usuario o ID de usuario no encontrados');
            return;
        }
    
        try {
            // Hacer la solicitud a la API usando el tipo y el ID en la ruta
            const response = await fetch(`http://localhost:3000/usuario/${tipoUsuario}/${idUsuario}`);
            
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error al obtener los datos del usuario');
            }
    
            // Obtener los datos del usuario en formato JSON
            const datos = await response.json();
            console.log('Datos del usuario:', datos);
    
            // Generar campos dinámicamente según el tipo de usuario
            generarCampos(tipoUsuario === 'cliente' ? camposCliente : camposEmpleado);
    
            // Rellenar los valores de los campos con los datos obtenidos
            Object.keys(datos).forEach(campo => {
                // Buscar el input con el id correspondiente, asegurándose de que las claves coincidan en minúsculas
                const input = document.getElementById(campo.toLowerCase()); // Convertir a minúsculas
                if (input) {
                    input.value = datos[campo] || ''; // Asignar valor, o una cadena vacía si no hay datos
                }
            });
        } catch (error) {
            console.error('Error al cargar datos del usuario:', error);
            alert('Error al cargar datos del usuario');
        }
    }

    editarBtn.addEventListener('click', function() {
        const tipoUsuario = localStorage.getItem('tipoUsuario');
        const idUsuario = localStorage.getItem('idUsuario');

        const inputsSucnac = document.querySelectorAll('#userForm input.sucnac');
        const esEdicion = inputsSucnac[0].disabled;

        inputsSucnac.forEach(input => {
            input.disabled = !input.disabled;
        });

        editarBtn.textContent = esEdicion ? 'Guardar' : 'Editar';

        if (!esEdicion) {
            // First, validate the form
            if (!validarFormulario(tipoUsuario)) {
                // If validation fails, re-disable inputs and change button back
                inputsSucnac.forEach(input => {
                    input.disabled = true;
                });
                editarBtn.textContent = 'Editar';
                return;
            }

            const datos = {}; 

            // Dependiendo del tipo de usuario, obtenemos los datos de los inputs correspondientes
            if (tipoUsuario === 'empleado') {
                datos.nombre = document.querySelector('input[name="nombre"]').value;
                datos.apellidop = document.querySelector('input[name="apellidop"]').value;
                datos.apellidom = document.querySelector('input[name="apellidom"]').value;
                datos.correo = document.querySelector('input[name="correo"]').value;
                datos.direccion = document.querySelector('input[name="direccion"]').value;
                datos.sueldo = document.querySelector('input[name="sueldo"]').value;
                datos.telefono = document.querySelector('input[name="telefono"]').value;
                datos.tipoUsuario = tipoUsuario;
            } else if (tipoUsuario === 'cliente') {
                datos.nombre = document.querySelector('input[name="nombre"]').value;
                datos.apellidop = document.querySelector('input[name="apellidop"]').value;
                datos.apellidom = document.querySelector('input[name="apellidom"]').value;
                datos.correo = document.querySelector('input[name="correo"]').value;
                datos.direccion = document.querySelector('input[name="direccion"]').value;
                datos.nacionalidad = document.querySelector('input[name="nacionalidad"]').value;
                datos.telefono = document.querySelector('input[name="telefono"]').value;
                datos.genero = document.querySelector('input[name="genero"]').value.trim() || 'N';
                datos.tipoUsuario = tipoUsuario;
            }

            console.log('Datos guardados:', datos);
            fetch(`http://localhost:3000/updateUsuario/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Datos guardados correctamente:', data);
                window.location.href = 'userPage.html';
            })
            .catch(error => {
                console.error('Error al guardar los datos:', error);
            });
        }
    });

    // Validation function
    function validarCampo(input, regex, mensajeError, opcional = false) {
        // Si el campo es opcional y está vacío, se considera válido
        if (opcional && input.value.trim() === '') {
            input.classList.remove('error');
            return true;
        }
    
        // Si no está vacío, aplicar la validación normal
        if (!regex.test(input.value.trim())) {
            input.classList.add('error');
            alert(mensajeError);
            cargarDatosUsuario();
            return false;
        }
        input.classList.remove('error');
        return true;
    }

    // Validation function for the entire form
    function validarFormulario(tipoUsuario) {
        let esValido = true;

        const nombre = document.querySelector('input[name="nombre"]');
        esValido = validarCampo(
            nombre,
            /^[a-zA-Z\s]{1,20}$/,
            'El nombre debe contener solo letras y tener un máximo de 20 caracteres.'
        ) && esValido;

        const apellidop = document.querySelector('input[name="apellidop"]');
        esValido = validarCampo(
            apellidop,
            /^[a-zA-Z\s]{1,50}$/,
            'El apellido paterno debe contener solo letras y tener un máximo de 50 caracteres.'
        ) && esValido;

        const apellidom = document.querySelector('input[name="apellidom"]');
        esValido = validarCampo(
            apellidom,
            /^[a-zA-Z\s]{1,50}$/,
            'El apellido materno debe contener solo letras y tener un máximo de 50 caracteres.',
            true
        ) && esValido;

        const telefono = document.querySelector('input[name="telefono"]');
        esValido = validarCampo(
            telefono,
            /^\d{3}-\d{3}-\d{4}$/,
            'El teléfono debe tener el formato 000-000-0000.',
            true
        ) && esValido;

        const correo = document.querySelector('input[name="correo"]');
        esValido = validarCampo(
            correo,
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'El correo no es válido.',
            true
        ) && esValido;

        const direccion = document.querySelector('input[name="direccion"]');
        esValido = validarCampo(
            direccion,
            /^.{1,100}$/,
            'La dirección debe tener un máximo de 100 caracteres.',
            true
        ) && esValido;

        if (tipoUsuario === 'cliente') {
            const genero = document.querySelector('input[name="genero"]');
            esValido = validarCampo(
                genero, 
                /^[MF]$/,
                'El valor debe ser "M" o "F".',
                true
            ) && esValido;
            const nacionalidad = document.querySelector('input[name="nacionalidad"]');
            esValido = validarCampo(
                nacionalidad,
                /^[a-zA-Z\s]{1,25}$/,
                'La nacionalidad debe contener solo letras y tener un máximo de 25 caracteres.',
                true
            ) && esValido;
        }

        return esValido;
    }

    salirBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    cargarDatosUsuario();
});