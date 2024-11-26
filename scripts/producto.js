document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const idProd = params.get('id');
   
    if (!idProd) {
        document.getElementById('prod-cont').innerHTML = '<p>Producto no encontrado</p>';
        return;
    }
    try {
        const prod = await window.api.obtProd(idProd);
        mostrarProd(prod);
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('prod-cont').innerHTML = '<p class="error">Error al cargar producto</p>';
    }
});

function mostrarProd(p) {
    const html = `
        <div class="principal">
            <div class="imagen">
                <img src="fotos/${p.Imagen_P}" alt="${p.Nombre_P}">
            </div>
            <div class="informacion">
                <h1>${p.Nombre_P}</h1>
                <p><i class="fa-solid fa-fingerprint"></i> ${p.ID_Producto}</p>
                <p>${p.Descripcion_P}</p>
                <p>${p.Existencias_P} unidades</p>
                ${p.Tiene_Descuento_P ? `
                    <div class="centrar-precio">
                        <p class="tachado"><i class="fa-solid fa-dollar-sign"></i> ${p.Precio_P}</p>
                        <p><i class="fa-solid fa-dollar-sign"></i> ${(p.Precio_P - p.Descuento_P).toFixed(2)}</p>
                    </div>
                ` : `
                    <p><i class="fa-solid fa-dollar-sign"></i> ${p.Precio_P}</p>
                `}
               
                <form id="agregar-car${p.ID_Producto}">
                    <input type="hidden" name="ID_Producto" value="${p.ID_Producto}">
                    ${isLoggedIn() ? `
                        <button type="button" onclick="agregarAlCarrito(${p.ID_Producto})" class="agregar-p">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    ` : `
                        <button name="btnMostrarMenu" type="button" class="no-agregar-p">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    `}
                </form>
            </div>
        </div>`;
    document.getElementById('prod-cont').innerHTML = html;
}

function isLoggedIn() {
    return localStorage.getItem('id') !== null;
}

function agregarAlCarrito(idProd) {
    const idUsr = localStorage.getItem('id');
    if (!idUsr) {
        return;
    }
    try {
        window.api.addCarr(idUsr, idProd);
    } catch (err) {
        console.error('Error:', err);
    }
}