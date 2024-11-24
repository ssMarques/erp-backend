import { Request, Response } from 'express';
import { createUsuario, getAllUsuarios, getUsuarioById, updateUsuario, deleteUsuario } from '../models/Usuario';
import { asyncHandler } from '../utils/asyncHandler';

// Controlador para listar todos os usuários
export const listarUsuarios = asyncHandler(async (req: Request, res: Response) => {
  const usuarios = await getAllUsuarios();
  res.json(usuarios);
});

// Controlador para buscar um usuário por ID
export const buscarUsuario = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await getUsuarioById(Number(id));
  if (!usuario) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.json(usuario);
});

// Controlador para criar um novo usuário
export const criarUsuario = asyncHandler(async (req: Request, res: Response) => {
  const { nome, email, senha, permissao } = req.body;

  try {
    const usuario = await createUsuario(nome, email, senha, permissao);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Controlador para atualizar um usuário
export const atualizarUsuario = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, email, senha, permissao } = req.body;

  try {
    const usuario = await updateUsuario(Number(id), nome, email, senha, permissao);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Controlador para excluir um usuário
export const deletarUsuario = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUsuario(Number(id));
  res.status(200).json({ message: 'Usuário excluído com sucesso' });
});
