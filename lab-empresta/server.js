import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

/* AQUI VAI MEU CRUD DE PRODUTOS */
const produtos = [];

/* Adicionano objetos no vetor produtos */
const p1 = {

    id: 1,
    nome: 'Alienware',
    tipo: 'notebook',
    status: 'disponivel',
    descricao: 'Notebook para processamento elevado'
}
const p2 = {
    id: 2,
    nome: 'Chromebook 14',
    tipo: 'notebook',
    status: 'manutencao',
    descricao: 'Notebook leve e portátil'
}
const p3 = {
    id: 3,
    nome: 'Epson Power Lite W39',
    tipo: 'projetor',
    status: 'emprestado',
    descricao: 'Projetor para apresentações'
}
const p4 = {
    id: 4,
    nome: 'red dragon',
    tipo: 'mause',
    status: 'disponivel',
    descricao: 'Mause para computadores e Notebook'
}
const p5 = {
    id: 5,
    nome: 'iped pro ',
    tipo: 'tablet',
    status: 'emprestado',
    descricao: 'Tablet para desenhos e anotações'
}
const p6 = {
    id: 6,
    nome: 'x master',
    tipo: 'mause',
    status: 'manutencao',
    descricao: 'Mause ergonômico para jogos'
}
const p7 = {
    id: 7,
    nome: 'gol pro',
    tipo: 'camera',
    status: 'disponivel',
    descricao: 'Câmera para gravar videos e tirar fotos'
}
const p8 = {
    id: 8,
    nome: 'Headset HyperX',
    tipo: 'audio',
    status: 'emprestado',
    descricao: 'Headset com microfone para comunicação e reuniõestações'
}
const p9 = {
    id: 9,
    nome: 'Raspberry Pi 4',
    tipo: 'minicomputador',
    status: 'manutencao',
    descricao: 'Minicomputador para projetos de programação'
}
const p10 = {
    id: 10,
    nome: 'Logitech MX Master ',
    tipo: 'mouse',
    status: 'emprestado',
    descricao: 'Mouse ergonômico para produtividade'
}
// Insere todos os produtos no array de uma vez
produtos.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);

/* Endpoint para listar todos os produtos */
app.get('/produtos', (req, res) => {
    // verificar os parâmetros de consulta para filtrar
    const { status, tipo, busca} = req.query;
    let resultado = produtos;

    // filtrar por status
    if(status) resultado = resultado.filter(p => p.status === status);
    // filtrar por tipo
    if(tipo) resultado = resultado.filter(p => p.tipo === tipo);  
    // filtrar por busca no nome ou descrição
    //toLowerCase ignora as letras maisculas e minusculas 
    if(busca) resultado = resultado.filter(p =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) || 
    // filtro por descrição
        p.descricao.toLowerCase().includes(busca.toLowerCase()));

    res.json(resultado);
});
// GET /produtos/:id — retorna um produto pelo id
app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

    res.json(produto);
});

// POST /produtos — cria um novo produto
app.post('/produtos', (req, res) => {
    const { nome, tipo, status, descricao } = req.body;

    // Validações
    if (!nome || !tipo) {
        return res.status(400).json({ erro: 'Nome e tipo são obrigatórios' });
    }

    const statusValidos = ['disponivel', 'emprestado', 'manutencao'];
    if (status && !statusValidos.includes(status)) {
        return res.status(400).json({ erro: 'Status inválido. Use: disponivel, emprestado ou manutencao' });
    }

    // Gera o id automaticamente
    const id = Math.max(0, ...produtos.map(p => p.id)) + 1;

    const novoProduto = {
        id,
        nome,
        tipo,
        status: status || 'disponivel',
        descricao: descricao || ''
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// PUT /produtos/:id — atualiza um produto existente
app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    const statusValidos = ['disponivel', 'emprestado', 'manutencao'];
    if (req.body.status && !statusValidos.includes(req.body.status)) {
        return res.status(400).json({ erro: 'Status inválido. Use: disponivel, emprestado ou manutencao' });
    }

    produtos[index] = { ...produtos[index], ...req.body, id };
    res.json(produtos[index]);
});

// DELETE /produtos/:id — remove um produto
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    produtos.splice(index, 1);
    res.status(204).send();
});

const PORT = 3004;
app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`);
    console.log(` ${produtos.length} produtos carregados`);
});