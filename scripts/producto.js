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
        cargarProds();
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('prod-cont').innerHTML = '<p class="error">Error al cargar producto</p>';
    }
});

function mostrarProd(p) {
    const html = `
        <div class="principal">
            <div class="imagen">
                <img src="${p.Imagen_P}" alt="${p.Nombre_P}">
            </div>
            <div class="informacion">
                <h1>${p.Nombre_P}</h1>
                <p><i class="fa-solid fa-fingerprint"></i> ${p.ID_Producto}</p>
                <p>${p.Descripcion_P}</p>
                <p>${p.Existencias_P} unidades</p>
                <p><strong>Categoría:</strong> ${p.Categoria_P}</p>
                <p><strong>Tallas Disponibles:</strong> ${p.Tallas_P}</p>
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


async function cargarProds(filtros = {}) {
    try {
        const prods = await window.api.obtProds(filtros);
        mostrarProds(prods);
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('prods').innerHTML = '<p class="error">Error al cargar productos</p>';
    }
}

function mostrarProds(prods) {
    const cont = document.getElementById('prods');
    
    if (prods.length === 0) {
        cont.innerHTML = '<p>0 resultados</p>';
        return;
    }

    const html = prods.map(p => {
        const getExistenciasClase = () => {
            if (p.Existencias_P > 125) return 'verde';
            if (p.Existencias_P >= 50 && p.Existencias_P <= 125) return 'gris';
            if (p.Existencias_P < 50 && p.Existencias_P > 0) return 'naranja';
            return 'rojo';
        };

        const renderPrecio = () => {
            if (p.Tiene_Descuento_P) {
                return `
                    <div class="centrar-card">
                        <p class="tachado"><i class="fa-solid fa-dollar-sign"></i> ${p.Precio_P}</p>
                        <p><i class="fa-solid fa-dollar-sign"></i> ${(p.Precio_P - p.Descuento_P).toFixed(2)}</p>
                    </div>
                `;
            }
            return `<p><i class="fa-solid fa-dollar-sign"></i> ${p.Precio_P}</p>`;
        };

        const renderBotonCarrito = () => {
            const idSesion = localStorage.getItem('idUsr');
            if (idSesion) {
                return `
                    <button type="button" onclick="addCarrito(${p.ID_Producto})" class="agregar-p">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                `;
            }
            return `
                <button type="button" class="no-agregar-p">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            `;
        };

        return `
            <div class="card-producto">
                <form action="producto.html" method="get">
                    <input type="hidden" name="id" value="${p.ID_Producto}">
                    <button type="submit" class="btn-imagen">
                        <img src="${p.Imagen_P}" alt="${p.Nombre_P}">
                    </button>
                </form>
                <h4>${p.Nombre_P}</h4>
                <div class="centrar-card">
                    <p><i class="fa-solid fa-fingerprint"></i> ${p.ID_Producto}</p>
                    <p class="${getExistenciasClase()}">${p.Existencias_P} pzas.</p>
                    <form id="agregar-car${p.ID_Producto}">
                        <input type="hidden" name="ID_Producto" value="${p.ID_Producto}">
                        ${renderBotonCarrito()}
                    </form>
                </div>
                ${renderPrecio()}
                <p>${p.Descripcion_P}</p>
                <p><strong>Categoría:</strong> ${p.Categoria_P}</p>
                <p><strong>Tallas:</strong> ${p.Tallas_P}</p>
            </div>
        `;
    }).join('');

    cont.innerHTML = `<div class="cuadricula">${html}</div>`;
}

function getClaseExist(exist) {
    if (exist > 125) return 'verde';
    if (exist >= 50) return 'gris';
    if (exist > 0) return 'naranja';
    return 'rojo';
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
        window.api.addCarr(idUsr, idProd)
            .then(response => {
                alert('Producto agregado al carrito');
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    } catch (err) {
        console.error('Error:', err);
    }
}