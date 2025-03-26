/**
 * CodeSnippet component for displaying code examples
 * Used to show OMF code samples
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export default function CodeSnippet({
  code,
  language = "java",
  title = "Code Example",
  className = "",
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className={`rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-soft ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
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
      <pre
        className="bg-[#1e293b] text-[#e2e8f0] p-4 overflow-x-auto text-sm font-mono"
      >
        <code>
          {code.split('\n').map((line, index) => (
            <div key={index} className="leading-relaxed">
              {line.includes('//') ? (
                <>
                  {line.split('//')[0]}
                  <span className="text-[#94a3b8]">// {line.split('//')[1]}</span>
                </>
              ) : line.includes('new') ? (
                line.replace(/(new\s+\w+)/g, match => `<span class="text-[#7dd3fc]">${match}</span>`)
              ) : line.includes('try') || line.includes('if') || line.includes('for') ? (
                <span className="text-[#7dd3fc]">{line}</span>
              ) : line.includes('.') && line.includes('(') ? (
                line.replace(/(\.\w+\()/g, match => `<span class="text-[#c4b5fd]">${match}</span>`)
              ) : line.includes('"') ? (
                line.replace(/"([^"]*)"/g, match => `<span class="text-[#86efac]">${match}</span>`)
              ) : (
                line
              )}
            </div>
          ))}
        </code>
      </pre>
    </motion.div>
  );
}