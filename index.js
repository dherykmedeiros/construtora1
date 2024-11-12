// index.js
const express = require('express')
const cors = require('cors')
const PORT = 3000

const app = express()

app.use(cors())
app.use(express.json())

const usuariosRoutes = require('./routes/usuariosRoutes');
const obrasRoutes = require('./routes/obrasRoutes');
const relatoriosRoutes = require('./routes/relatoriosRoutes');
const assinaturasRoutes = require('./routes/assinaturasRoutes');
const loginRoutes = require('./routes/loginRoutes');

// Usar as rotas
app.use('/usuarios', usuariosRoutes);
app.use('/obras', obrasRoutes);
app.use('/relatorios', relatoriosRoutes);
app.use('/assinaturas', assinaturasRoutes);
app.use('/login', loginRoutes);




app.listen(PORT, () => {
  console.log('Funcionando na porta 3000')
})