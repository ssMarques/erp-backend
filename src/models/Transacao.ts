import { openDb } from '../database';

// Função para obter todas as transações
export async function getAllTransacoes() {
  const db = await openDb();
  return db.all('SELECT * FROM transacao');
}

// Função para obter uma transação pelo ID
export async function getTransacaoById(id: number) {
  const db = await openDb();
  return db.get('SELECT * FROM transacao WHERE id = ?', [id]);
}

// Função para obter transações por produto
export async function getTransacoesByProdutoId(produtoId: number) {
  const db = await openDb();
  return db.all('SELECT * FROM transacao WHERE produtoId = ?', [produtoId]);
}

// Função para obter transações por pedido
export async function getTransacoesByPedidoId(pedidoId: number) {
  const db = await openDb();
  return db.all('SELECT * FROM transacao WHERE pedidoId = ?', [pedidoId]);
}

// Função para criar uma transação
export async function createTransacao(
  valor: number,
  tipo: 'Entrada' | 'Saída',
  produtoId: number | null,
  pedidoId: number | null
) {
  if (valor <= 0) {
    throw new Error('O valor da transação deve ser maior que 0');
  }

  if (tipo !== 'Entrada' && tipo !== 'Saída') {
    throw new Error('O tipo de transação deve ser "Entrada" ou "Saída"');
  }

  const db = await openDb();
  const data = new Date().toISOString(); // Data da transação

  return db.run(
    `INSERT INTO transacao (valor, tipo, produtoId, pedidoId, data)
     VALUES (?, ?, ?, ?, ?)`,
    [valor, tipo, produtoId, pedidoId, data]
  );
}

// Função para atualizar uma transação
export async function updateTransacao(
  id: number,
  valor: number,
  tipo: 'Entrada' | 'Saída',
  produtoId: number | null,
  pedidoId: number | null
) {
  if (valor <= 0) {
    throw new Error('O valor da transação deve ser maior que 0');
  }

  if (tipo !== 'Entrada' && tipo !== 'Saída') {
    throw new Error('O tipo de transação deve ser "Entrada" ou "Saída"');
  }

  const db = await openDb();
  return db.run(
    `UPDATE transacao
     SET valor = ?, tipo = ?, produtoId = ?, pedidoId = ?
     WHERE id = ?`,
    [valor, tipo, produtoId, pedidoId, id]
  );
}

// Função para excluir uma transação pelo ID
export async function deleteTransacaoById(id: number) {
  const db = await openDb();
  return db.run('DELETE FROM transacao WHERE id = ?', [id]);
}

// Função para associar transações a produtos e pedidos
export async function associateTransacaoWithProduto(
  transacaoId: number,
  produtoId: number
) {
  const db = await openDb();
  return db.run(
    `UPDATE transacao
     SET produtoId = ?
     WHERE id = ?`,
    [produtoId, transacaoId]
  );
}

export async function associateTransacaoWithPedido(
  transacaoId: number,
  pedidoId: number
) {
  const db = await openDb();
  return db.run(
    `UPDATE transacao
     SET pedidoId = ?
     WHERE id = ?`,
    [pedidoId, transacaoId]
  );
}
