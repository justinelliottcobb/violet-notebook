import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requireAuth } from '~/services/auth.client';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requireAuth();
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      // Simplified - in real app, you'd fetch from your API
      setArticle({
        title: id?.replace(/-/g, ' ') || 'Unknown Article',
        content: 'Article content would go here'
      });
    } catch (error) {
      console.error('Failed to load article:', error);
    } finally {
      setLoading(false);
    }
  };

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