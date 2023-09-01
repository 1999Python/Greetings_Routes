import assert from 'assert'
import Query from '../service/queries.js'
import pgPromise from 'pg-promise'
import 'dotenv/config';

const pgp = pgPromise({});

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

const query = Query(db)

describe('Greetings Web App with Routes',function () {

  this.timeout(20000);

  beforeEach(
    async () => {
      await query.reset();
    }
  )

    it('should insert a name into the nname feild in the database table called guest',  async () => {


        await query.insert("Raadiyah"); // insert names into the table
        
        const result = await query.getGreetedNames() 
        console.log(result)
        
        const testResult = result[0].name;

        assert.equal(testResult, "Raadiyah")
      });

      it('should return the amount of times the user was greeted.', async () => {

        const userName = "TomandJerry";//shows how many times a user was greeted
     
      await query.insert(userName);
      await query.insert(userName);
      await query.insert(userName);

        const count = await query.count(userName);
        assert.equal(count.count, 3)
      });
      
      it('should return a distinctive name and amount greeted from the table', async () =>{
        await query.insert("food");
        await query.insert("juice");
      
        const getGreetedNames = await query.getGreetedNames();
      
        const expectedNamesCounts = [
          { name: 'food', count: 1 },
          { name: 'juice', count: 1 }
        ];
        //forEach loop to iterate through the expectedNamesAndCounts array checks 
        //if each expected name exists in the getGreetedNames using find.
        //For each expected name found, assert that the count matches the expected count.
      
        expectedNamesCounts.forEach((expected) => {
          const found = getGreetedNames.find((entry) => entry.name === expected.name);
          assert.ok(found, `Expected name '${expected.name}' not found.`);
          assert.equal(found.count, expected.count, `Incorrect count for '${expected.name}'.`);
        });
      });
      
      it('should delete all the records from database table.', async () => {
       
        await query.insert("Hidaayatullah");
        await query.insert("Saffah");
        await query.insert("Ngomso");
        await query.insert("Tendani"); //reseting the table
       
        await query.reset();
        const count = await query.updateCount()
        assert.equal(count.count, 0);
      });


      });
        
       
      



    //   it('', async () =>{

    //   });

    //   it('', async () =>{
        
    //   });
