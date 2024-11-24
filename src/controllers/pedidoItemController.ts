import { Request, Response } from 'express';
import * as PedidoItemModel from '../models/PedidoItem';
import { asyncHandler } from '../utils/asyncHandler';

export const listarPedidoItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await PedidoItemModel.getAllPedidoItems();
  res.json(items);
});

export const buscarPedidoItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await PedidoItemModel.getPedidoItemById(Number(id));
  if (!item) {
    return res.status(404).json({ error: 'Item de pedido não encontrado' });
  }
  res.json(item);
});

export const criarPedidoItem = asyncHandler(async (req: Request, res: Response) => {
  const { pedidoId, produtoId, quantidade, precoUnitario } = req.body;

  try {
    await PedidoItemModel.createPedidoItem(pedidoId, produtoId, quantidade, precoUnitario);
    res.status(201).json({ message: 'Item de pedido criado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: `Falha ao criar Item de Pedido` });
  }
});

export const atualizarPedidoItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantidade, precoUnitario } = req.body;

  try {
    await PedidoItemModel.updatePedidoItem(Number(id), quantidade, precoUnitario);
    res.status(200).json({ message: 'Item de pedido atualizado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Falha ao atualizar Item de Pedido' });
  }
});

export const deletarPedidoItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await PedidoItemModel.deletePedidoItemById(Number(id));
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Item de pedido não encontrado.' });
    }
    res.status(200).json({ message: 'Item de pedido excluído com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Falha ao excluir Item de Pedido' });
  }
});

