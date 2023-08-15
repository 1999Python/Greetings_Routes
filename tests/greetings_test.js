describe("Greeting The User", function () {

    it('should return a greeting to the user in Arabic"', function () {
      let greet = MainGreetings();
  
      greet.setName("Raadiyah")
      greet.setLanguage("arabic")
  
      assert.equal("مرحباً، Raadiyah!", greet.greetingTheUser("Raadiyah", "arabic"))
    })
  
    it('should return a greeting to the user in Afrikaans"', function () {
      let greet = MainGreetings();
  
      greet.setName('Nico')
      greet.setLanguage("afrikaans")
  
      assert.equal("Hallo, Nico!", greet.greetingTheUser("Nico", "afrikaans"))
    })
    it('should return a greeting to the user in English"', function () {
      let greet = MainGreetings();
  
      greet.setName('Hidaayat')
      greet.setLanguage("english")
  
      assert.equal("Hello, Hidaayat!", greet.greetingTheUser("Hidaayat", "english"))
    })
  
  })
  
  
  
  describe("Error Messages", function () {
    it('should return an error message if both a name and language has not been selected"', function () {
     
    let greet = MainGreetings();
  
     greet.setName("")
     greet.setLanguage("")
  
      assert.equal("Please enter your name and select a language.", greet.errorMessages())
    })
  
    it('should return an error message if a name was not entered ', function () {
      let greet = MainGreetings();
  
      greet.setName("")
      greet.setLanguage("english")
  
      assert.equal("Please enter your name.", greet.errorMessages())
    })
    it('should return an error message if a language was not selected', function () {
      let greet = MainGreetings();
  
      greet.setName("Raadi")
      greet.setLanguage("")
  
      assert.equal("Please select a language.", greet.errorMessages())
    })
  
  })
  
  describe("Checking Validity of Username Entered", function () {
    it('should return an error message when numbers are entered', function () {
      let greet = MainGreetings();
  
      greet.setName("D1edy")
      greet.setLanguage("english")
  
      assert.equal("Please enter your name.", greet.errorMessages())
    })
  
    it('should return an error message when symbols are entered', function () {
      let greet = MainGreetings();
  
      greet.setName("j*ess!c@")
      greet.setLanguage("arabic")
  
      assert.equal("Please enter your name.", greet.errorMessages())
    })
  })
  
  
  describe("Counter", function () {
    it('should return with counter display of 3', function () {
  
      let greet = MainGreetings();
  
  
      greet.setName("Raadiyah");
      greet.setName("Akhona");
      greet.setName("Saffah");
  
  
      assert.equal(3, greet.amountOfUsers());
    });
  
  
    it('should return 1 for same name', function () {
  
      let greet = MainGreetings();
  
      greet.setName('Raadiyah')
      greet.setName('Raadiyah')
      greet.setName('Raadiyah')
      greet.setName('Raadiyah')
  
  
      assert.equal(1, greet.amountOfUsers())
    })
  });
  
  
  describe("Reseting The Counter", function () {
    it('should return 0 once the counter reset button has been pressed ', function () {
  
      let greet = MainGreetings();
  
      greet.amountOfUsers("Ngomso", "english")
      greet.amountOfUsers("Tendani", "afrikaans")
      greet.amountOfUsers("Saffah", "arabic")
  
    
  
      assert.equal( 0, greet.amountOfUsers())
    })
  })