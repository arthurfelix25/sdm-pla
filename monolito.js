<<<<<<< HEAD
const express = require('express')
const app = express()

app.use(express.json())

let users = []
let orders = []

//rota para criar um usuário
app.post('/users', (req, res) => {
    const user = req.body
    users.push(user)
    res.send({ message: 'User created', user }
    )
})

//rota para criar um pedido
app.post('/orders', (req, res) => {
    const order = req.body
    orders.push(order)
    res.send({ message: 'Order created', order })
})

//rota para listar todos os pedidos e usarios
app.get('/dados', (req, res) => {
    res.send({ users, orders})
})

//iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
=======
const express = require('express');
const app = express();

app.use(express.json());

let usuarios = [];
let pedidos = [];

// Rutas para criação de usuarios

app.post("/usuarios", (req, res) => {
    const usuario = req.body;
    usuarios.push(usuario);
    res.send({ message: "Usuário criado com sucesso!" });
});


// Rota para criar um pedido
app.post("/pedidos", (req, res) => {
    const pedido = req.body;
    pedidos.push(pedido);
    res.send({ message: "Pedido criado com sucesso!" });
});

// Rota para listar todos os pedidos e usuários
app.get("/dados", (req, res) => {
    res.send({ usuarios, pedidos });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
>>>>>>> e4befa3cbc9a9b5c7c518ae5fb02429f2e710cf6
