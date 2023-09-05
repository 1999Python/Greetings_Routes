const routes = (app, queries, greetings) => {

  app.get('/', async function (req, res) {

    const userName = await greetings.getName();

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


  app.get('/count/:name', async function (req, res) {
    try {
      const nameToCount = req.params.name.toLowerCase(); // Normalize the name to lowercase
      const greetedNames = await queries.greetedUser();

      // Count the occurrences of the specified name
      const count = greetedNames.filter(item => item.name.toLowerCase() === nameToCount).length;

      res.render('count', { nameToCount, count });
    } catch (error) {
      console.error('Error fetching greeted names from the database', error);
      res.status(500).send('Error fetching names');
    }
  });



  app.post('/greetings', async function (req, res) {
    const name = req.body.greetedName;
    const language = req.body.language;
  
    // Check if the name is valid before updating the counter
    if (greetings.ValidateName(name)) {
      // Update the counter before rendering the view
      const counter = await queries.updateCount();
  
      // Increment the counter if the user is new
      if (!greetings.getName()) {
        counter.count++; // Increment the counter
      }
  
      // Set the user's name and language
      await greetings.setName(name);
      greetings.setLanguage(language);
  
      res.render('index', {
        counter: counter.count, // Send the updated counter to the view
        greetingTheUser: greetings.greetingTheUser(),
        errorMessage: '',
        successMessage: 'User greeted successfully', // Set a success message
      });
    } else {
      req.flash('error', greetings.errorMessages(name, language));
      res.redirect('/');
    }
  });
  
  

  app.post('/reset', async (req, res) => {

    try {
      await queries.reset();

      res.redirect('/');
    }
    catch (err) {


      res.status(500).send('Error resetting app');
    }

    greetings.clearGreeting()
  })

}
export default routes;