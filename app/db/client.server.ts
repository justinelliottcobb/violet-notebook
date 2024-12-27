import Surreal from "surrealdb";

const db = new Surreal();
let schemaInitialized = false;

export async function initDB() {
  try {
    await db.connect('http://127.0.0.1:8000/rpc');
    await db.signin({
      username: process.env.SURREAL_USER || '',
      password: process.env.SURREAL_PASS || '',
    });
    await db.use({ 
      namespace: 'violet',
      database: 'notebook'
    });

    // Only try to initialize schema once per server start
    if (!schemaInitialized && process.env.NODE_ENV === 'development') {
      try {
        // Define tables and fields in a single transaction
        await db.query(`
          -- Define user table
          DEFINE TABLE IF NOT EXISTS user SCHEMAFULL;
          DEFINE FIELD IF NOT EXISTS email ON user TYPE string;
          DEFINE FIELD IF NOT EXISTS password ON user TYPE string;
          DEFINE FIELD IF NOT EXISTS createdAt ON user TYPE datetime;

          -- Define article table
          DEFINE TABLE IF NOT EXISTS article SCHEMAFULL;
          DEFINE FIELD IF NOT EXISTS title ON article TYPE string;
          DEFINE FIELD IF NOT EXISTS content ON article TYPE string;
          DEFINE FIELD IF NOT EXISTS authorId ON article TYPE string;
          DEFINE FIELD IF NOT EXISTS createdAt ON article TYPE datetime;
          DEFINE FIELD IF NOT EXISTS updatedAt ON article TYPE datetime;

          -- Define revision table
          DEFINE TABLE IF NOT EXISTS revision SCHEMAFULL;
          DEFINE FIELD IF NOT EXISTS articleId ON revision TYPE string;
          DEFINE FIELD IF NOT EXISTS title ON revision TYPE string;
          DEFINE FIELD IF NOT EXISTS content ON revision TYPE string;
          DEFINE FIELD IF NOT EXISTS authorId ON revision TYPE string;
          DEFINE FIELD IF NOT EXISTS createdAt ON revision TYPE datetime;
        `);
        schemaInitialized = true;
      } catch (schemaError) {
        console.warn('Schema initialization warning:', schemaError);
      }
    }

    return db;
  } catch (error) {
    console.error('DB Connection Error:', error);
    throw error;
  }
}
