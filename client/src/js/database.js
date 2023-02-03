// imports the "idb" package to use indexedDB .
import { openDB } from 'idb';

// Create a function that can be used to initialize (startup) the database.
const initdb = async () =>
  // creates a database named jate (version 1)
  openDB('jate', 1, {
    // Sets the database schema (if it isn't already defined).
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // Create an object store for our data inside the "jate" database.
      // key named "id" will be automatically incremented.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // CRUD operations

// TODO: Add logic to a method that accepts some content and adds it to the database
// Exports putDb function to PUT to the database
export const putDb = async (content) => {
  console.log('putDb - PUT to the database');
  // Create a connection to the DB and version
  const jateDb = await openDB("jate", 1);
  // create a new transaction and specify the DB and data privileges.
  const trans = jateDb.transaction("jate", "readwrite");
  // Open the desired object store.
  const store = trans.objectStore("jate");
  // Use the .put() method on the store and pass in the content. (pass the key, value)
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request
  const result = await request;
  
  console.log("data saved successfully", result)

  
};

// TODO: Add logic for a method that gets all the content from the database
// Method that gets content from the IndexedDB database using the idb module
export const getDb = async () => {
  console.log('getDb - GET from the database');
  // Create a connection to the DB and version
  const jateDb = await openDB("jate", 1);
  // create a new transaction and specify the DB and data privileges.
  const trans = jateDb.transaction("jate", "readonly");
  // Open the desired object store.
  const store = trans.objectStore("jate");
  // Use the .get() method on the store and pass in the content. (pass the key)
  const request = store.get(1);
  // Get confirmation of the request
  const result = await request;
  // ternary-- if there was a result, success (and result) is returned
  // otherwise failure data not found
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  // Chained operator: if there was a result and there was a value in the result, return the result.value
  return result?.value;
};

// call the initialize database function.
initdb();
