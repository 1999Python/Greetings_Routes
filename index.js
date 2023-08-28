import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import session from 'express-session';
import flash from 'connect-flash';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import routes from './routes/route.js'
import query from './service/queries.js'
import MainGreetings from './functions/greetings.js';

const app = express();
const greetings = MainGreetings();
const port = process.env.PORT || 3012;
const pgp = pgPromise();


// Configure Handlebars engine with layout directory
app.engine('handlebars', exphbs.engine({
  layoutsDir: './views/layouts',
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

//connecting database
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

const queries = query(db);

// console.log(await queries.insert("PING"))
//routes
routes(app, queries, greetings);
//port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

