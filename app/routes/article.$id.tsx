import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getArticle } from '~/models/article.server';
import { requireAuth } from '~/services/auth.server';

export async function loader({ request, params }: { request: Request; params: { id: string } }) {
  await requireAuth(request);
  const article = await getArticle(params.id);
  return json({ article });
}

export default function Article() {
  const { article } = useLoaderData<typeof loader>();
  return (
    <div className="container">
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}