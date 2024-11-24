import { Request, Response } from 'express';
import {
  getAllClientes,
  getClienteById,
  createCliente,
  deleteClienteById,
  updateCliente,
  getClienteByCpfCnpj
} from '../models/Cliente';
import { asyncHandler } from '../utils/asyncHandler';

export const listarClientes = asyncHandler(async (req: Request, res: Response) => {
  const clientes = await getAllClientes();
  res.json(clientes);
});

export const buscarCliente = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const cliente = await getClienteById(Number(id));
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  res.json(cliente);
});

export const buscarClientePorCNPJeCPF = asyncHandler(async (req: Request, res: Response) => {
  const { cnpjCPF } = req.params;
  const cliente = await getClienteByCpfCnpj(cnpjCPF);
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  res.json(cliente);
});

export const criarCliente = asyncHandler(async (req: Request, res: Response) => {
  const { nome, cpf_cnpj, contato, endereco } = req.body;

  console.log('Dados recebidos:', req.body);
  
  const clienteExistente = await getClienteByCpfCnpj(cpf_cnpj);
  if (clienteExistente) {
    return res.status(400).json({ message: 'CPF/CNPJ já cadastrado' });
  }

  await createCliente(nome, cpf_cnpj, contato, endereco);
  res.status(201).json({ message: 'Cliente criado com sucesso!' });
});

export const atualizarCliente = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, cpf_cnpj, contato, endereco } = req.body;

  const clienteExistente = await getClienteById(Number(id));
  if (!clienteExistente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  // Se o CPF/CNPJ foi alterado, verifica se já está cadastrado
  if (clienteExistente.cpf_cnpj !== cpf_cnpj) {
    const cpfCnpjExistente = await getClienteByCpfCnpj(cpf_cnpj);
    if (cpfCnpjExistente) {
      return res.status(400).json({ message: 'CPF/CNPJ já cadastrado' });
    }
  }

  await updateCliente(Number(id), nome, cpf_cnpj, contato, endereco);
  res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
});

export const deletarCliente = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteClienteById(Number(id));
  
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Cliente não encontrado ou já desativado.' });
  }

  res.status(200).json({ message: 'Cliente excluído/desativado com sucesso.' });
});
