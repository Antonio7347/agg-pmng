// URL del backend. El navegador corre en tu máquina (no dentro de Docker),
// por eso se usa localhost y el puerto publicado del servicio.
const API_URL = 'http://localhost:8089/people';

const findAll = async () => {
    const tbody = document.getElementById('tbody');

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        const result = await response.json();

        tbody.innerHTML = '';
        result.data.forEach(itm => {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.textContent = itm.name; // textContent evita inyectar HTML
            tr.appendChild(td);
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
};

const savePerson = async () => {
    const input = document.getElementById('name');
    const name = input.value.trim();

    if (!name) {
        alert('Escribe un nombre');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        const result = await response.json();
        console.log(result);

        if (!result.error) {
            input.value = '';
            await findAll(); // refresca la tabla después de guardar
        }
    } catch (error) {
        console.log(error);
    }
};

findAll();
