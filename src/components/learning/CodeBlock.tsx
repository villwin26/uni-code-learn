import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export function CodeBlock({ code, language, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  // Simple syntax highlighting patterns
  const highlightCode = (code: string, lang: string) => {
    let highlightedCode = code;

    if (lang === 'javascript' || lang === 'js') {
      // Keywords
      highlightedCode = highlightedCode.replace(
        /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|finally)\b/g,
        '<span class="text-blue-400 font-medium">$1</span>'
      );
      
      // Strings
      highlightedCode = highlightedCode.replace(
        /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        '<span class="text-green-400">$1$2$3</span>'
      );
      
      // Comments
      highlightedCode = highlightedCode.replace(
        /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        '<span class="text-gray-400 italic">$1</span>'
      );
    } else if (lang === 'python' || lang === 'py') {
      // Keywords
      highlightedCode = highlightedCode.replace(
        /\b(def|class|if|elif|else|for|while|import|from|return|try|except|finally|with|as|lambda|and|or|not|in|is|True|False|None)\b/g,
        '<span class="text-blue-400 font-medium">$1</span>'
      );
      
      // Strings
      highlightedCode = highlightedCode.replace(
        /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        '<span class="text-green-400">$1$2$3</span>'
      );
      
      // Comments
      highlightedCode = highlightedCode.replace(
        /(#.*$)/gm,
        '<span class="text-gray-400 italic">$1</span>'
      );
    }

    // Numbers
    highlightedCode = highlightedCode.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span class="text-yellow-400">$1</span>'
    );

    return highlightedCode;
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 rounded-t-lg border-b border-slate-700">
        <span className="text-sm text-slate-400 font-mono">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-slate-700"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-slate-400" />
          )}
        </Button>
      </div>
      
      <pre className="code-block rounded-t-none border-t-0 overflow-x-auto">
        <code
          className="text-sm leading-relaxed font-mono"
          dangerouslySetInnerHTML={{
            __html: highlightCode(code, language)
          }}
        />
      </pre>
    </div>
  );
}