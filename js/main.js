document.addEventListener('DOMContentLoaded', () => {
    // Cargar el header
    fetch('header.html')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el header.');
            return response.text();
        })
        .then(data => {
            document.querySelector('#header-container').innerHTML = data;

            const nombreUsuario = localStorage.getItem('nombreUsuario');
            const usuarioElemento = document.getElementById('nombreUsuario');
            const iniciaSesionElemento = document.getElementById('iniciarSesionI');
            const tipoUsuario = localStorage.getItem('tipoUsuario');

            if (nombreUsuario) {
                usuarioElemento.textContent = nombreUsuario;
                usuarioElemento.style.display = 'inline';
                iniciaSesionElemento.innerHTML = '<i class="fa-solid fa-right-from-bracket" style="color: #FFFFFF;"></i> CERRAR SESION';
                iniciaSesionElemento.href = "#";
                iniciaSesionElemento.setAttribute('onclick', 'cerrarSesion()');

                // Obtiene los elementos por su ID
                const aABC = document.getElementById('ABC');
                const aConsultas = document.getElementById('Consultas');

                // Si tipoUsuario es "empleado", muestra las etiquetas <a>, de lo contrario las oculta
                if (tipoUsuario === 'empleado') {
                    if (aABC) aABC.style.display = 'inline';  // Muestra la etiqueta <a> con ID "ABC"
                    if (aConsultas) aConsultas.style.display = 'inline'; // Muestra la etiqueta <a> con ID "Consultas"
                } else {
                    if (aABC) aABC.style.display = 'none';  // Oculta la etiqueta <a> con ID "ABC"
                    if (aConsultas) aConsultas.style.display = 'none'; // Oculta la etiqueta <a> con ID "Consultas"
                }
            }
        })
        .catch(error => console.error('Error cargando el header:', error));

    // Cargar el footer
    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el footer.');
            return response.text();
        })
        .then(data => {
            document.querySelector('#footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error cargando el footer:', error));
});

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');

    const usuarioElemento = document.getElementById('nombreUsuario');
    if (usuarioElemento) {
        usuarioElemento.style.display = 'none';
    }

    const iniciaSesionElemento = document.getElementById('iniciarSesionI');
    iniciaSesionElemento.innerHTML = '<i class="fa-solid fa-right-to-bracket" style="color: #FFFFFF;"></i> INICIAR SESION';
    iniciaSesionElemento.href = "login.html"; // Redirige al login al hacer clic

    setTimeout(() => {
        window.location.href = "index.html"; // Redirige a la página principal después de cerrar sesión
    }, 100);
}
