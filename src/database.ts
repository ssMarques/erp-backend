import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function openDb() {
  return open({
    filename: './src/database.sqlite',
    driver: sqlite3.Database,
  });
}

export async function createTables() {
  const db = await openDb();

  // Criação da tabela de produtos
  await db.exec(`
    CREATE TABLE IF NOT EXISTS produto (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      quantidade INTEGER NOT NULL,
      imagem TEXT,
      fornecedorId INTEGER,
      FOREIGN KEY (fornecedorId) REFERENCES fornecedor(id)
    )
  `);
  console.log('Table produto created');

  // Criação da tabela de fornecedores
  await db.exec(`
    CREATE TABLE IF NOT EXISTS fornecedor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cnpj TEXT NOT NULL UNIQUE,
      contato TEXT NOT NULL,
      endereco TEXT
    )
  `);
  console.log('Table fornecedor created');

  // Criação da tabela de clientes
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cliente (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf_cnpj TEXT NOT NULL UNIQUE,
      contato TEXT NOT NULL,
      endereco TEXT,
      ativo INTEGER NOT NULL DEFAULT 1  
    )
  `);
  console.log('Table cliente created');


  //Criação da tabela Pedido
  await db.exec(`
    CREATE TABLE IF NOT EXISTS pedido (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE NOT NULL DEFAULT (DATE('now')),
      clienteId INTEGER NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('Pendente', 'Concluído')),
      total REAL,
      FOREIGN KEY (clienteId) REFERENCES cliente(id)
    )
  `);
  console.log('Table pedido created');

  // Criação da tabela de Pedido Item
  await db.exec(`
    CREATE TABLE IF NOT EXISTS pedidoItem (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedidoId INTEGER NOT NULL,
      produtoId INTEGER NOT NULL,
      quantidade INTEGER NOT NULL CHECK (quantidade > 0),
      precoUnitario REAL NOT NULL CHECK (precoUnitario > 0),
      FOREIGN KEY (pedidoId) REFERENCES pedido(id),
      FOREIGN KEY (produtoId) REFERENCES produto(id)
    )
  `);
  console.log('Table pedidoItem created');

  // Criação da tabela de Transacao
  await db.exec(`
    CREATE TABLE IF NOT EXISTS transacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      valor REAL NOT NULL CHECK (valor > 0),
      tipo TEXT NOT NULL CHECK (tipo IN ('Entrada', 'Saída')),
      data DATE NOT NULL DEFAULT (DATE('now')),
      produtoId INTEGER NOT NULL,
      pedidoId INTEGER,
      FOREIGN KEY (produtoId) REFERENCES produto(id),
      FOREIGN KEY (pedidoId) REFERENCES pedido(id)
    )
  `);
  console.log('Table transacao created');

  
  // Criação da tabela de Usuario
  await db.exec(`
  CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    permissao TEXT NOT NULL CHECK (permissao IN ('admin', 'usuario_comum')) DEFAULT 'usuario_comum', 
    data_criacao DATE NOT NULL DEFAULT (DATE('now'))
  )
`);
  console.log('Table usuario created');

}
