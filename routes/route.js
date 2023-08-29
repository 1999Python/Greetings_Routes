const routes = (app, queries, greetings) => {

    app.get('/', async function (req, res) {
      const userName = greetings.getName();
      const greetingTheUser = userName ? greetings.greetingTheUser() : '';
      const counter = await queries.updateCount(); // Update the counter from the database
      const errorMessage = req.flash('error');
  
      res.render('index', {
        counter: counter.count,
        greetingTheUser,
        errorMessage,
      });
    });
  
    app.get('/greeted', async function (req, res) {
      try {
        const greetedNames = await queries.getGreetedNames();

        console.log(greetedNames)
        res.render('greeted', { greetedNames });
      } catch (error) {
        console.error('Error fetching greeted names from the database', error);
        res.status(500).send('Error fetching names');
      }
    });
  
    app.post('/greetings', async function (req, res) {
      const name = req.body.greetedName;
      const language = req.body.language;
  
      req.flash('error', greetings.errorMessages(name, language));
  
      await queries.insert(name); // Insert or update the name's count in the database
      greetings.setName(name);
      greetings.setLanguage(language);
  
      res.redirect('/');
    });
  
    app.post('/reset', async (req, res) => {
      await queries.reset();
      greetings.reset();
      res.redirect("/");
    });
  

  }
  

  



  export default routes;