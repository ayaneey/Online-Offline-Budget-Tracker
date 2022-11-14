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
export const putDb = async (content) => console.error("putDb not implemented");
console.log("Submit to database");
const jateDB = await openDB("jate", 1);
const tx = jateDB.transaction("");

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error("getDb not implemented");

initdb();
