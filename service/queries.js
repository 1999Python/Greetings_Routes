
const query = (db) => {

  const insert = async (greetedName) => {
    // Check if the user already exists in the database
    const existingUser = await db.oneOrNone("SELECT * FROM guest WHERE name = $1", [greetedName]);
    if (existingUser) {
      //  increment the count if user is existing 
      await db.none("UPDATE guest SET count = count + 1 WHERE name = $1", [greetedName]);
    } else {
      // If the user doesn't exist, insert a new record
      await db.none("INSERT INTO guest (name, count) VALUES ($1, 1)", [greetedName]);
    }
  };
  
  // const insert = async (greetedName) => {
  //   await db.none(
  //     "INSERT INTO guest (name, count) VALUES ($1, $2)",
  //     [greetedName, 1]
  //   );
  // };
  const count = async (name) => {
    return await db.oneOrNone(
      "SELECT SUM(count) AS count FROM guest WHERE name = $1",
      [name]
    );
  };


  const userCount = async (name) => {
    try {
      const result = await db.one("SELECT count FROM guest WHERE name = $1", [name]);
      return result.count;
    } catch (error) {
      // Handle the error
      console.error(`Error while retrieving user count for name '${name}':`, error.message);
      return null; // Or throw an error
    }
  };
  

  const getGreetedNames = async () => {
    return await db.none("SELECT DISTINCT name, count FROM guest");
  };

  const greetedUser = async () => {
    return await db.many("SELECT name, count FROM guest");

  };

  const updateCount = async () => {
    return await db.one(
      "SELECT COUNT(DISTINCT name) AS count FROM guest"
    );
  };



  const reset = async () => {
    try {
      await db.none('DELETE FROM guest'); // Delete all records from the "guest" table
      console.log('Guest table reset successfully.');
    } catch (error) {
      console.error('Error resetting guest table:', error.message);
    }
  };

  return {
    insert,
    reset,
    count,
    getGreetedNames,
    updateCount,
    userCount,
    greetedUser
  };
};

export default query;




