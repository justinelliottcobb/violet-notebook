import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { getRevisions } from '~/models/revision.server';
import { requireAuth } from '~/services/auth.server';

export async function loader({ request, params }: { request: Request; params: { title: string } }) {
  await requireAuth(request);
  const title = decodeURIComponent(params.title).replace(/-/g, ' ');
  console.log('Revisions loader - looking for title:', title); // Debug

  const revisions = await getRevisions(title);
  console.log('Revisions loader - found revisions:', revisions); // Debug

  return json({ revisions, title });
}

export default function ArticleRevisions() {
  const { revisions, title } = useLoaderData<typeof loader>();

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1>Revision History: {title}</h1>
        <Link to={`/article/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`}>
          Back to Article
        </Link>
      </div>
      
      <div className="space-y-4">
        {revisions.map((revision: Revision) => (
          <div key={revision.id} className="border p-4 rounded">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(revision.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="mt-2">
              <h3 className="font-medium">Changes:</h3>
              <pre className="mt-2 p-2 bg-gray-50 rounded overflow-x-auto">
                {revision.content.slice(0, 200)}...
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
