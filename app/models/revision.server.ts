import { initDB } from '~/db/client.server';

export interface Revision {
  id?: string;
  articleId: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export async function createRevision(articleId: string, title: string, content: string, authorId: string) {
  const db = await initDB();
  const result = await db.create('revision', {
    articleId,
    title,
    content,
    authorId,
    createdAt: new Date().toISOString()
  });
  return result[0];
}

export async function getRevisions(title: string) {
  const db = await initDB();
  const result = await db.query(
    'SELECT * FROM revision WHERE string::lowercase(title) = string::lowercase($title) ORDER BY createdAt DESC',
    { title }
  );
  return result[0];
}
