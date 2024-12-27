import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { getArticleByTitle } from '~/models/article.server';
import { requireAuth } from '~/services/auth.server';
import { MarkdownDisplay } from '~/components/MarkdownDisplay';

export async function loader({ request, params }: { request: Request; params: { title: string } }) {
  await requireAuth(request);
  const title = decodeURIComponent(params.title).replace(/-/g, ' ');
  console.log('Loading article, received title:', title); // Debug log

  const article = await getArticleByTitle(title);
  console.log('Retrieved article:', article); // Debug log

  if (!article) {
    console.log('No article found, returning create suggestion'); // Debug log
    return json({ 
      article: { 
        title, 
        content: `This article doesn't exist yet. Would you like to [create it](/articles/new)?` 
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
        <div className="space-x-4">
          <Link to="revisions" className="button">History</Link>
          <Link to="edit" className="button">Edit</Link>
        </div>
      </div>
      <MarkdownDisplay content={article.content} />
    </div>
  );
}
