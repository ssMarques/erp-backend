import { openDb } from '../database';

export async function getAllClientes() {
  const db = await openDb();
  return db.all('SELECT * FROM cliente');
}

export async function getClienteById(id: number) {
  const db = await openDb();
  return db.get('SELECT * FROM cliente WHERE id = ?', [id]);
}

export async function getClienteByCpfCnpj(cpf_cnpj: string) {
  const db = await openDb();
  return db.get('SELECT * FROM cliente WHERE cpf_cnpj = ?', [cpf_cnpj]);
}

export async function createCliente(
  nome: string,
  cpf_cnpj: string,
  contato: string,
  endereco: string
) {
  const db = await openDb();
  return db.run(
    `INSERT INTO cliente (nome, cpf_cnpj, contato, endereco)
     VALUES (?, ?, ?, ?)`,
    [nome, cpf_cnpj, contato, endereco]
  );
}

export async function updateCliente(
  id: number,
  nome: string,
  cpf_cnpj: string,
  contato: string,
  endereco: string
) {
  const db = await openDb();
  return db.run(
    `UPDATE cliente
     SET nome = ?, cpf_cnpj = ?, contato = ?, endereco = ?
     WHERE id = ?`,
    [nome, cpf_cnpj, contato, endereco, id]
  );
}

export async function deleteClienteById(id: number) {
  const db = await openDb();
  const clienteTemTransacoes = await db.get(
    'SELECT 1 FROM transacao WHERE id = ? LIMIT 1',
    [id]
  );
  
  if (clienteTemTransacoes) {
    return db.run(`UPDATE cliente SET ativo = 0 WHERE id = ?`, [id]); 
  }

  return db.run('DELETE FROM cliente WHERE id = ?', id);
}
