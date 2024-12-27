import { useCallback, useEffect, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorState } from '@codemirror/state';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import styles from './MarkdownEditor.module.scss';

export function MarkdownEditor({ initialValue = '', onChange }: { 
  initialValue?: string; 
  onChange?: (value: string) => void;
}) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [content, setContent] = useState(initialValue);

  useEffect(() => {
    if (!element) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const newContent = update.state.doc.toString();
        setContent(newContent);
        console.log('Editor content updated:', newContent); // Debug log
        if (onChange) {
          onChange(newContent);
        }
      }
    });

    const view = new EditorView({
      state: EditorState.create({
        doc: initialValue,
        extensions: [
          basicSetup,
          markdown(),
          syntaxHighlighting(defaultHighlightStyle),
          updateListener,
          EditorView.theme({
            '&': { height: '500px' },
            '.cm-content': { fontFamily: 'inherit' },
            '.cm-line': { padding: '0 9px' },
            '&.cm-editor.cm-focused': { outline: 'none' },
          }),
        ],
      }),
      parent: element,
    });

    return () => view.destroy();
  }, [element, initialValue, onChange]);

  return (
    <div className={styles.editor}>
      <div ref={setElement} />
      <input type="hidden" name="content" value={content} />
    </div>
  );
}
