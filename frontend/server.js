const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
process.env.PORT = port;
const app = express();

app.use(express.static(path.join(__dirname, '/dist')));

app.get('**', (req, res) => {
  let indexPage = path.join(__dirname, '/dist/index.html');
  res.sendFile(indexPage, (err) => {
    if (err) {
      let errMsg = "index.html could not be found!";
      console.error(errMsg);
      res.status(500);
      res.send(errMsg);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
