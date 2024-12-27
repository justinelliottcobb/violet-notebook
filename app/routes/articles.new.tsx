import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { createArticle } from '~/models/article.server';
import { requireAuth } from '~/services/auth.server';
import { MarkdownEditorWrapper } from '~/components/MarkdownEditorWrapper';

export async function loader({ request }: { request: Request }) {
  await requireAuth(request);
  const url = new URL(request.url);
  const title = url.searchParams.get('title');
  return json({ title: title ? decodeURIComponent(title) : '' });
}

export async function action({ request }: { request: Request }) {
  const userId = await requireAuth(request);
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await createArticle(title, content, userId);
  return redirect('/articlelist');
}

export default function NewArticle() {
  const { title } = useLoaderData<typeof loader>();

  return (
    <div className="container">
      <h1>New Article</h1>
      <Form method="post">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
          required
          value={title}
          readOnly={!!title}
        />
        <MarkdownEditorWrapper />
        <button type="submit" className="px-4 py-2 mt-4 text-white bg-violet-600 rounded">
          Save Article
        </button>
      </Form>
    </div>
  );
}
