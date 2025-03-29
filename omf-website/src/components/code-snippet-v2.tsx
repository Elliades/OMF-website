/**
 * CodeSnippetV2 component for displaying code examples
 * An improved version that handles Kotlin annotations properly
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import hljs from 'highlight.js/lib/core';
import kotlin from 'highlight.js/lib/languages/kotlin';
import java from 'highlight.js/lib/languages/java';
import 'highlight.js/styles/atom-one-dark.css';

// Register the languages we need
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('java', java);

interface CodeSnippetV2Props {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  showLineNumbers?: boolean;
  maxHeight?: number;
}

export default function CodeSnippetV2({
  code,
  language = "kotlin",
  title = "Code Example",
  className = "",
  showLineNumbers = true,
  maxHeight = 400
}: CodeSnippetV2Props) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  
  // Highlight the code when the component mounts or the code changes
  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className={`rounded-lg overflow-hidden border border-gray-700 dark:border-gray-800 shadow-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="bg-gray-800 dark:bg-gray-900 px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-200">{title}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="text-xs hover:bg-gray-700 text-gray-300"
        >
          {copied ? (
            <span className="text-green-400 flex items-center">
              <Check className="h-4 w-4 mr-1" />
              Copied!
            </span>
          ) : (
            <span className="flex items-center text-gray-300">
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </span>
          )}
        </Button>
      </div>
      
      <div 
        className="relative" 
        style={{ maxHeight: maxHeight, overflow: 'auto' }}
      >
        <pre 
          ref={preRef}
          className="p-4 bg-gray-900 dark:bg-gray-950 overflow-x-auto text-sm font-mono m-0"
        >
          <code 
            ref={codeRef}
            className={`language-${language}`}
            style={{ whiteSpace: 'pre' }}
          >
            {code}
          </code>
        </pre>
        
        {showLineNumbers && (
          <div className="absolute left-0 top-0 pl-2 pt-4 text-right select-none">
            {code.split('\n').map((_, i) => (
              <div 
                key={i} 
                className="text-gray-500 dark:text-gray-600 text-xs leading-5"
                style={{ height: '1.25rem' }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
} 