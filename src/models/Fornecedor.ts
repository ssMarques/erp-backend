import { openDb } from '../database';

export async function getAllFornecedores() {
  const db = await openDb();
  return db.all('SELECT * FROM fornecedor');
}

export async function getFornecedorById(id: number) {
  const db = await openDb();
  return db.get('SELECT * FROM fornecedor WHERE id = ?', [id]);
}

export async function createFornecedor(
  nome: string,
  cnpj: string,
  contato: string,
  endereco: string
) {
  const db = await openDb();
  return db.run(
    `INSERT INTO fornecedor (nome, cnpj, contato, endereco)
     VALUES (?, ?, ?, ?)`,
    [nome, cnpj, contato, endereco]
  );
}

export async function updateFornecedor(
  id: number,
  nome: string,
  cnpj: string,
  contato: string,
  endereco: string
) {
  const db = await openDb();
  return db.run(
    `UPDATE fornecedor
     SET nome = ?, cnpj = ?, contato = ?, endereco = ?
     WHERE id = ?`,
    [nome, cnpj, contato, endereco, id]
  );
}

export async function getFornecedorByCnpj(cnpj: string) {
  const db = await openDb();
  return db.get('SELECT * FROM fornecedor WHERE cnpj = ?', [cnpj]);
}


export async function deleteFornecedorById(id: number) {
  const db = await openDb();
  return db.run('DELETE FROM fornecedor WHERE id = ?', id);
}
