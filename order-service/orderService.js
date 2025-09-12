const express = require('express');
const app = express();

app.use(express.json());

app.post('/orders', (req, res) => {
    const order = req.body;
    console.log(`Order received for User Id: ${order.userId}`);
    res.send({message: 'Order create, successful!', order});
});

app.listen(4000, () => console.log('Order Service run in route 4000'));