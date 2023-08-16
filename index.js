import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import MainGreetings from './functions/greetings.js';

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

//routes


app.get('/', function (req, res) {

    // const greeting = greetings.greetingTheUser();

    const greetingTheUser = greetings.greetingTheUser();
    const counter = greetings.amountOfUsers();
    // const getCounter = greetings.getCounter();
    // const names = greetings.getNames();
    // const errorMessages = greetings.errorMessages();
    console.log(greetingTheUser)
    res.render('index', {
        counter,
        greetingTheUser,
        // getCounter,
        // names,
        // errorMessages

    });
});

app.post('/greetings', function (req, res) {
   
    const name = req.body.greetedName;
    const language = req.body.languange;

    greetings.setName(name);
    greetings.setLanguage(language);

    res.redirect('/')
})

app.get('/greeted',function (req, res){
    
    const greetedNames = greetings.getNames();

    res.render("greeted",{ greeted: greetedNames })
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
