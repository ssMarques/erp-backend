import { Router } from 'express';
import {
  listarPedidoItems,
  buscarPedidoItem,
  criarPedidoItem,
  atualizarPedidoItem,
  deletarPedidoItem,
} from '../controllers/pedidoItemController';

const router = Router();

router.get('/pedido-items', listarPedidoItems);
router.get('/pedido-items/:id', buscarPedidoItem);
router.post('/pedido-items', criarPedidoItem);
router.put('/pedido-items/:id', atualizarPedidoItem);
router.delete('/pedido-items/find/:id', deletarPedidoItem);


export default router;
