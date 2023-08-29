export default  function MainGreetings(queries) {

    var counter = 0;
    var languageType = '';
    var partyUsers = [];
    var userName = '';
  
  
   async function setName(name) {
      if (ValidateName(name)) {
        if (!partyUsers.includes(name)) {
        await queries.insert(name)
          partyUsers.push(name)
        
        }
        userName = name
      }
  
    }//set the names and push them to an array
  
    function getName() {
      return userName;
    }//getting a single name that was set
  
   async function getNames() {
    // let names =  await queries.getGreetedNames()
      return partyUsers;
      // return names;
    }//getting the users
  
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
      else if (!ValidateName(names)){
        errorMessage = 'Please enter a valid name.';
      }
    
      return errorMessage;
    }
    
    
    function setCounter(value) {
    counter = value;
    }
  
    function resetCounter() {
      counter = 0;
      partyUsers= [];
    }//reset the user counter num to 0
  
    function getCounter() {
      return counter;
    }//get the amount of users 
  
    function amountOfUsers() {
      counter = partyUsers.length;
      //get the amount of users by pushing all the users names in an array and the count each of them on the counter.
      return counter
    }
  
    return {
      errorMessages,
      resetCounter,
      getName,
      getNames,
      setName,
      setLanguage,
      getCounter,
      amountOfUsers,
      ValidateName,
      greetingTheUser
    }
  };