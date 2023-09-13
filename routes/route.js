const routes = (app, queries, greetings) => {

  // Home Page Route
  app.get('/', async (req, res) => {

    const userName = await greetings.getName();
    const greetingTheUser = userName ? greetings.greetingTheUser() : '';

    // Update the counter before rendering the view
    const counter = await queries.count();

    const errorMessage = req.flash('error');

    res.render('index', {
      count: counter,
      greetingTheUser,
      errorMessage,
    });

  });


  // Greeted Names Page Route
  app.get('/greeted', async (req, res) => {

    const greetedNames = await queries.getGreetedNames();
    greetings.clearGreeting();
    res.render('greeted', { greetedNames });



  });

  // Count Page Route

  app.get('/count/:name', async (req, res) => {
    const nameToCount = req.params.name.toLowerCase(); // Normalize the name to lowercase
    const greetedNames = await queries.userCount(nameToCount);
  
    // Check if greetedNames is defined and not empty before filtering it
    if (greetedNames && greetedNames.length > 0) {
      const count = greetedNames.filter(item => item.name.toLowerCase() === nameToCount).length;
      res.render('count', { nameToCount, count });
    } else {
      // Handle the case where greetedNames is undefined or empty
      // You can set count to 0 or handle it differently based on your requirements
      const count = 0;
      res.render('count', { nameToCount, count });
    }
  });
  

  // app.get('/count/:name', async (req, res) => {

  //   const nameToCount = req.params.name.toLowerCase(); // Normalize the name to lowercase
  //   const greetedNames = await queries.userCount(nameToCount);

  //   // Count the occurrences of the specified name
  //   const count = greetedNames.filter(item => item.name.toLowerCase() === nameToCount).length;
    
  //   res.render('count', { nameToCount, count });

  // });

  // Greet User Route
  app.post('/greetings', async (req, res) => {
    const name = req.body.greetedName;
    const language = req.body.language;

    const counterDisplay = await queries.count()
  
    const checkingName = await queries.checkingName(name)

if(!checkingName){
  await queries.insert(name);
}
else{
  await queries.updateCount(name);
}

    // Set the user's name and language
    await greetings.setName(name);
    greetings.setLanguage(language);

    res.render('index', {
      count: counterDisplay,
      greetingTheUser: greetings.greetingTheUser(),
      errorMessage: '',
      successMessage: 'User greeted successfully',
    });


  });

  // Reset App Route
  app.post('/reset', async (req, res) => {
    await queries.reset();
    greetings.clearGreeting();
    res.redirect('/');

  });
};

export default routes;
