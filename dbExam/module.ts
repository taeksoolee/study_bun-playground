import { Database } from "bun:sqlite"; 

export const getDb = () => {
  return new Database('mydb.sqlite');
}

export const closeDb = (db: Database) => {
  db.close();
}

export const createFooTable = (db: Database) => {
  db.run(
    "CREATE TABLE IF NOT EXISTS foo (id INTEGER PRIMARY KEY AUTOINCREMENT, greeting TEXT)"
  );
}

export const insertFooRow = (db: Database, greeting: string) => {
  db.run("INSERT INTO foo (greeting) VALUES (?)", greeting);
  // exec is run's alias
  // db.exec ("INSERT foo (greeting) VALUES (?)", greeting);
}

export const selectFooAtFirstRow = (db: Database) => {
  return db.query("SELECT * FROM foo").get();
}

export const selectFooAllRows = (db: Database) => {
  return db.query("SELECT * FROM foo").all();
}

export const selectFooRowsByGreeting = (db: Database, greeting: string) => {
  // get all rows matching a condition
  return db.query("SELECT * FROM foo WHERE greeting = ?").all(greeting);
}

export const selectFooRowsBy = (db: Database, whereOption: {
  $greeting: string,
}) => {
  // get first row matching a named condition
  return db.query("SELECT * FROM foo WHERE greeting = $greeting").get(whereOption);
}

export const insertFooRows = (db: Database, greetings: string[]) => {
  const insert = db.prepare("INSERT INTO foo (greeting) VALUES (?)");

  const insertMany = db.transaction((greetings: string[]) => {
    for (const greeting of greetings) insert.run(greeting);
  });

  insertMany(greetings);
}