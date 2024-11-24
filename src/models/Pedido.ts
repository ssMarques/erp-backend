import { openDb } from '../database';

export async function getAllPedidos() {
  const db = await openDb();
  return db.all(`
    SELECT pedido.*, cliente.nome AS clienteNome
    FROM pedido
    JOIN cliente ON pedido.clienteId = cliente.id
  `);
}

export async function getPedidoById(id: number) {
  const db = await openDb();
  return db.get(`
    SELECT pedido.*, cliente.nome AS clienteNome
    FROM pedido
    JOIN cliente ON pedido.clienteId = cliente.id
    WHERE pedido.id = ?
  `, [id]);
}

export async function getLastPedidoId() {
  const db = await openDb();
  const result = await db.get(`SELECT MAX(id) as lastId FROM pedido`);
  return result?.lastId || 0; 
}

export async function createPedido(clienteId: number) {
  const db = await openDb();
  const status = 'Pendente';
  
  
  const lastId = await getLastPedidoId();
  const nextId = lastId + 1;
  
  
  await db.run(
    `INSERT INTO pedido (id, data, clienteId, status) VALUES (?, DATE('now'), ?, ?)`,
    [nextId, clienteId, status]
  );

  return { id: nextId, clienteId, status, data: new Date() };
}

export async function updatePedido(id: number) {
  const db = await openDb();
  const status = "Concluído";
  const result = await db.run(
    `UPDATE pedido
     SET status = ?
     WHERE id = ?`, 
    [status, id]
  );
  return { id: result.lastID };
}


export async function deletePedidoById(id: number) {
  const db = await openDb();
  return db.run(`DELETE FROM pedido WHERE id = ?`, [id]);
}

export async function filterPedidosByDateAndStatus(date: string, status: string) {
  const db = await openDb();
  return db.all(`
    SELECT pedido.*, cliente.nome AS clienteNome
    FROM pedido
    JOIN cliente ON pedido.clienteId = cliente.id
    WHERE pedido.data = ? AND pedido.status = ?`,
    [date, status]
  );
}
