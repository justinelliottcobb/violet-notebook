import { useState, useEffect } from 'react';
import { requireAuth } from '~/services/auth.client';
import { Button, TextInput, Textarea } from '@mantine/core';

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requireAuth();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Simplified - in real app, you'd save to your API
      console.log('Creating article:', { title, content });
      window.location.href = '/articles';
    } catch (error) {
      console.error('Failed to create article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Create New Article</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          mb="md"
        />
        <Textarea
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minRows={10}
          mb="md"
        />
        <Button type="submit" loading={isLoading}>
          Create Article
        </Button>
      </form>
    </div>
  );
}