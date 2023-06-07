import { openDB } from 'idb';

const initdb = async () =>
  openDB('ezText', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('ezText')) {
        console.log('ezText database already exists');
        return;
      }
      db.createObjectStore('ezText', { keyPath: 'id', autoIncrement: true });
      console.log('ezText database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => { 
  console.log('PUT to the database');
  const ezTextDb = await openDB('ezTextEditor', 1);
  const tx = ezTextDb.transaction('ezTextEditor', 'readwrite');
  const store = tx.objectStore('ezTextEditor');
  const request = store.put({id: id, ezTextEditor: content});
  const result = await request;
  console.log(' The new data has been saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('Get All from Db ');
const ezTextdb = await openDB('ezTextEditor', 1);
const tx = ezTextdb.transaction('ezTextEditor', 'readonly');
const store = tx.objectStore('ezTextEditor');
const request = store.getAll();
const result = await request;
console.log('Get All Achieved!', result);
return result;
};



initdb();
