import { openDB } from 'idb';
import { timestamp } from 'rxjs';


const initDB = async () => {
    return openDB('BlogDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('users')) {
                db.createObjectStore('users', { keyPath: 'username' });
            }
            if (!db.objectStoreNames.contains('posts')) {
                db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
            }
        }
    });
};

export const addUser = async (username, password) => {
    const db = await initDB();
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    await store.put({ username, password });
    return tx.done;
};

export const getUser = async (username) => {
    const db = await initDB();
    const users = await db.getAll('users');
    return users.find(user => user.username === username);
};



export const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};




export const getPosts = async () => {
    const db = await initDB();
    return db.getAll('posts');
};



export const deletePosts = async (id) => {
    const db = await initDB();
    const tx = db.transaction('posts', 'readwrite');
    const store = tx.objectStore('posts');
    await store.delete(id);
    return tx.done;
}

export const updatePosts = async (id, updatedData) => {
    const db = await initDB();
    const tx = db.transaction('posts', 'readwrite');
    const store = tx.objectStore('posts');
    const existingPost = await store.get(id);

    if (!existingPost) {
        console.error(`Post with ID ${id} not found`);
        return;
    }
    let s={ ...existingPost, ...updatedData };
    console.log(s);
    await store.put({ ...existingPost, ...updatedData });
    return tx.done;
};

export const savePost = async (title, content, imageFile) => {
    const db = await initDB();

   
    let imageBase64 = null;
    if (imageFile) {
        imageBase64 = await convertToBase64(imageFile);
    }


    const tx = db.transaction('posts', 'readwrite');
    const store = tx.objectStore('posts');

    const latestData = {
        title,
        content,
        image: imageBase64 ,
        timestamp:new Date().toISOString()
    };

    console.log("Saving to IndexedDB:", latestData);
    const id = await store.put(latestData);

    await tx.done;
    return id;
};
