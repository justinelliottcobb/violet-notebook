import { initDB } from '~/db/client.server';

export interface Article {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

// export async function createArticle(title: string, content: string, authorId: string) {
//   const db = await initDB();
//   const result = await db.create('article', {
//     title,
//     content,
//     authorId,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString()
//   });
//   return result[0];
// }

export async function createArticle(title: string, content: string, authorId: string) {
  const db = await initDB();
  console.log('Creating article:', { title, content, authorId });
  const result = await db.create('article', {
    title,
    content,
    authorId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return result[0];
}

export async function getArticles(): Promise<Article[]> {
  const db = await initDB();
  const result = await db.query('SELECT * FROM article ORDER BY createdAt DESC');
  return result[0] as Article[];
}

// export async function getArticle(id: string) {
//   const db = await initDB();
//   const result = await db.query('SELECT * FROM article WHERE id = type::thing("article", $id)', { id });
//   return result[0][0];
// }

export async function getArticleByTitle(title: string): Promise<Article | null> {
  const db = await initDB();
  console.log('Searching for article with title:', title);
  // Use string::lowercase() for case-insensitive comparison
  const result = await db.query(
    'SELECT * FROM article WHERE string::lowercase(title) = string::lowercase($title) LIMIT 1', 
    { title }
  );
  console.log('Query result:', result);
  const article = (result as unknown[][])[0]?.[0];
  return article as Article | null;
}

export async function getArticle(id: string): Promise<Article | null> {
  const db = await initDB();
  const result = await db.query('SELECT * FROM article WHERE id = type::thing("article", $id)', { id });
  const article = (result as unknown[][])[0]?.[0];
  return article as Article | null;
}
