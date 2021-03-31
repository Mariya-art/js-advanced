const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('.'));

app.listen(3000, () => {
console.log('server is running on port 3000!');
});

app.get('/data', (req, res) => { // получение списка товаров из базы при загрузке страницы
  fs.readFile('./goods.json', 'utf-8', (err, data) => {
    if(err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      res.send(data);
    }
  });
});

// Другой вариант get-запроса
/*app.get('/data', (req, res) => {
  fs.readFile('./goods.json', 'utf-8', (err, data) => {
    if(!err) {
      res.setHeader('Content-Type', 'Application/json');
      res.end(data);
    }
  });
});*/

app.get('/cart', (req, res) => { // получение списка созданной ранее корзины
  fs.readFile('./cart.json', 'utf-8', (err, data) => {
    if(err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      res.send(data);
    }
  });
});

app.post('/cart', (req, res) => { // добавление товара в корзину
  fs.readFile('./cart.json', 'utf8', (err, data) => {
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

app.delete('/cart', (req, res) => { // удаление товара из корзины
  fs.readFile('./cart.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      const cart = JSON.parse(data);
      const deleteItem = req.body;
      const index = cart.findIndex((item) => item.id == deleteItem.id);

      cart.splice(index, 1);
      
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

app.post('/statsAdd', (req, res) => { // добавление статистики (о добавлении товара в корзину)
  fs.readFile('./stats.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      const stats = req.body;
      let now = new Date();
      
      fs.appendFile('./stats.txt', now + ' Added: ' + stats.title + ', price: '  + stats.price + '\n', (err) => {
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

app.post('/statsDelete', (req, res) => { // добавление статистики (об удалении товара из корзины)
  fs.readFile('./stats.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      const stats = req.body;
      let now = new Date();
      
      fs.appendFile('./stats.txt', now + ' Deleted: ' + stats.title + ', price: '  + stats.price + '\n', (err) => {
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