/**
 * CodeSnippet component for displaying code examples with syntax highlighting
 * Supports Java and Kotlin code with proper syntax highlighting
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code: string;
  language: "java" | "kotlin";
  title?: string;
  className?: string;
}

export default function CodeSnippet({
  code,
  language,
  title = "Code Example",
  className = "",
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Syntax highlighting for Java/Kotlin
  const highlightCode = (code: string, lang: "java" | "kotlin") => {
    const lines = code.split("\n");
    const processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Line number
      const linePrefix = `<span class="line-number text-gray-500 mr-4">${i + 1}</span>`;
      
      // Skip empty lines
      if (line.trim() === '') {
        processedLines.push(`${linePrefix}`);
        continue;
      }

      // Process different line types
      if (line.trim().startsWith("//")) {
        // Single line comment
        processedLines.push(`${linePrefix}<span class="text-gray-400">${line}</span>`);
      } else if (line.trim().startsWith("@")) {
        // Annotation
        const matches = line.match(/(@\w+)(\(.*\))?/);
        if (matches) {
          const annotation = matches[1];
          const params = matches[2] || '';
          const remainingText = line.slice((annotation + params).length);
          
          let processedLine = `${linePrefix}<span class="text-pink-400">${annotation}${params}</span>`;
          if (remainingText) {
            processedLine += remainingText;
          }
          processedLines.push(processedLine);
        } else {
          processedLines.push(`${linePrefix}${line}`);
        }
      } else {
        // Regular code - apply syntax highlighting for keywords, strings, etc.
        let processedLine = line;
        
        // Keywords
        const keywords = [
          "public", "private", "protected", "class", "interface", "enum", "extends", "implements",
          "static", "final", "abstract", "native", "transient", "volatile", "synchronized",
          "void", "boolean", "byte", "short", "char", "int", "long", "float", "double",
          "if", "else", "switch", "case", "default", "for", "while", "do", "break", "continue",
          "return", "try", "catch", "finally", "throw", "throws", "new", "this", "super",
          "import", "package", "const", "goto", "strictfp", "assert", "var", "val", "fun"
        ];
        
        // Replace keywords
        keywords.forEach(keyword => {
          const pattern = new RegExp(`\\b${keyword}\\b`, 'g');
          processedLine = processedLine.replace(pattern, `<span class="text-blue-400">${keyword}</span>`);
        });
        
        // Strings
        processedLine = processedLine.replace(/"([^"]*)"/g, '<span class="text-emerald-400">"$1"</span>');
        
        // Functions
        processedLine = processedLine.replace(/\b(\w+)\s*\(/g, '<span class="text-yellow-400">$1</span>(');
        
        // Types (capitalized words)
        processedLine = processedLine.replace(/\b([A-Z]\w*)\b/g, '<span class="text-purple-400">$1</span>');
        
        // Numbers
        processedLine = processedLine.replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>');
        
        // Inline comments after code
        if (processedLine.includes("//")) {
          const [code, comment] = processedLine.split("//", 2);
          processedLine = `${code}<span class="text-gray-400">//${comment}</span>`;
        }
        
        processedLines.push(`${linePrefix}${processedLine}`);
      }
    }
    
    return processedLines.join("\n");
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-lg border border-gray-200 dark:border-gray-700 shadow-soft",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="text-xs hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {copied ? (
            <span className="text-green-600 dark:text-green-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center text-gray-600 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy
            </span>
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto bg-[#1e293b] rounded-b-lg">
        <code
          className="text-sm font-mono text-gray-200"
          dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
        />
      </pre>
    </motion.div>
  );
}