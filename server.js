import express from 'express';

 
const app = express();
const port = 3000;

// Configura o Express para entender JSON no corpo das requisições
app.use(express.json());

let midias = [
  {
    id: 1,
    title: "One Piece",
    type: "Anime",
    currentEpisode: 1100,
    episodioAtual: 1050,
    status: "Assistindo"
  }
];
// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Tracker de Séries operante! 🎬' });
});

app.post('/midias',(req, res){
  
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});