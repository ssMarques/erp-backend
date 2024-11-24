import express from 'express';
import cors from 'cors';
import produtoRoutes from './routes/produtoRoutes';
import { createTables } from './database';
import funcionarioRoutes from './routes/fornecedorRoutes';
import clienteRoutes from './routes/clienteRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import pedidoItemRoutes from './routes/pedidoItemRoutes';
import transacaoRoutes from './routes/transacaoRoutes';
import usuarioRoutes from './routes/usuarioRoutes';


const app = express();
const PORT = 3000;


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createTables();

app.use(produtoRoutes);
app.use(funcionarioRoutes);
app.use(clienteRoutes);
app.use(pedidoRoutes);
app.use(pedidoItemRoutes);
app.use(transacaoRoutes);
app.use(usuarioRoutes);



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
