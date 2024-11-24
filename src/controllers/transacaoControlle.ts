import { Request, Response } from 'express';
import {
  getAllTransacoes,
  getTransacaoById,
  createTransacao,
  updateTransacao,
  deleteTransacaoById,
} from '../models/Transacao';
import { asyncHandler } from '../utils/asyncHandler';

// Listar todas as transações
export const listarTransacoes = asyncHandler(async (req: Request, res: Response) => {
  const transacoes = await getAllTransacoes();
  res.json(transacoes);
});

// Buscar transação por ID
export const buscarTransacao = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const transacao = await getTransacaoById(Number(id));
  if (!transacao) {
    return res.status(404).json({ error: 'Transação não encontrada' });
  }
  res.json(transacao);
});

// Criar nova transação
export const criarTransacao = asyncHandler(async (req: Request, res: Response) => {
  const { valor, tipo, produtoId, pedidoId } = req.body;

  if (valor <= 0) {
    return res.status(400).json({ message: 'O valor da transação deve ser maior que 0' });
  }

  if (!['Entrada', 'Saída'].includes(tipo)) {
    return res.status(400).json({ message: 'O tipo deve ser "Entrada" ou "Saída"' });
  }

  await createTransacao(valor, tipo, produtoId, pedidoId);
  res.status(201).json({ message: 'Transação criada com sucesso!' });
});

// Atualizar transação existente
export const atualizarTransacao = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { valor, tipo, produtoId, pedidoId } = req.body;

  if (valor <= 0) {
    return res.status(400).json({ message: 'O valor da transação deve ser maior que 0' });
  }

  if (!['Entrada', 'Saída'].includes(tipo)) {
    return res.status(400).json({ message: 'O tipo deve ser "Entrada" ou "Saída"' });
  }

  await updateTransacao(Number(id), valor, tipo, produtoId, pedidoId);
  res.status(200).json({ message: 'Transação atualizada com sucesso!' });
});

// Deletar transação
export const deletarTransacao = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteTransacaoById(Number(id));

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Transação não encontrada' });
  }

  res.status(200).json({ message: 'Transação excluída com sucesso' });
});
