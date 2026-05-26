const tbody = document.querySelector('#data');
const getProducts = async () => {
    let url = 'http://localhost:3004/produtos?';

    // filtros
    const tipo = document.querySelector('#tipo').value;
    const status = document.querySelector('#status').value;
    const nome = document.querySelector('#nome').value;

    if (tipo !== '') url += 'tipo=' + tipo + '&';
    if (status !== '') url += 'status=' + status + '&';
    if (nome !== '') url += 'busca=' + nome + '&';

    const response = await fetch(url);
    const products = await response.json();
    
    // limpar o tbody
    tbody.innerHTML = '';

    // preencher o tbody com os produtos retornado do backend
    for (const p of products) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>${p.tipo}</td>
            <td>${p.status}</td>
            <td>${p.descricao}</td>
        `;
        tbody.appendChild(tr);
    }
}
getProducts();