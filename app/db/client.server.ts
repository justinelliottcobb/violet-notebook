import Surreal from "surrealdb";

const db = new Surreal();

export async function initDB() {
  try {
    await db.connect('http://127.0.0.1:8000/rpc');
    await db.signin({
      username: process.env.SURREAL_USER || '',
      password: process.env.SURREAL_PASS || '',
    });
    await db.use({ 
      namespace: 'violet',  // changed from ns to namespace
      database: 'notebook'  // changed from db to database
    });
    return db;
  } catch (error) {
    console.error('DB Connection Error:', error);
    throw error;
  }
}