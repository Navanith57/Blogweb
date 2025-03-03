import { openDB } from 'idb';

// Initialize IndexedDB
const initDB = async () => {
    return openDB('BlogDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('users')) {
                db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains('posts')) {
                db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
            }
        }
    });
};

// Add user to IndexedDB
export const addUser = async (username, password) => {
    const db = await initDB();
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    await store.put({ username, password });
    return tx.done;
};

// Fetch user by username
export const getUser = async (username) => {
    const db = await initDB();
    const users = await db.getAll('users');
    return users.find(user => user.username === username);
};

// Save blog post with image
export const savePost = async (title, content, image) => {
    const db = await initDB();
    const tx = db.transaction('posts', 'readwrite');
    const store = tx.objectStore('posts');
    await store.put({ title, content, image, timestamp: new Date().toISOString() });
    return tx.done;
};

// Get all posts
export const getPosts = async () => {
    const db = await initDB();
    return db.getAll('posts');
};
