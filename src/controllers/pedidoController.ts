import { Request, Response } from 'express';
import {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedidoById,
  filterPedidosByDateAndStatus,
  getLastPedidoId
} from '../models/Pedido';
import { asyncHandler } from '../utils/asyncHandler';

export const listarPedidos = asyncHandler(async (req: Request, res: Response) => {
  const pedidos = await getAllPedidos();
  res.json(pedidos);
});

export const buscarPedido = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const pedido = await getPedidoById(Number(id));
  if (!pedido) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  res.json(pedido);
});

export const criarPedido = asyncHandler(async (req: Request, res: Response) => {
  const { clienteId } = req.body;
  const novoPedido = await createPedido(clienteId);
  res.status(201).json({ pedido: novoPedido.id });
});

export const atualizarPedido = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const pedidoExistente = await getPedidoById(Number(id));
  if (!pedidoExistente) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  await updatePedido(Number(id));
  res.status(200).json({ message: 'Pedido atualizado com sucesso!' });
});

export const deletarPedido = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deletePedidoById(Number(id));
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Pedido não encontrado.' });
  }
  res.status(200).json({ message: 'Pedido excluído com sucesso.' });
});

export const filtrarPedidos = asyncHandler(async (req: Request, res: Response) => {
  const { date, status } = req.query as { date: string; status: string };
  const pedidos = await filterPedidosByDateAndStatus(date, status);
  res.json(pedidos);
});

