import { useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMantineColorScheme } from '@mantine/core';
import styles from './NotebookEditor.module.scss';

export function NotebookEditor() {
  const { colorScheme } = useMantineColorScheme();
  const handleChange = useCallback((content: string) => {
    // Handle content changes
    console.log(content);
  }, []);

  return (
    <div className={styles.editor} data-color-scheme={colorScheme}>
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