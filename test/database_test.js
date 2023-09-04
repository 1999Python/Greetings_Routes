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


  it('should update the count for an existing greeted user', async () => {
    
    const userName = "MickeyMouse";
    await query.insert(userName);
    // Get the initial count
    const initialCount = await query.userCount(userName);
    
    // Insert the user again to increment the count
    await query.insert(userName);
  
    const updatedCount = await query.userCount(userName);
    
    assert.equal(updatedCount, initialCount + 1, `Count for '${userName}' was not updated correctly.`);
  });
  
  it('should return null for a non-existing user count', async () => {
    const nonExistingUser = "NonExistingUser";
    
    // Attempt to get the count for a non-existing user
    const count = await query.userCount(nonExistingUser);
    
    assert.equal(count, null, `Expected null for user count of '${nonExistingUser}'.`);
  });
  

      it('should return the amount of times the user was greeted.', async () => {

        const userName = "TomandJerry";//shows how many times a user was greeted
     
      await query.insert(userName);
      await query.insert(userName);
      await query.insert(userName);

        const count = await query.count(userName);
        assert.equal(count.count, 3)
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

  ///////// 

  it('should update the count for an existing greeted user', async () => {
    const userName = "MickeyMouse";
    await query.insert(userName);
    
    const initialCount = await query.userCount(userName);
    await query.insert(userName); // Increment the count for the same user
    
    const updatedCount = await query.userCount(userName);
    assert.equal(updatedCount, initialCount + 1, `Count for '${userName}' was not updated correctly.`);
  });
  
  it('should return null for a non-existing user count', async () => {
    const userName = "NonExistingUser";
    const count = await query.userCount(userName);
    assert.equal(count, null, `Expected null for user count of '${userName}'.`);
  });
  
  it('should return an empty array when no users are greeted after a reset', async () => {
   
    await query.insert("Pink");
    await query.insert("Yellow");
    
    // Check that there are records in the database before reset
    const countBeforeReset = await query.updateCount();
    assert.notEqual(countBeforeReset.count, 0, "Expected records in the database before reset.");
    await query.reset();
    // Check that there are no records in the database after reset
    const countAfterReset = await query.updateCount();
    assert.equal(countAfterReset.count, 0, "Expected no records in the database after reset.");
  });
  

  });
  


  
        
       
      



  
    