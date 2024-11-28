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
        { id: 'telefono', label: 'Teléfono', type: 'number', class: 'sucnac' }
    ];
    const camposEmpleado = [
        { id: 'nombre', label: 'Nombre', type: 'text', class: 'sucnac' },
        { id: 'apellidop', label: 'Apellido Paterno', type: 'text', class: 'sucnac' },
        { id: 'apellidom', label: 'Apellido Materno', type: 'text', class: 'sucnac' },
        { id: 'correo', label: 'Correo', type: 'email', class: 'sucnac'},
        { id: 'direccion', label: 'Dirección', type: 'text', class: 'sucnac'},
        { id: 'sucursal', label: 'Sucursal', type: 'text' },
        { id: 'sueldo', label: 'Sueldo', type: 'number'},
        { id: 'telefono', label: 'Teléfono', type: 'number', class: 'sucnac'}
    ];

    function generarCampos(campos) {
        camposUsuario.innerHTML = '';
        campos.forEach(campo => {
            const div = document.createElement('div');
            div.classList.add('input-container');
            div.innerHTML = `
                <label for="${campo.id}">${campo.label}</label>
                <input type="${campo.type}" id="${campo.id}" name="${campo.id}" class="${campo.class}" required disabled>
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
        const tipoUsuario = localStorage.getItem('tipoUsuario'); // Obtener el tipo de usuario (cliente o empleado)
        const idUsuario = localStorage.getItem('idUsuario');

        // Seleccionar los inputs dependiendo del tipo de usuario
        const inputsSucnac = document.querySelectorAll('#userForm input.sucnac');  // Inputs con la clase 'sucnac'
        const esEdicion = inputsSucnac[0].disabled;  // Verificar si el primer input con clase 'sucnac' está deshabilitado
    
        // Habilitar o deshabilitar los inputs con clase 'sucnac'
        inputsSucnac.forEach(input => {
            input.disabled = !input.disabled;
        });
    
        // Cambiar el texto del botón entre 'Editar' y 'Guardar' según el estado de los inputs
        editarBtn.textContent = esEdicion ? 'Guardar' : 'Editar';
    
        // Lógica para guardar los datos cuando el botón cambia a "Guardar"
        if (!esEdicion) {
            const datos = {}; // Objeto donde guardaremos los datos a enviar
    
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
                datos.tipoUsuario = tipoUsuario;
            }
    
            console.log('Datos guardados:', datos);
            fetch(`http://localhost:3000/updateUsuario/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),  // Enviamos los datos en formato JSON
            })
            .then(response => response.json())
            .then(data => {
                console.log('Datos guardados correctamente:', data);
            })
            .catch(error => {
                console.error('Error al guardar los datos:', error);
            });
            window.location.href = 'userPage.html';
        }
    });

    salirBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    cargarDatosUsuario();
});