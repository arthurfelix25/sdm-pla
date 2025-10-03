require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MONGO _URI is not defined');
} 

mongoose.connect(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.error('Mongo connection error:', err));

const userSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    email: {type: String, required: true, unique: true},
    cratedAt: {type: Date, default: Date.now}
});

const User = mongoose.model('User', userSchema);

app.post('/usuarios', async (req, res) => {
    try{
        const {name = '', email} = req.body;
        if (!email) 
            return res.status(400).json({error: 'user email is required'});

            const user = new User({name, email});
            const saved = await user.save();

            try{
                await axios.post('http://localhost:4000/pedidos', {userId: saved._id, items: [], total: 0});
            } catch (err) {
                console.error('Erro ao criar pedido para novo usuario:', err);
            }
            return res.status(201).json(user);
        }  catch(err) {
            console.error(err)
            if (err.code === 11000) return res.status(400).json({error:'email já cadastrado'})

    return res.status(500).json({error:'Erro ao criar usuario'})
  }

});

app.listen(3000, () => {
    console.log('Order service running on port 3000');
});

