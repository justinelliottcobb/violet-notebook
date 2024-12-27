import type { MetaFunction } from '@remix-run/node';
import { NotebookEditorWrapper } from '~/components/NotebookEditorWrapper';

export const meta: MetaFunction = () => {
  return [
    { title: "Violet Notebook" },
    { name: "description", content: "Welcome to Violet Notebook!" },
  ];
};

export default function Index() {
  return (
    <div className="container">
      <h1>Welcome to Violet Notebook</h1>
      <NotebookEditorWrapper />
    </div>
  );
}