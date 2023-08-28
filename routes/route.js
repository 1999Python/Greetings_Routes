const routes = (app, queries, greetings) => {

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
   //collecting my greeted names
  app.get('/greeted', async function (req, res) {
    try {
      const greetedNames = await queries.getGreetedNames(); // Assuming queries.getGreetedNames() fetches the names from the database
      res.render('greeted', { greetedNames });
    } catch (error) {
      console.error('Error fetching greeted names from the database', error);
      res.status(500).send('Error fetching names');
    }
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
  

  app.post('/reset', async (req, res) => {
    await queries.reset(); // Call the reset method to reset the database
    greetings.reset();
    res.redirect("/");
  });

function counterRoute(data) {
    async function count(req, res) {
      try {
       
        const name = req.params.name;
        const counter = await data.count(name);
   
        if (counter !== null) {
          res.render("counter", {
            name,
            counter: counter.sum,
          });
        }
      } catch (err) {
        next(err);
      }
    }

    return {
      count,
    };
  }
}
  export default routes;