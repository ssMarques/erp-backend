import { openDb } from '../database';

// Função para criar um item de pedido
export async function createPedidoItem(pedidoId: number, produtoId: number, quantidade: number, precoUnitario: number) {
  if (quantidade <= 0 || precoUnitario <= 0) throw new Error('Quantidade deve ser maior que 0 e preço positivo');

  const db = await openDb();

  await db.run(
    `INSERT INTO pedidoItem (pedidoId, produtoId, quantidade, precoUnitario) VALUES (?, ?, ?, ?)`,
    [pedidoId, produtoId, quantidade, precoUnitario]
  );

  
  const totalCompra = await calcularTotalCompra(pedidoId);
  await db.run(
    `UPDATE pedido SET total = ? WHERE id = ?`,
    [totalCompra, pedidoId]
  );

  
  await db.run(
    `UPDATE produto SET quantidade = quantidade - ? WHERE id = ?`,
    [quantidade, produtoId]
  );

  
  const tipoTransacao = 'Saída'; 

  
  await db.run(
    `INSERT INTO transacao (valor, tipo, produtoId, pedidoId, data) VALUES (?, ?, ?, ?, ?)`,
    [totalCompra, tipoTransacao, produtoId, pedidoId, new Date().toISOString()] 
  );

}

// Função para obter todos os itens de pedido
export async function getAllPedidoItems() {
  const db = await openDb();
  return db.all(`SELECT * FROM pedidoItem`);
}

// Função para obter um item de pedido pelo ID
export async function getPedidoItemById(id: number) {
  const db = await openDb();
  return db.get(`SELECT * FROM pedidoItem WHERE id = ?`, [id]);
}

// Função para atualizar um item de pedido
export async function updatePedidoItem(id: number, quantidade: number, precoUnitario: number) {
  if (quantidade <= 0 || precoUnitario <= 0) throw new Error('Quantidade deve ser maior que 0 e preço positivo');
  
  const db = await openDb();
  return db.run(
    `UPDATE pedidoItem SET quantidade = ?, precoUnitario = ? WHERE id = ?`,
    [quantidade, precoUnitario, id]
  );
}

// Função para deletar um item de pedido pelo ID
export async function deletePedidoItemById(id: number) {
  const db = await openDb();
  return db.run(`DELETE FROM pedidoItem WHERE id = ?`, [id]);
}

// Função para calcular o total da compra de um pedido
export async function calcularTotalCompra(pedidoId: number) {
  const db = await openDb();
  
  
  const pedidoItems = await db.all(
    `SELECT quantidade, precoUnitario FROM pedidoItem WHERE pedidoId = ?`,
    [pedidoId]
  );
  
  const totalCompra = pedidoItems.reduce((total, item) => {
    return total + (item.quantidade * item.precoUnitario);
  }, 0);
  
  return totalCompra;
}