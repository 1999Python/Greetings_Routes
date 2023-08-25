const query = (db) => {
    const insert = async (greetedName) => {
      await db.none(
        "insert into names (name, count) values ($1, $2)",
        [greetedName, 1]
      );
    };
  
    const updateCount = async () => {
      return await db.oneOrNone(
        "select count (distinct greetedNames) From names"
      );
    };
  
    const count = async (name) => {
      return await db.oneOrNone(
        "select sum(greetcount) from names where greetedNames = $1",
        [name]
      );
    };
  
    const greeted = async () => {
      return await db.any("select distinct greetedNames from names");
    };
  
    const reset = async () => {
      await db.none("delete from names");
    };
  
    return {
      insert,
      updateCount,
      greeted,
      reset,
      count,
    };
  };
  
  export default query;