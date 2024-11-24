import { openDb } from '../database';
import bcrypt from 'bcrypt';

// Função para criar um novo usuário
export const createUsuario = async (
  nome: string,
  email: string,
  senha: string,
  permissao: 'admin' | 'usuario_comum'
) => {
  const db = await openDb();

  // Criptografando a senha com bcrypt
  const hashedSenha = await bcrypt.hash(senha, 10);

  // Verificando se o email já está em uso
  const emailExistente = await db.get('SELECT * FROM usuario WHERE email = ?', [email]);
  if (emailExistente) {
    throw new Error('E-mail já está em uso');
  }

  // Inserindo o novo usuário no banco de dados
  const result = await db.run(
    `INSERT INTO usuario (nome, email, senha, permissao) VALUES (?, ?, ?, ?)`,
    [nome, email, hashedSenha, permissao]
  );

  return { id: result.lastID, nome, email, permissao };
};

// Função para buscar todos os usuários
export const getAllUsuarios = async () => {
  const db = await openDb();
  return db.all('SELECT * FROM usuario');
};

// Função para buscar um usuário por ID
export const getUsuarioById = async (id: number) => {
  const db = await openDb();
  return db.get('SELECT * FROM usuario WHERE id = ?', [id]);
};

// Função para atualizar as informações do usuário
export const updateUsuario = async (
  id: number,
  nome: string,
  email: string,
  senha: string,
  permissao: 'admin' | 'usuario_comum'
) => {
  const db = await openDb();

  // Verificando se o email já está em uso por outro usuário
  const emailExistente = await db.get('SELECT * FROM usuario WHERE email = ? AND id != ?', [email, id]);
  if (emailExistente) {
    throw new Error('E-mail já está em uso');
  }

  // Atualizando a senha se fornecida
  let query = 'UPDATE usuario SET nome = ?, email = ?, permissao = ? WHERE id = ?';
  let params = [nome, email, permissao, id];

  if (senha) {
    const hashedSenha = await bcrypt.hash(senha, 10);
    query = 'UPDATE usuario SET nome = ?, email = ?, senha = ?, permissao = ? WHERE id = ?';
    params = [nome, email, hashedSenha, permissao, id];
  }

  await db.run(query, params);
  return { id, nome, email, permissao };
};

// Função para excluir um usuário
export const deleteUsuario = async (id: number) => {
  const db = await openDb();
  return db.run('DELETE FROM usuario WHERE id = ?', [id]);
};
