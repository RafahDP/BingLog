import express from 'express';
import mediaRoutes from './routes/mediaRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(mediaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port} 🚀`);
});