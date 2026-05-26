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

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
