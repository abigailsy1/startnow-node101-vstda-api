var express = require('express');
var morgan = require('morgan');
var app = express();
var bodyParser = require('body-parser');

var data = [
  {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  }
];

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json('ok');
});

app.get('/api/TodoItems', (req, res) => {
  res.status(200).json(data);
});

app.get('/api/TodoItems/:number', (req, res) => {
  var number = req.params.number;
  var item = data[number];
  res.status(200).json(item);
});

app.post('/api/TodoItems/', (req, res) => {
  var newResponse =
    {
      todoItemId: req.body.todoItemId,
      name: req.body.name,
      priority: req.body.priority,
      completed: req.body.completed
    }
  var replace = false;
  for (var i = 0; i < data.length; i++) {
    if (data[i].todoItemId == newResponse.todoItemId) {
      data.splice(i, 1, newResponse);
      replace = true;
    }
  }
  if (replace !== true) {
    data.push(newResponse);
  }
  res.status(201).json(newResponse);
});

app.delete('/api/TodoItems/:number', (req, res) => {
  var wreckedParam = req.params.number;
  var nole = null;
  for (var i = 0; i < data.length; i++) {
    if (data[i].todoItemId == wreckedParam) {
      nole = data[i];
      data.splice(i, 1, wreckedParam);
    }
  }
  res.status(200).json(nole);
});
module.exports = app;
