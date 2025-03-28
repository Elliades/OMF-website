/**
 * Improved CodeSnippet component with more reliable syntax highlighting
 * Focuses on proper handling of annotations and avoiding HTML issues
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

export default function CodeSnippetV2({
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

  // Simplified highlighter that processes line by line
  const highlightCode = (code: string, language: "java" | "kotlin") => {
    // Clean up the code first - normalize line endings
    const cleanedCode = code.replace(/\r\n/g, '\n');
    
    // Process the code line by line to avoid cross-line issues
    return cleanedCode.split('\n').map((line, lineIndex) => {
      // First, escape HTML characters to prevent issues
      let escapedLine = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      
      // Store segments to be joined later (safer than nested regex replacements)
      const segments: { text: string; class?: string }[] = [{ text: escapedLine }];
      
      // Process segments to apply highlighting
      const processedSegments = processSegments(segments);
      
      // Join segments into HTML
      const processedLine = processedSegments.map(segment => 
        segment.class 
          ? `<span class="${segment.class}">${segment.text}</span>` 
          : segment.text
      ).join('');
      
      // Is this line highlighted?
      const lineNumber = lineIndex + 1;
      const isHighlighted = highlightLines.includes(lineNumber);
      
      // Render line with line number
      return `<div class="${isHighlighted ? 'bg-yellow-500/10 -mx-4 px-4 border-l-2 border-yellow-500' : ''} flex">
        <span class="line-number text-gray-500 mr-4 flex-shrink-0 w-7 text-right">${lineNumber}</span>
        <span class="flex-grow">${processedLine || ' '}</span>
      </div>`;
    }).join('');
  };
  
  // Process segments for highlighting (recursive function)
  const processSegments = (segments: { text: string; class?: string }[]): { text: string; class?: string }[] => {
    // Process comments first (highest priority)
    let result = processComments(segments);
    
    // Then strings
    result = processStrings(result);
    
    // Then annotations
    result = processAnnotations(result);
    
    // Then keywords and other syntax
    result = processKeywords(result);
    result = processNumbers(result);
    result = processFunctions(result);
    result = processTypes(result);
    
    return result;
  };
  
  // Process comments in segments
  const processComments = (segments: { text: string; class?: string }[]): { text: string; class?: string }[] => {
    const result: { text: string; class?: string }[] = [];
    
    for (const segment of segments) {
      // Skip already highlighted segments
      if (segment.class) {
        result.push(segment);
        continue;
      }
      
      const text = segment.text;
      const commentIndex = text.indexOf('//');
      
      if (commentIndex >= 0) {
        // Split into code and comment
        if (commentIndex > 0) {
          result.push({ text: text.substring(0, commentIndex) });
        }
        result.push({ 
          text: text.substring(commentIndex), 
          class: 'text-gray-400' 
        });
      } else {
        result.push(segment);
      }
    }
    
    return result;
  };
  
  // Process strings in segments
  const processStrings = (segments: { text: string; class?: string }[]): { text: string; class?: string }[] => {
    const result: { text: string; class?: string }[] = [];
    const stringRegex = /"(?:[^"\\]|\\.)*"/g;
    
    for (const segment of segments) {
      // Skip already highlighted segments
      if (segment.class) {
        result.push(segment);
        continue;
      }
      
      const text = segment.text;
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      
      stringRegex.lastIndex = 0; // Reset regex state
      
      let foundMatch = false;
      while ((match = stringRegex.exec(text)) !== null) {
        foundMatch = true;
        // Add text before the match
        if (match.index > lastIndex) {
          result.push({ text: text.substring(lastIndex, match.index) });
        }
        
        // Add the string match with highlighting
        result.push({ 
          text: match[0], 
          class: 'text-emerald-400' 
        });
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (!foundMatch) {
        result.push(segment);
      } else if (lastIndex < text.length) {
        result.push({ text: text.substring(lastIndex) });
      }
    }
    
    return result;
  };
  
  // Process annotations in segments
  const processAnnotations = (segments: { text: string; class?: string }[]): { text: string; class?: string }[] => {
    const result: { text: string; class?: string }[] = [];
    const annotationRegex = /@[\w.]+(?:\([^)]*\))?/g;
    
    for (const segment of segments) {
      // Skip already highlighted segments
      if (segment.class) {
        result.push(segment);
        continue;
      }
      
      const text = segment.text;
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      
      annotationRegex.lastIndex = 0; // Reset regex state
      
      let foundMatch = false;
      while ((match = annotationRegex.exec(text)) !== null) {
        foundMatch = true;
        // Add text before the match
        if (match.index > lastIndex) {
          result.push({ text: text.substring(lastIndex, match.index) });
        }
        
        // Add the annotation match with highlighting
        result.push({ 
          text: match[0], 
          class: 'text-pink-400' 
        });
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (!foundMatch) {
        result.push(segment);
      } else if (lastIndex < text.length) {
        result.push({ text: text.substring(lastIndex) });
      }
    }
    
    return result;
  };
  
  // Process keywords in segments
  const processKeywords = (segments: { text: string; class?: string }[]): { text: string; class?: string }[] => {
    const result: { text: string; class?: string }[] = [];
    
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
    
    const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, 'g');
    
    for (const segment of segments) {
      // Skip already highlighted segments
      if (segment.class) {
        result.push(segment);
        continue;
      }
      
      const text = segment.text;
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      
      keywordRegex.lastIndex = 0; // Reset regex state
      
      let foundMatch = false;
      while ((match = keywordRegex.exec(text)) !== null) {
        foundMatch = true;
        // Add text before the match
        if (match.index > lastIndex) {
          result.push({ text: text.substring(lastIndex, match.index) });
        }
        
        // Add the keyword match with highlighting
        result.push({ 
          text: match[0], 
          class: 'text-blue-400' 
        });
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (!foundMatch) {
        result.push(segment);
      } else if (lastIndex < text.length) {
        result.push({ text: text.substring(lastIndex) });
      }
    }
    
    return result;
  };
  
  // Process numbers in segments
  const processNumbers = (segments: { text: string; class?: string }[]): { text: string; class?: string }[] => {
    const result: { text: string; class?: string }[] = [];
    const numberRegex = /\b\d+\b/g;
    
    for (const segment of segments) {
      // Skip already highlighted segments
      if (segment.class) {
        result.push(segment);
        continue;
      }
      
      const text = segment.text;
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      
      numberRegex.lastIndex = 0; // Reset regex state
      
      let foundMatch = false;
      while ((match = numberRegex.exec(text)) !== null) {
        foundMatch = true;
        // Add text before the match
        if (match.index > lastIndex) {
          result.push({ text: text.substring(lastIndex, match.index) });
        }
        
        // Add the number match with highlighting
        result.push({ 
          text: match[0], 
          class: 'text-orange-400' 
        });
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (!foundMatch) {
        result.push(segment);
      } else if (lastIndex < text.length) {
        result.push({ text: text.substring(lastIndex) });
      }
    }
    
    return result;
  };
  
  // Process function calls in segments
  const processFunctions = (segments: { text: string; class?: string }[]): { text: string; class?: string }[] => {
    const result: { text: string; class?: string }[] = [];
    const functionRegex = /\b\w+(?=\s*\()/g;
    
    for (const segment of segments) {
      // Skip already highlighted segments
      if (segment.class) {
        result.push(segment);
        continue;
      }
      
      const text = segment.text;
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      
      functionRegex.lastIndex = 0; // Reset regex state
      
      let foundMatch = false;
      while ((match = functionRegex.exec(text)) !== null) {
        foundMatch = true;
        // Add text before the match
        if (match.index > lastIndex) {
          result.push({ text: text.substring(lastIndex, match.index) });
        }
        
        // Add the function match with highlighting
        result.push({ 
          text: match[0], 
          class: 'text-yellow-400' 
        });
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (!foundMatch) {
        result.push(segment);
      } else if (lastIndex < text.length) {
        result.push({ text: text.substring(lastIndex) });
      }
    }
    
    return result;
  };
  
  // Process types in segments
  const processTypes = (segments: { text: string; class?: string }[]): { text: string; class?: string }[] => {
    const result: { text: string; class?: string }[] = [];
    const typeRegex = /\b[A-Z]\w*\b/g;
    
    for (const segment of segments) {
      // Skip already highlighted segments
      if (segment.class) {
        result.push(segment);
        continue;
      }
      
      const text = segment.text;
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      
      typeRegex.lastIndex = 0; // Reset regex state
      
      let foundMatch = false;
      while ((match = typeRegex.exec(text)) !== null) {
        foundMatch = true;
        // Add text before the match
        if (match.index > lastIndex) {
          result.push({ text: text.substring(lastIndex, match.index) });
        }
        
        // Add the type match with highlighting
        result.push({ 
          text: match[0], 
          class: 'text-purple-400' 
        });
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (!foundMatch) {
        result.push(segment);
      } else if (lastIndex < text.length) {
        result.push({ text: text.substring(lastIndex) });
      }
    }
    
    return result;
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