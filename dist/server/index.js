const express = require('express');
const request = require('request');
const exphbs = require('express-handlebars');
const {getPodcasts} = require('./casts');


const app = express();

app.engine('.hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {podcasts: getPodcasts()});
});

const listener = app.listen(process.env.PORT || 80, () => {
  console.log('Listening on port ' + listener.address().port);
});
