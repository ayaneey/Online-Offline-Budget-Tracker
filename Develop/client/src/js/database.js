import { openDB } from "idb";

const initdb = async () =>
	openDB("jate", 1, {
		// Adding database schema if not already initialized
		upgrade(db) {
			if (db.objectStoreNames.contains("jate")) {
				console.log("jate database already exists");
				return;
			}
			db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
			console.log("jate database created");
		},
	});

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
	console.log("Submit to database");
	const jateDB = await openDB("jate", 1); // establishes a connection to the db and which version we want to use
	const tx = jateDB.transaction("jate", "rewrite");
	const store = tx.objectStore("jate"); // selects the intended object store
	const request = store.add({ id: 1, value: content });
	const result = await request;
	console.log("🚀 - data is saved to the database", result); // confirmation of the request!
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
	console.log("GET from the database");
};

// Form a connection to the database as well as desired version to use.
const jateDB = await openDB("jate", 1);

initdb();
