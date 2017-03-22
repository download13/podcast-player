const path = require('path');
const express = require('express');
const request = require('request');
const exphbs = require('express-handlebars');
const routes = require('./routes');


const VIEWS_DIR = path.join(__dirname, 'views');

const app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(VIEWS_DIR, 'layouts'),
  partialsDir: path.join(VIEWS_DIR, 'partials')
}));
app.set('view engine', '.hbs');
app.set('views', VIEWS_DIR);

app.use(express.static(path.join(__dirname, 'public')));

routes(app);

const listener = app.listen(process.env.PORT || 80, () => {
  console.log('Listening on port ' + listener.address().port);
});
