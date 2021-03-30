const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('.'));

app.listen(3000, () => {
console.log('server is running on port 3000!');
});

app.get('/data', (req, res) => {
  fs.readFile('./goods.json', 'utf-8', (err, data) => {
    if(err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      res.send(data);
    }
  });
});

/*app.get('/data', (req, res) => { // другой вариант get-запроса
  fs.readFile('./goods.json', 'utf-8', (err, data) => {
    if(!err) {
      res.setHeader('Content-Type', 'Application/json');
      res.end(data);
    }
  });
});*/

app.post('/cart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      const cart = JSON.parse(data);
      const item = req.body;

      cart.push(item);
      
      fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
          res.send(JSON.stringify(err));
        } else {
          res.send();
        }
      });
    }
  });
});