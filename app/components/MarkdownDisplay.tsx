// app/components/MarkdownDisplay.tsx
import { marked } from 'marked';
import styles from './MarkdownDisplay.module.scss';

export function MarkdownDisplay({ content }: { content: string }) {
  const processedContent = content.replace(/\[\[(.*?)\]\]/g, (match, pageName) => {
    return `[${pageName}]([[${pageName}]])`;
  });
  
  const html = marked(processedContent);
  
  return (
    <div 
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}