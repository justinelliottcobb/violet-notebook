import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { requireAuth } from '~/services/auth.client';
import { type Article } from '~/models/article.server';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const loadArticle = useCallback(async () => {
    try {
      // Simplified - in real app, you'd fetch from your API
      setArticle({
        id: '1',
        title: id?.replace(/-/g, ' ') || 'Unknown Article',
        content: 'Article content would go here',
        authorId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to load article:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    requireAuth();
    loadArticle();
  }, [loadArticle]);

  if (loading) {
    return <div>Loading article...</div>;
  }

  return (
    <div className="container">
      <h1>{article?.title}</h1>
      <div>{article?.content}</div>
    </div>
  );
}