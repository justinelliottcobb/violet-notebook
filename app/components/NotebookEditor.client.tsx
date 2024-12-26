import { useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './NotebookEditor.module.scss';

export function NotebookEditor() {
  const handleChange = useCallback((content: string) => {
    console.log(content);
  }, []);

  return (
    <div className={styles.editor}>
      <ReactQuill
        theme="snow"
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
    </div>
  );
}
