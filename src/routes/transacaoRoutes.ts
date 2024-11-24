import { Router } from 'express';
import {
  listarTransacoes,
  buscarTransacao,
  criarTransacao,
  atualizarTransacao,
  deletarTransacao,
} from '../controllers/transacaoControlle';

const router = Router();

router.get('/transacoes', listarTransacoes);
router.get('/transacoes/:id', buscarTransacao);
router.post('/transacoes', criarTransacao);
router.put('/transacoes/:id', atualizarTransacao);
router.delete('/transacoes/find/:id', deletarTransacao);

export default router;
