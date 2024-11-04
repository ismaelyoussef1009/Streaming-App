// db.ts
import { openDB } from "idb"

const DB_NAME = "musicLibrary"
const STORE_NAME = "songs"

// Initialize and configure IndexedDB
export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true })
      }
    },
  })
}

// Add song to IndexedDB
export const addSong = async (song: any) => {
  const db = await initDB()
  return await db.add(STORE_NAME, song)
}

// Fetch all songs from IndexedDB
export const getSongs = async () => {
  const db = await initDB()
  return await db.getAll(STORE_NAME)
}
