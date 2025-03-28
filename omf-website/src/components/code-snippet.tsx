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
  highlightLines?: number[];
}

export default function CodeSnippet({
  code,
  language,
  title = "Code Example",
  className = "",
  highlightLines = [],
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
      // Escape any HTML in the match to prevent malformed HTML
      const escaped = match
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      
      return `<span class="${className}">${escaped}</span>`;
    });
  };

  // New helper function to apply highlighting with safety checks
  const applyHighlighting = (text: string, pattern: RegExp, className: string) => {
    if (!pattern.test(text)) return text;
    
    // Reset the RegExp lastIndex if it's a global regex
    if (pattern.global) pattern.lastIndex = 0;
    
    try {
      return safeReplace(text, pattern, className);
    } catch (error) {
      console.error("Error applying highlighting:", error);
      return text; // Return original text if there was an error
    }
  };

  // Syntax highlighting for Java/Kotlin
  const highlightCode = (code: string, language: "java" | "kotlin") => {
    // Clean up the code first - normalize line endings and trim extra blank lines
    const cleanedCode = code
      .replace(/\r\n/g, '\n')  // Normalize line endings
      .replace(/\n{3,}/g, '\n\n');  // Limit consecutive line breaks to max 2
    
    return cleanedCode.split("\n").map((line, i) => {
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
        "param", "property", "receiver", "set", "setparam", "where", "when", "override",
        "Test", "RunWith", "Suite", "SuiteClasses"
      ];

      // Regular expressions for different code elements
      const patterns = {
        comment: /\/\/.*$/,
        multilineComment: /\/\*[\s\S]*?\*\//,
        string: /"(?:[^"\\]|\\.)*"/g,
        number: /\b\d+\b/g,
        keyword: new RegExp(`\\b(${keywords.join("|")})\\b`, 'g'),
        annotation: /@[\w.]+(?:\([^)]*\))?/g,  // Simplified annotation pattern
        function: /\b\w+(?=\s*\()/g,
        type: /\b[A-Z]\w*\b/g,
      };

      // Apply highlighting in specific order
      // Comments first to avoid highlighting content inside comments
      if (line.includes("//")) {
        const commentIndex = line.indexOf("//");
        const codePart = highlightedLine.substring(0, commentIndex);
        const commentPart = highlightedLine.substring(commentIndex);
        
        // Apply highlighting to code part with safety checks
        let highlightedCodePart = codePart;
        
        // Apply syntax highlighting to code part in specific order
        highlightedCodePart = applyHighlighting(highlightedCodePart, patterns.string, "text-emerald-400");
        highlightedCodePart = applyHighlighting(highlightedCodePart, patterns.number, "text-orange-400");
        highlightedCodePart = applyHighlighting(highlightedCodePart, patterns.annotation, "text-pink-400");
        highlightedCodePart = applyHighlighting(highlightedCodePart, patterns.keyword, "text-blue-400");
        highlightedCodePart = applyHighlighting(highlightedCodePart, patterns.function, "text-yellow-400");
        highlightedCodePart = applyHighlighting(highlightedCodePart, patterns.type, "text-purple-400");
        
        // Combine with comment part
        highlightedLine = highlightedCodePart + '<span class="text-gray-400">' + commentPart + '</span>';
      } else {
        // Not a comment line, proceed with other highlighting in a specific order
        
        // First handle strings to avoid other rules applying to string contents
        highlightedLine = applyHighlighting(highlightedLine, patterns.string, "text-emerald-400");
        
        // Special handling for annotations to ensure they're colored properly and don't break HTML
        if (highlightedLine.includes("@")) {
          const annotationMatches = [...highlightedLine.matchAll(/@[\w.]+(?:\([^)]*\))?/g)];
          if (annotationMatches.length > 0) {
            for (const match of annotationMatches) {
              if (match.index !== undefined) {
                const annotation = match[0];
                const escapedAnnotation = annotation
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
                
                // Create a safer replacement by using a unique placeholder
                const placeholder = `__ANNOTATION_${Math.random().toString(36).substring(2)}__`;
                highlightedLine = highlightedLine.substring(0, match.index) + 
                  placeholder + 
                  highlightedLine.substring(match.index + annotation.length);
                
                // Replace the placeholder with properly wrapped annotation
                highlightedLine = highlightedLine.replace(
                  placeholder, 
                  `<span class="text-pink-400">${escapedAnnotation}</span>`
                );
              }
            }
          }
        }
        
        // Apply the rest of the highlighting in order
        highlightedLine = applyHighlighting(highlightedLine, patterns.number, "text-orange-400");
        highlightedLine = applyHighlighting(highlightedLine, patterns.keyword, "text-blue-400");
        highlightedLine = applyHighlighting(highlightedLine, patterns.function, "text-yellow-400");
        highlightedLine = applyHighlighting(highlightedLine, patterns.type, "text-purple-400");
      }

      // Check if this line should be highlighted
      const lineNumber = i + 1;
      const isHighlighted = highlightLines.includes(lineNumber);
      
      // Use clean DIV structure to avoid extra spacing and ensure consistent rendering
      return `<div class="${isHighlighted ? 'bg-yellow-500/10 -mx-4 px-4 border-l-2 border-yellow-500' : ''} flex">
        <span class="line-number text-gray-500 mr-4 flex-shrink-0 w-7 text-right">${lineNumber}</span>
        <span class="flex-grow">${highlightedLine || ' '}</span>
      </div>`;
    }).join("");  // Use empty string instead of newline to avoid extra spacing
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
          className="text-sm font-mono text-gray-200 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
        />
      </pre>
    </motion.div>
  );
}