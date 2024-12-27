import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { getArticleByTitle } from '~/models/article.server';
import { requireAuth } from '~/services/auth.server';
import { MarkdownDisplay } from '~/components/MarkdownDisplay';

export async function loader({ request, params }: { request: Request; params: { id: string } }) {
  await requireAuth(request);
  const title = decodeURIComponent(params.id).replace(/-/g, ' ');
  console.log('Looking for article:', { originalId: params.id, decodedTitle: title });
  const article = await getArticleByTitle(title);
  console.log('Found article:', article);

  if (!article) {
    const createUrl = `/articles/new?title=${encodeURIComponent(title)}&fromWiki=true`;
    return json({ 
      article: { 
        title, 
        content: `This article doesn't exist yet. Would you like to [create it](${createUrl})?` 
      } 
    });
  }
  
  return json({ article });
}

export default function Article() {
  const { article } = useLoaderData<typeof loader>();
  
  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <h1>{article.title}</h1>
        <Link 
          to={`/article/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))}/edit`} 
          className="button"
        >
          Edit
        </Link>
      </div>
      <MarkdownDisplay content={article.content} />
    </div>
  );
}
