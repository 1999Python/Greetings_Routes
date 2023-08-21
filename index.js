import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import session from 'express-session';
import flash  from 'connect-flash';
import pgPromise from 'pg-promise';

import MainGreetings from './functions/greetings.js';

const pgp = pgPromise();
const app = express();
const greetings = MainGreetings();
const port = process.env.PORT || 3012;

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


//routes

app.get('/', function (req, res) {

    const greetingTheUser = greetings.greetingTheUser();
    const counter = greetings.amountOfUsers();
   

    const errorMessage = req.flash();
    console.log(req.flash('error'));
    // console.log(greetingTheUser)
    res.render('index', {
        counter,
        greetingTheUser,
        errorMessage
    });
});

app.post('/greetings', function (req, res) {

    const name = req.body.greetedName;
    const language = req.body.language;

    req.flash('error', greetings.errorMessages(name, language));

    greetings.setName(name);
    greetings.setLanguage(language);

    res.redirect('/')
})

app.get('/greeted', function (req, res) {

    const greetedNames = greetings.getNames();

    res.render("greeted", { greeted: greetedNames })
})


app.post('/reset', function (req, res) {

    const resetingCounter = greetings.resetCounter();

    greetings.resetCounter(resetingCounter);

    res.redirect('/')
})

//Port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
