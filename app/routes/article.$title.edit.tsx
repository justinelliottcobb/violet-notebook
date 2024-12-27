import { Form, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { getArticleByTitle, updateArticle, deleteArticle } from '~/models/article.server';
import { requireAuth } from '~/services/auth.server';
import { MarkdownEditorWrapper } from '~/components/MarkdownEditorWrapper';

export async function loader({ request, params }: { request: Request; params: { title: string } }) {
  await requireAuth(request);
  const title = decodeURIComponent(params.title).replace(/-/g, ' ');
  const article = await getArticleByTitle(title);
  if (!article) throw new Response("Not Found", { status: 404 });
  return json({ article });
}

export async function action({ request, params }: { request: Request; params: { title: string } }) {
  const userId = await requireAuth(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  const originalTitle = decodeURIComponent(params.title).replace(/-/g, ' ');
 
  if (intent === "delete") {
    await deleteArticle(originalTitle);
    return redirect("/articlelist");
  }

  const newTitle = formData.get("title") as string;
  const content = formData.get("content") as string;
  await updateArticle(originalTitle, { title: newTitle, content });
  return redirect(`/article/${encodeURIComponent(newTitle.toLowerCase().replace(/\s+/g, '-'))}`);
}

export default function EditArticle() {
 const { article } = useLoaderData<typeof loader>();

 return (
   <div className="container">
     <h1>Edit Article</h1>
     <Form method="post">
       <input
         type="text"
         name="title"
         defaultValue={article.title}
         className="w-full p-2 mb-4 border rounded"
         required
       />
       <MarkdownEditorWrapper initialValue={article.content} />
       <div className="flex justify-between mt-4">
         <button type="submit">Save Changes</button>
         <button 
           type="submit" 
           name="intent" 
           value="delete"
           className="bg-red-600"
           onClick={e => {
             if (!confirm("Are you sure?")) {
               e.preventDefault();
             }
           }}
         >
           Delete Article
         </button>
       </div>
     </Form>
   </div>
 );
}
