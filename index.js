import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import session from 'express-session';
import flash from 'connect-flash';
import pgPromise from 'pg-promise';
import 'dotenv/config';

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

console.log(await queries.insert("PING"))
//routes

app.get('/', async function (req, res) {
  //my error messages
  const userName = greetings.getName(); // Get the user's name
  const greetingTheUser = userName ? greetings.greetingTheUser() : ''; // Generate greeting if a name is available
  const counter = greetings.amountOfUsers();
  const errorMessage = req.flash();

  res.render('index', {
    counter,
    greetingTheUser,
    errorMessage,
  });
});

//getting the greeting and language 
app.post('/greetings', function (req, res) {
  const name = req.body.greetedName;
  const language = req.body.language;

  req.flash('error', greetings.errorMessages(name, language));

  greetings.setName(name);
  greetings.setLanguage(language);

  res.redirect('/');
});

//collecting my greeted names
app.get('/greeted', async function (req, res) {
  try {
    await queries.insert("");
    // res.render("greeted", { greeted: getGreetedNames })
  } catch (error) {
    // console.error('Error fetching greeted names from the database', error);
    res.status(500).send('Error fetching names');
  }

  res.send("Hello")
})

//reset button
// app.post('/reset', async function (req, res) {
//   await data.reset();
//   greetings.reset(), res.redirect("/");
// });
app.post('/reset', async (req, res) => {
  await queries.reset(); // Call the reset method to reset the database
  greetings.reset();
  res.redirect("/");
});


// app.get('/check-connection', async (req, res) => {
//   try {
//     // Perform a simple query to test the connection
//     await db.any('SELECT 1');

//     res.send('Database connected!');
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     res.status(500).send('Database connection error');
//   }
// });


//Port 3012
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

