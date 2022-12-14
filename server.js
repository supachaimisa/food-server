const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use((req,res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
})
const randomId = () => {
    return Math.floor(Math.random()*99999)
}

const foods = [
    { id: randomId(), name: 'ผัดกระเพรา' },
    { id: randomId(), name: 'ผัดเผ็ดปลาดุ๊ก' },
    { id: randomId(), name: 'ข้าวผัด' },
];

// COMMENT:: Get function
app.get('/food', (req, res) => {
    res.send(foods);
})

// COMMENT:: Create function
app.post('/food', (req, res) => {

    const body = req.body;
    const tempFood = { id: randomId(), name: body.name }; // { id: 12345, name: 'ก๋วยเตี๋ยว' }
    foods.push(tempFood);
    
    res.send({ message: 'Insert food success !' });
})

// COMMENT:: Update function
app.put('/food', (req, res) => {

    const body = req.body;
    const tempObj = foods.find(item => item.id == body.id);
    const findIndex = foods.indexOf(tempObj);
    const newObject = { ...tempObj, name: body.name };
    
    foods.splice(findIndex, 1, newObject);
    
    res.send({ message: 'Update food success !' });
})

// COMMENT:: Delete function
app.delete('/food', (req, res) => {

    const body = req.body;
    const tempObj = foods.find(item => item.id == body.id);
    const findIndex = foods.indexOf(tempObj);
    
    foods.splice(findIndex, 1);
    
    res.send({ message: 'Delete food success !' });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})