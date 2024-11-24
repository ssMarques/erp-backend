import { Router } from 'express';
import {
  listarClientes,
  buscarCliente,
  criarCliente,
  atualizarCliente,
  deletarCliente,
  buscarClientePorCNPJeCPF
} from '../controllers/clienteController';

const router = Router();

router.get('/clientes', listarClientes);
router.get('/clientes/:id', buscarCliente);
router.get('/clientes/cpfcnpj/:cnpjCPF', buscarClientePorCNPJeCPF);
router.post('/clientes', criarCliente);
router.put('/clientes/:id', atualizarCliente);
router.delete('/clientes/find/:id', deletarCliente);

export default router;
