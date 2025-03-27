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

  // Process comments first to avoid parsing their content
  const processComments = (line: string) => {
    if (line.includes("//")) {
      const commentIndex = line.indexOf("//");
      const codeSection = line.substring(0, commentIndex);
      const commentSection = line.substring(commentIndex);
      return {
        codeSection,
        commentSection,
        hasComment: true
      };
    }
    return {
      codeSection: line,
      commentSection: "",
      hasComment: false
    };
  };

  // Safe HTML escaping
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Highlight specific code parts
  const highlightCode = (code: string, lang: "java" | "kotlin") => {
    // Define regex patterns
    const patterns = {
      annotation: /@\w+/g,
      keyword: /\b(public|private|protected|class|interface|enum|extends|implements|static|final|abstract|void|boolean|byte|short|char|int|long|float|double|if|else|switch|case|default|for|while|do|break|continue|return|try|catch|finally|throw|throws|new|this|super|import|package|assert|var|val|fun|null|true|false|Test)\b/g,
      string: /"(?:[^"\\]|\\.)*"/g,
      method: /\b\w+(?=\s*\()/g,
      methodChaining: /\.\w+(?=\s*\()/g, // Method calls in chaining
      number: /\b\d+\b/g,
      constant: /\b[A-Z][A-Z0-9_]*\b/g,
      type: /\b[A-Z][a-zA-Z0-9_]*\b/g,
      punctuation: /[{}()[\]]/g
    };

    return code.split("\n").map((line, i) => {
      // Process and extract comments first
      const { codeSection, commentSection, hasComment } = processComments(line);
      
      // Escape HTML in both sections
      let escapedCode = escapeHtml(codeSection);
      const escapedComment = hasComment ? escapeHtml(commentSection) : "";
      
      // Apply syntax highlighting to the code section
      
      // First handle annotations (they have @ prefix)
      if (patterns.annotation.test(escapedCode)) {
        escapedCode = escapedCode.replace(patterns.annotation, match => 
          `<span class="text-pink-400">${match}</span>`
        );
      }
      
      // Method chaining
      if (patterns.methodChaining.test(escapedCode)) {
        escapedCode = escapedCode.replace(patterns.methodChaining, match => 
          `<span class="text-yellow-300">${match}</span>`
        );
      }
      
      // Normal methods
      if (patterns.method.test(escapedCode)) {
        escapedCode = escapedCode.replace(patterns.method, match => {
          // Avoid highlighting methods that are part of chains
          if (match === 'assert' || match === 'return') return match;
          return `<span class="text-yellow-400">${match}</span>`;
        });
      }
      
      // Keywords
      if (patterns.keyword.test(escapedCode)) {
        escapedCode = escapedCode.replace(patterns.keyword, match => 
          `<span class="text-blue-400">${match}</span>`
        );
      }
      
      // Strings
      if (patterns.string.test(escapedCode)) {
        escapedCode = escapedCode.replace(patterns.string, match => 
          `<span class="text-emerald-400">${match}</span>`
        );
      }
      
      // Constants and types
      if (patterns.constant.test(escapedCode)) {
        escapedCode = escapedCode.replace(patterns.constant, match => {
          if (match === 'Test') return match; // Skip Test annotation
          return `<span class="text-orange-400">${match}</span>`;
        });
      }
      
      // Types (classes, interfaces, etc.)
      if (patterns.type.test(escapedCode)) {
        escapedCode = escapedCode.replace(patterns.type, match => {
          // Skip already highlighted keywords or constants
          if (match === 'Test' || /^[A-Z][A-Z0-9_]*$/.test(match)) return match;
          return `<span class="text-purple-400">${match}</span>`;
        });
      }
      
      // Numbers
      if (patterns.number.test(escapedCode)) {
        escapedCode = escapedCode.replace(patterns.number, match => 
          `<span class="text-orange-300">${match}</span>`
        );
      }
      
      // Punctuation
      if (patterns.punctuation.test(escapedCode)) {
        escapedCode = escapedCode.replace(patterns.punctuation, match => 
          `<span class="text-gray-400">${match}</span>`
        );
      }
      
      // Combine code with comment (with highlighting)
      const highlightedLine = escapedCode + (hasComment ? 
        `<span class="text-gray-400">${escapedComment}</span>` : "");
      
      // Add line number
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