import { useState } from 'react';

interface CodeBlockProps {
  filename?: string;
  language?: string;
  code: string;
}

function highlightCode(code: string) {
  const keywords = /\b(public|private|protected|static|void|class|new|return|import|package|extends|implements|interface|enum|final|if|else|for|while|switch|case|break|continue|this|null|true|false|int|double|float|long|boolean|String|var|let|const|grammar)\b/g;
  const types = /\b(String|Integer|Double|List|Map|Personne|Patrimoine|Possession|Compte|FluxArgent|Materiel|Dette|Creance|LocalDate|System|FecParser|PlanComptableGeneral|RecoupementFec|VisualiseurPatrimoine|CharStream|PatriLangLexer|CommonTokenStream|PatriLangParser|ParseTree|ParseTreeWalker|PatriListener|Alerte|EcritureComptable|LigneFec|Ecart)\b/g;
  const strings = /"[^"]*"/g;
  const comments = /\/\/[^\n]*/g;
  const numbers = /\b(\d[\d_]*\.?\d*)\b/g;

  return code
    .split('\n')
    .map((line, i) => {
      const lineNum = `<span class="text-slate-600 select-none mr-4" style="color: var(--code-line-num)">${String(i + 1).padStart(2, ' ')}</span>`;
      let highlighted = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      highlighted = highlighted.replace(comments, '<span class="text-slate-600 italic">$&</span>');
      highlighted = highlighted.replace(strings, '<span class="text-accent-300">$&</span>');
      highlighted = highlighted.replace(keywords, '<span class="text-jtr-violet">$&</span>');
      highlighted = highlighted.replace(types, '<span class="text-jtr-cyan">$&</span>');
      highlighted = highlighted.replace(numbers, '<span class="text-school-400">$&</span>');

      return `<div>${lineNum}${highlighted}</div>`;
    })
    .join('');
}

export default function CodeBlock({ filename, language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm" style={{ backgroundColor: 'var(--code-bg)', borderColor: 'var(--border-default)' }}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5" style={{ backgroundColor: 'var(--code-header-bg)', borderBottomColor: 'var(--border-default)' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          {filename && (
            <span className="ml-2 font-mono text-xs text-slate-400">{filename}</span>
          )}
          {language && (
            <span className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-500 transition-all duration-300 hover:bg-white/5 hover:text-accent-300"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono" style={{ color: 'var(--text-code)' }} dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  );
}
