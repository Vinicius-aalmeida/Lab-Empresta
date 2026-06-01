const tbody = document.querySelector('#data');
const API = 'http://localhost:3004/produtos';

// Mostra mensagem de feedback
const mostrarMensagem = (texto, erro = false) => {
    const div = document.querySelector('#mensagem');
    div.textContent = texto;
    div.style.display = 'block';
    div.style.backgroundColor = erro ? '#c0392b' : '#27ae60';
    setTimeout(() => div.style.display = 'none', 3000);
};

// Lista os produtos com filtros
const getProducts = async () => {
    let url = API + '?';
    const tipo = document.querySelector('#tipo').value;
    const status = document.querySelector('#status').value;
    const nome = document.querySelector('#nome').value;

    if (tipo !== '') url += 'tipo=' + tipo + '&';
    if (status !== '') url += 'status=' + status + '&';
    if (nome !== '') url += 'busca=' + nome + '&';

    const response = await fetch(url);
    const products = await response.json();

    tbody.innerHTML = '';

    for (const p of products) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>${p.tipo}</td>
            <td>${p.status}</td>
            <td>${p.descricao}</td>
            <td>
                <button onclick="editarProduto(${p.id})">Editar</button>
                <button onclick="excluirProduto(${p.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
};

// Salva (cria ou atualiza)
const salvarProduto = async () => {
    const id = document.querySelector('#edit-id').value;
    const nome = document.querySelector('#form-nome').value;
    const tipo = document.querySelector('#form-tipo').value;
    const status = document.querySelector('#form-status').value;
    const descricao = document.querySelector('#form-descricao').value;

    if (!nome || !tipo) {
        mostrarMensagem('Nome e tipo são obrigatórios!', true);
        return;
    }

    const body = { nome, tipo, status, descricao };

    // Se tem id, é edição (PUT), senão é criação (POST)
    const url = id ? `${API}/${id}` : API;
    const method = id ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        mostrarMensagem(id ? 'Produto atualizado!' : 'Produto cadastrado!');
        cancelarEdicao();
        getProducts();
    } else {
        const erro = await response.json();
        mostrarMensagem(erro.erro || 'Erro ao salvar', true);
    }
};

// Preenche o formulário para edição
const editarProduto = async (id) => {
    const response = await fetch(`${API}/${id}`);
    const p = await response.json();

    document.querySelector('#edit-id').value = p.id;
    document.querySelector('#form-nome').value = p.nome;
    document.querySelector('#form-tipo').value = p.tipo;
    document.querySelector('#form-status').value = p.status;
    document.querySelector('#form-descricao').value = p.descricao;
    document.querySelector('#titulo-form').textContent = 'Editando Produto #' + p.id;

    // Rola até o formulário
    document.querySelector('#formulario').scrollIntoView({ behavior: 'smooth' });
};

// Limpa o formulário
const cancelarEdicao = () => {
    document.querySelector('#edit-id').value = '';
    document.querySelector('#form-nome').value = '';
    document.querySelector('#form-tipo').value = '';
    document.querySelector('#form-status').value = 'disponivel';
    document.querySelector('#form-descricao').value = '';
    document.querySelector('#titulo-form').textContent = 'Cadastrar Produto';
};

// Exclui um produto
const excluirProduto = async (id) => {
    const confirmou = confirm(`Tem certeza que deseja excluir o produto #${id}?`);
    if (!confirmou) return;

    const response = await fetch(`${API}/${id}`, { method: 'DELETE' });

    if (response.ok || response.status === 204) {
        mostrarMensagem('Produto excluído!');
        getProducts();
    } else {
        mostrarMensagem('Erro ao excluir', true);
    }
};

getProducts();