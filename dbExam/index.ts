import { createFooTable, getDb, insertFooRow, insertFooRows, selectFooAllRows } from "./module";

const db = getDb();
// createFooTable(db);

// insertFooRow(db, "Welcome to Bun!");

insertFooRows(db, [
  "hello world!",
  "Node vs Bun!!",
]);

const rows = selectFooAllRows(db);
console.log(rows);

db.close();