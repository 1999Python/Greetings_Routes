export default function MainGreetings(queries) {
  
  var counter = 0;
  var languageType = '';
  var userName = '';
  //not using that array anymore :) using only the database amazzzing mahn

  async function setName(name) {
    if (ValidateName(name)) {
      const userCount = await queries.userCount(name);
      
      //If the bruv does not exist (userCount is null), it inserts the user into guest using queries.insert(name). 
      //If user already exists, it updates the count 
      if (userCount == null) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        await queries.insert(name);
      } else {
        await queries.updateCount(name);
      }
      userName = name;
    }
  }
  
  async function getNames() {
    const names = await queries.getGreetedNames();
    return names.map((row) => row.name);
    //retrieves the list of greeted names from the database using queries.getGreetedNames()
    // and then extracts only the name values from the database results.
  }
  
  function getName() {
    return userName;
  }//getting a single name that was set
  
  function clearGreeting() {
    userName = "";
  }
  
  function setLanguage(language) {
    languageType = language;
  }//setting the different type of languages
  
  function ValidateName(name) {
    const regex = /^[A-Za-z]+$/;
    
    return regex.test(name)
  }
  function greetingTheUser() {
    let greetingMessage;
    
    switch (languageType) {

      case 'english':
        greetingMessage = 'Hello, ' + userName + '!';
        break;
      case 'afrikaans':
        greetingMessage = 'Hallo, ' + userName + '!';
        break;
      case 'arabic':
        greetingMessage = 'مرحباً، ' + userName + '!';
        break;
    }

    return greetingMessage
  }

  function errorMessages(names, languages) {

    let errorMessage = '';

    if (!names && !languages) {
      errorMessage = 'Please enter your name and select a language.';
    }
    else if (!names) {
      errorMessage = 'Please enter your name.';
    }

    else if (!ValidateName(names) && !languages) {
      errorMessage = 'Please enter a valid name and a select language.';
    }
    else if (!languages) {
      errorMessage = 'Please select a language.';
    }
    else if (!ValidateName(names)) {
      errorMessage = 'Please enter a valid name.';
    }

    return errorMessage;
  }







  return {
    errorMessages,
    getName,
    getNames,
    setName,
    setLanguage,
    clearGreeting,
    ValidateName,
    greetingTheUser
  }
};