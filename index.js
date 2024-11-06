const express = require('express')
const cors = require('cors')
const PORT = 3000

const app = express()

app.use(cors())
app.use(express.json())

const usuariosRoutes = require('./routes/usuariosRoutes');


// Usar as rotas
app.use('/usuarios', usuariosRoutes);




app.listen(PORT, () => {
  console.log('Funcionando na porta 3000')
})