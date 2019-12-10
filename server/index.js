const path = require('path');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/api', require('./api'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
