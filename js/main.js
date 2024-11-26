document.addEventListener('DOMContentLoaded', () => {
    // Cargar el header dinámicamente desde el archivo header.html
    fetch('header.html')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el header.');
            return response.text();
        })
        .then(data => {
            document.querySelector('#header-container').innerHTML = data;

            // Verificar si el nombre de usuario está almacenado en localStorage
            const nombreUsuario = localStorage.getItem('nombreUsuario');
            console.log('nombre Usuario:', nombreUsuario);

            if (nombreUsuario) {
                // Si el nombre está almacenado, actualizar el texto del nombre del usuario
                const usuarioElemento = document.getElementById('nombreUsuario');
                usuarioElemento.textContent = nombreUsuario; 
                usuarioElemento.style.display = 'inline';     // Asegurarse de que el nombre sea visible
            }
        })
        .catch(error => console.error('Error cargando el header:', error));

    // Cargar el footer si lo necesitas de la misma manera
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
