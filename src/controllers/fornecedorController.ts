import { Request, Response } from 'express';
import {
  getAllFornecedores,
  getFornecedorById,
  createFornecedor,
  deleteFornecedorById,
  updateFornecedor,
  getFornecedorByCnpj, 
} from '../models/Fornecedor';
import { asyncHandler } from '../utils/asyncHandler';

export const listarFornecedores = asyncHandler(async (req: Request, res: Response) => {
  const fornecedores = await getAllFornecedores();
  res.json(fornecedores);
});

export const buscarFornecedor = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const fornecedor = await getFornecedorById(Number(id));
  if (!fornecedor) {
    return res.status(404).json({ error: 'Fornecedor não encontrado' });
  }
  res.json(fornecedor);
});

export const buscarFornecedorPorCNPJ = asyncHandler(async (req: Request, res: Response) => {
  const { cnpj } = req.params;
  const fornecedor = await getFornecedorByCnpj(cnpj);
  if (!fornecedor) {
    return res.status(404).json({ error: 'Fornecedor não encontrado' , fornecedor});
  }
  res.json(fornecedor);
});

export const criarFornecedor = asyncHandler(async (req: Request, res: Response) => {
  const { nome, cnpj, contato, endereco } = req.body;

  const fornecedorExistente = await getFornecedorByCnpj(cnpj);
  if (fornecedorExistente) {
    return res.status(400).json({ message: 'CNPJ já cadastrado' });
  }

  await createFornecedor(nome, cnpj, contato, endereco);
  res.status(201).json({ message: 'Fornecedor criado com sucesso!' });
});

export const atualizarFornecedor = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, cnpj, contato, endereco } = req.body;

  const fornecedorExistente = await getFornecedorById(Number(id));
  if (!fornecedorExistente) {
    return res.status(404).json({ error: 'Fornecedor não encontrado' });
  }

  // Se o CNPJ foi alterado, verifica se o novo CNPJ já está cadastrado
  if (fornecedorExistente.cnpj !== cnpj) {
    const cnpjExistente = await getFornecedorByCnpj(cnpj);
    if (cnpjExistente) {
      return res.status(400).json({ message: 'CNPJ já cadastrado' });
    }
  }

  await updateFornecedor(Number(id), nome, cnpj, contato, endereco);
  res.status(200).json({ message: 'Fornecedor atualizado com sucesso!' });
});

export const deletarFornecedor = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id);
  const result = await deleteFornecedorById(idNumber);
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Fornecedor não encontrado.' });
  }
  res.status(200).json({ message: 'Fornecedor excluído com sucesso.' });
});
