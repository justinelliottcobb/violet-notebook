import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { getArticles } from '~/models/article.server';
import { requireAuth } from '~/services/auth.server';

export async function loader({ request }: { request: Request }) {
  await requireAuth(request);
  const articles = await getArticles();
  return json({ articles });
}

export default function Articles() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="container">
      <h1>Articles List</h1>
      <div className="grid gap-4">
        {articles.map((article) => (
          <Link 
            to={`/article/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))}`} 
            key={article.id} 
            className="p-4 border rounded hover:bg-gray-50"
          >
            <h2>{article.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// <Link to={`/article/${article.id.id}`} key={article.id.id} className="p-4 border rounded hover:bg-gray-50">
