
const query = (db) => {

  
    const insert = async (greetedName) => {
        await db.none(
          "INSERT INTO guest (name, count) VALUES ($1, $2)",
          [greetedName, 1]
        );
      };  
      const count = async (name) => {
        return await db.oneOrNone(
          "SELECT SUM(count) AS count FROM names WHERE name = $1",
          [name]
        );
      };

      const getGreetedNames = async () => {
        return await db.any("SELECT DISTINCT name FROM name");
      };
    
    
    const updateCount = async () => {
        return await db.oneOrNone(
            "SELECT COUNT(DISTINCT ames) AS count FROM name"
        );
      };
    const reset = async () => {
        await db.none("DELETE FROM names");
    };
    
    return {
        insert,
        reset,
        count,
        getGreetedNames,
        updateCount
    };
};

export default query;
   
  
   

  