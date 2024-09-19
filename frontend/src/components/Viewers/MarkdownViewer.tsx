import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface MarkdownViewerProps {
  input: string;
  className?: string;
}

const MarkdownViewer = ({ className, input }: MarkdownViewerProps) => {
  return (
    <div className={className}>
      <Markdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        children={input}
        className="prose"
      />
    </div>
  );
};

export default MarkdownViewer;
