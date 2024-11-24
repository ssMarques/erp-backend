// controllers/produtoController.ts

import { Request, Response } from 'express';
import { getAllProdutos, getProdutoById, createProduto, deleteById, updateProduto } from '../models/Produto';
import { asyncHandler } from '../utils/asyncHandler';

export const listarProdutos = asyncHandler(async (req: Request, res: Response) => {
  const produtos = await getAllProdutos();
  res.json(produtos);
});

export const buscarProduto = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const produto = await getProdutoById(Number(id));
  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  res.json(produto);
});

export const criarProduto = asyncHandler(async (req: Request, res: Response) => {
  const { nome, descricao, preco, quantidade, imagem, fornecedorId } = req.body;
  await createProduto(nome, descricao, preco, quantidade, imagem, fornecedorId);
  res.status(201).json({ message: 'Produto criado com sucesso!' });
});

export const atualizarProduto = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade, imagem, fornecedorId } = req.body;

  const produtoExistente = await getProdutoById(Number(id));
  if (!produtoExistente) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  await updateProduto(Number(id), nome, descricao, preco, quantidade, imagem, fornecedorId);
  res.status(200).json({ message: 'Produto atualizado com sucesso!' });
});

export const deletarProduto = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id);
  const result = await deleteById(idNumber);
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Produto não encontrado.' });
  }
  res.status(200).json({ message: 'Produto excluído com sucesso.' });
});
