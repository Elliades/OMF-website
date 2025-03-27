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

  // Safely replace text with styled span
  const safeReplace = (text: string, pattern: RegExp, className: string) => {
    return text.replace(pattern, (match) => {
      // Escape any HTML in the match
      const escaped = match
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      
      return `<span class="${className}">${escaped}</span>`;
    });
  };

  // Syntax highlighting for Java/Kotlin
  const highlightCode = (code: string, lang: "java" | "kotlin") => {
    return code.split("\n").map((line, i) => {
      // Escape HTML in the line first
      let highlightedLine = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      
      // Keywords for both languages
      const keywords = [
        "public", "private", "protected", "class", "interface", "enum", "extends", "implements",
        "static", "final", "abstract", "native", "transient", "volatile", "synchronized",
        "void", "boolean", "byte", "short", "char", "int", "long", "float", "double",
        "if", "else", "switch", "case", "default", "for", "while", "do", "break", "continue",
        "return", "try", "catch", "finally", "throw", "throws", "new", "this", "super",
        "import", "package", "const", "goto", "strictfp", "assert", "var", "val", "fun",
        "data", "object", "companion", "sealed", "inline", "noinline", "crossinline",
        "reified", "expect", "actual", "external", "suspend", "tailrec", "operator",
        "infix", "internal", "annotation", "init", "constructor", "destructor", "by",
        "delegate", "dynamic", "field", "file", "finally", "get", "import", "init",
        "param", "property", "receiver", "set", "setparam", "where", "when"
      ];

      // Regular expressions for different code elements
      const patterns = {
        comment: /\/\/.*$/,
        multilineComment: /\/\*[\s\S]*?\*\//,
        string: /"(?:[^"\\]|\\.)*"/,
        number: /\b\d+\b/,
        keyword: new RegExp(`\\b(${keywords.join("|")})\\b`, 'g'),
        annotation: /@\w+/g,
        function: /\b\w+(?=\s*\()/g,
        type: /\b[A-Z]\w*\b/g,
      };

      // Apply highlighting in specific order
      // Comments first to avoid highlighting content inside comments
      if (line.includes("//")) {
        const parts = highlightedLine.split("//");
        if (parts.length > 1) {
          const comment = parts.slice(1).join("//");
          highlightedLine = parts[0] + `<span class="text-gray-400">//${comment}</span>`;
        }
      } else {
        // Not a comment line, proceed with other highlighting
        if (patterns.string.test(highlightedLine)) {
          highlightedLine = safeReplace(highlightedLine, patterns.string, "text-emerald-400");
        }

        if (patterns.number.test(highlightedLine)) {
          highlightedLine = safeReplace(highlightedLine, patterns.number, "text-orange-400");
        }

        if (patterns.annotation.test(highlightedLine)) {
          highlightedLine = highlightedLine.replace(patterns.annotation, (match) => 
            `<span class="text-pink-400">${match}</span>`
          );
        }

        if (patterns.keyword.test(highlightedLine)) {
          highlightedLine = highlightedLine.replace(patterns.keyword, (match) => 
            `<span class="text-blue-400">${match}</span>`
          );
        }

        if (patterns.function.test(highlightedLine)) {
          highlightedLine = highlightedLine.replace(patterns.function, (match) => 
            `<span class="text-yellow-400">${match}</span>`
          );
        }

        if (patterns.type.test(highlightedLine)) {
          highlightedLine = highlightedLine.replace(patterns.type, (match) => 
            `<span class="text-purple-400">${match}</span>`
          );
        }
      }

      return `<span class="line-number text-gray-500 mr-4">${i + 1}</span>${highlightedLine}`;
    }).join("\n");
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