const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000;
const http = require('http').createServer(app);
const ws = require('socket.io')(http);

app.use(bodyParser.json());


ws.on('connection', (socket) => {
    console.log('client connected');
    socket.on('disconnect', () => {
        console.log('client disconnected');
      });
  });

  app.get('/status', function(req, res) {
    res.status(200).send();

  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post("/subscription/:type", (req, res) => {
    //console.log("Subscription event ", req.params.type);
    //console.log(req.body.data)
    ws.emit(req.params.type, req.body.data);
    res.status(204).send();
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})