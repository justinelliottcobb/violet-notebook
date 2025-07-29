import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, type Article } from '~/models/article.server';
import { requireAuth } from '~/services/auth.client';

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requireAuth();
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const articleData = await getArticles();
      setArticles(articleData);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading articles...</div>;
  }

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
