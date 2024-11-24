import { openDb } from '../database';


export async function getAllProdutos() {
  const db = await openDb();
  return db.all('SELECT * FROM produto');
}

export async function deleteById(id: number) {
  const db = await openDb();
  return db.run('DELETE FROM produto WHERE id = ?', id);
}

export async function getProdutoById(id: number) {
  const db = await openDb();
  return db.get('SELECT * FROM produto WHERE id = ?', [id]);
}

export async function createProduto(
  nome: string,
  descricao: string,
  preco: number,
  quantidade: number,
  imagem: string,
  fornecedorId: number
) {
  const db = await openDb();


  const result = await db.run(
    `INSERT INTO produto (nome, descricao, preco, quantidade, imagem, fornecedorId)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, descricao, preco, quantidade, imagem, fornecedorId]
  );


  const produtoId = result.lastID;


  const dataAtual = new Date().toISOString();

  await db.run(
    `INSERT INTO transacao (tipo, valor, produtoId, data)
     VALUES (?, ?, ?, ?)`,
    ['Entrada', preco * quantidade, produtoId, dataAtual]
  );

  return { produtoId, mensagem: 'Produto e transação de entrada criados com sucesso!' };
}


export async function updateProduto(
  id: number,
  nome: string,
  descricao: string,
  preco: number,
  quantidade: number,
  imagem: string,
  fornecedorId: number
) {
  const db = await openDb();
  return db.run(
    `UPDATE produto
     SET nome = ?, descricao = ?, preco = ?, quantidade = ?, imagem = ?, fornecedorId = ?
     WHERE id = ?`,
    [nome, descricao, preco, quantidade, imagem, fornecedorId, id]
  );
}