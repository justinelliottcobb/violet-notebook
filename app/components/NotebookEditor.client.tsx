import { useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './NotebookEditor.module.scss';

export function NotebookEditor() {
  const [content, setContent] = useState('');

  const handleChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <div className={styles.editor}>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }}
      />
      <input type="hidden" name="content" value={content} />
    </div>
  );
}