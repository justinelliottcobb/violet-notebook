// app/components/MarkdownDisplay.tsx
import { marked } from 'marked';
import styles from './MarkdownDisplay.module.scss';

const renderer = new marked.Renderer();

renderer.link = (href: any, title: string | null, text: string) => {
  // Handle the case where href is an object (from marked's parsing)
  const hrefString = typeof href === 'object' && href.href ? href.href : href;
  const displayText = typeof href === 'object' && href.text ? href.text : text;

  if (typeof hrefString === 'string' && hrefString.startsWith('[[') && hrefString.endsWith(']]')) {
    const pageName = hrefString.slice(2, -2);
    const urlSafeName = encodeURIComponent(pageName.toLowerCase().replace(/\s+/g, '-'));
    return `<a href="/article/${urlSafeName}" class="wikilink">${displayText || pageName}</a>`;
  }
  
  const safeHref = hrefString || '#';
  return `<a href="${safeHref}">${displayText}</a>`;
};

marked.use({ renderer });

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