import { Router } from 'express';
import { listarUsuarios, buscarUsuario, criarUsuario, atualizarUsuario, deletarUsuario } from '../controllers/usuarioController';

const router = Router();

router.get('/usuarios', listarUsuarios);
router.get('/usuarios/:id', buscarUsuario);
router.post('/usuarios', criarUsuario);
router.put('/usuarios/:id', atualizarUsuario);
router.delete('/usuarios/:id', deletarUsuario);

export default router;
