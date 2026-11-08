import express from 'express';
import mediaRoute from './routes/mediaRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(mediaRoute);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port} 🚀`);
});