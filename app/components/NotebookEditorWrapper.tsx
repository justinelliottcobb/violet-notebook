import { ClientOnly } from 'remix-utils/client-only';
import { NotebookEditor } from './NotebookEditor.client';

export function NotebookEditorWrapper() {
  return (
    <ClientOnly fallback={<div>Loading editor...</div>}>
      {() => <NotebookEditor />}
    </ClientOnly>
  );
}
