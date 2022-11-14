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
// Exporting a function to POST to the db
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
// Exporting a function to GET to the db
export const getDb = async () => {
	console.log("GET from the database");
	const jateDB = await openDB("jate", 1); // again, creating a new connection to db & establishing what version to use
	const tx = jateDB.transaction("jate", "readonly");
	const store = tx.objectStore("jate");
	const request = store.getAll(); // Using .getAll() method to retrieve data in the db

	// GET confirmation of the request
	const result = await request;
	console.log("result.value", result);
	return results;
};

initdb();
