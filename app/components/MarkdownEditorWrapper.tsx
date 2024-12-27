import { ClientOnly } from 'remix-utils/client-only';
import { MarkdownEditor } from './MarkdownEditor.client';

export function MarkdownEditorWrapper({ initialValue, onChange }: { 
  initialValue?: string; 
  onChange?: (value: string) => void;
}) {
  return (
    <ClientOnly fallback={<div>Loading editor...</div>}>
      {() => <MarkdownEditor initialValue={initialValue} onChange={onChange} />}
    </ClientOnly>
  );
}