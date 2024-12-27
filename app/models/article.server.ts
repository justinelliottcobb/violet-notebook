import { initDB } from '~/db/client.server';
import { createRevision } from './revision.server';

export interface Article {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export async function createArticle(title: string, content: string, authorId: string) {
  const db = await initDB();
  console.log('Creating article:', { title, content, authorId });
  // Use SurrealDB's time::now() instead of JS Date
  const result = await db.query(
    'CREATE article SET title = $title, content = $content, authorId = $authorId, createdAt = time::now(), updatedAt = time::now()',
    { title, content, authorId }
  );
  return result[0][0];
}

export async function getArticles() {
  const db = await initDB();
  const result = await db.query('SELECT * FROM article ORDER BY createdAt DESC');
  return result[0];
}

export async function getArticleByTitle(title: string) {
  const db = await initDB();
  console.log('Searching for article with title:', title);
  // Use string::lowercase() for case-insensitive comparison
  const result = await db.query(
    'SELECT * FROM article WHERE string::lowercase(title) = string::lowercase($title) LIMIT 1', 
    { title }
  );
  console.log('Query result:', result);
  return result[0][0];
}

export async function getArticle(id: string) {
  const db = await initDB();
  const result = await db.query('SELECT * FROM article WHERE id = type::thing("article", $id)', { id });
  return result[0][0];
}

export async function updateArticle(title: string, data: Partial<Article>, authorId: string) {
  const db = await initDB();
  
  // First create a revision
  console.log('Creating revision for:', { title, authorId }); // Debug
  const revisionResult = await db.query(
    'CREATE revision SET articleId = $title, title = $title, content = $oldContent, authorId = $authorId, createdAt = time::now()',
    { 
      title,
      oldContent: data.content,
      authorId 
    }
  );
  console.log('Revision created:', revisionResult); // Debug
  
  // Then update the article
  const result = await db.query(
    'UPDATE article SET title = $newTitle, content = $content, updatedAt = time::now() WHERE string::lowercase(title) = string::lowercase($title)',
    { 
      title,
      newTitle: data.title,
      content: data.content
    }
  );
  
  return result[0][0];
}

export async function deleteArticle(title: string) {
  const db = await initDB();
  await db.query(
    'DELETE FROM article WHERE string::lowercase(title) = string::lowercase($title)', 
    { title }
  );
 }
