import { Router } from 'express';
import {
  listarPedidos,
  buscarPedido,
  criarPedido,
  atualizarPedido,
  deletarPedido,
} from '../controllers/pedidoController';

const router = Router();

router.get('/pedidos', listarPedidos);
router.get('/pedidos/:id', buscarPedido);
router.post('/pedidos', criarPedido);
router.put('/pedidos/:id', atualizarPedido);
router.delete('/pedidos/find/:id', deletarPedido);



export default router;
