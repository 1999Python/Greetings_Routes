const query = (db) => {

  const insert = async (greetedName) => {
    await db.none(
      "INSERT INTO guest (name, count) VALUES ($1, $2)",
      [greetedName, 1]
    );
  };

  const count = async () => {
    const result = await db.manyOrNone("SELECT COUNT(*) FROM guest")
    return result[0].count;
  };

const checkingName = async (name) => {

const result = await db.manyOrNone("SELECT 1 FROM guest WHERE name = $1", [name])

return result.length > 0;
};

  const userCount = async (name) => {
  
      const result = await db.any("SELECT count FROM guest WHERE name = $1", [name]);
      if (result && result.length > 0) {
        return result; // Return the count data if it exists
      } else {
        return []; // Return an empty array if no data is found
      } 
  };


  const getGreetedNames = async () => {
    return await db.any("SELECT DISTINCT name, count FROM guest");
  };

  const greetedUser = async () => {
    return await db.many("SELECT name, count FROM guest");

  };

  const updateCount = async (name) => {
    
    await db.none("UPDATE guest SET count = count + 1 WHERE name = $1", [name]);
 
  };

  const reset = async () => {
    await db.none('DELETE FROM guest'); // Delete all records from the "guest" table
    await db.one("SELECT setval ('guest_id_seq', 1, false)");
  };

  return {
    insert,
    reset,
    count,
    getGreetedNames,
    updateCount,
    userCount,
    greetedUser,
    checkingName,
  };
};

export default query;




