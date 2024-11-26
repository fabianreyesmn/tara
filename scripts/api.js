const API_URL = 'http://localhost:3000';

async function obtProds(filtros = {}) {
    const params = new URLSearchParams();
    
    if (filtros.pmin) params.append('pmin', filtros.pmin);
    if (filtros.pmax) params.append('pmax', filtros.pmax);
    if (filtros.emin) params.append('emin', filtros.emin);
    if (filtros.desc !== undefined) params.append('desc', filtros.desc);
    if (filtros.ord) params.append('ord', filtros.ord);
    
    try {
        const res = await fetch(`${API_URL}/prods?${params}`);
        if (!res.ok) throw new Error('Error de red');
        return await res.json();
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}

async function obtProd(idProd) {
    try {
        const res = await fetch(`${API_URL}/prod/${idProd}`);
        if (!res.ok) throw new Error('Error de red');
        return await res.json();
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}

async function addCarr(idUsr, idProd, cant = 1) {
    try {
        const res = await fetch(`${API_URL}/carr/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUsr, idProd, cant }),
        });
        if (!res.ok) throw new Error('Error de red');
        return await res.json();
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}

window.api = { obtProds, obtProd, addCarr };