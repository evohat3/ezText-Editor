// import { openDB } from 'idb';

// const initdb = async () =>
//   openDB('jate', 1, {
//     upgrade(db) {
//       if (db.objectStoreNames.contains('jate')) {
//         console.log('jate database already exists');
//         return;
//       }
//       db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
//       console.log('jate database created');
//     },
//   });

// // TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');

// // TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');

// initdb();


import { openDB } from 'idb';

const initdb = async () =>
  openDB('txtEditor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('txtEditor')) {
        console.log("txtEditor database already exists");
        return;
      }
      db.createObjectStore('txtEditor', { keyPath: 'id', autoIncrement: true });
      console.log('txtEditor database created');
    },
  });

export const putDb = async (content) => {
  console.log('Post to DB');

  const jateDb = await openDB('txtEditor', 1);
  const tx = jateDb.transaction('txtEditor', 'readwrite');
  const store = tx.objectStore('txtEditor');

  const request = store.add({ jate: content });
  const result = await request;

  console.log('Data saved to the db', result);
};

export const getDb = async () => {
  console.log('Get from DB');

  const jateDb = await openDB('txtEditor', 1);
  const tx = jateDb.transaction('txtEditor', 'readonly');
  const store = tx.objectStore('txtEditor');

  const request = store.getAll();
  const result = await request;

  console.log('Data retrieved from the db', result);
  return result;
};

initdb();