import { Router } from 'express';
import { listarProdutos, buscarProduto, criarProduto, deletarProduto, atualizarProduto } from '../controllers/produtoController';

const router = Router();

router.get('/produtos', listarProdutos);
router.get('/produtos/:id', buscarProduto);
router.post('/produtos', criarProduto);
router.put('/produtos/:id', atualizarProduto);
router.delete('/produtos/find/:id', deletarProduto);

export default router;
