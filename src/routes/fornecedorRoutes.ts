import { Router } from 'express';
import {
  listarFornecedores,
  buscarFornecedor,
  criarFornecedor,
  deletarFornecedor,
  atualizarFornecedor,
  buscarFornecedorPorCNPJ,
} from '../controllers/fornecedorController';


const router = Router();

router.get('/fornecedores', listarFornecedores);
router.get('/fornecedores/:id', buscarFornecedor);
router.get('/fornecedores/cnpj/:cnpj', buscarFornecedorPorCNPJ);
router.post('/fornecedores', criarFornecedor);
router.put('/fornecedores/:id', atualizarFornecedor);
router.delete('/fornecedores/find/:id', deletarFornecedor);

export default router;
