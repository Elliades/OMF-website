/**
 * Client component wrapper for code snippets
 * This separates client and server components to fix metadata export issues
 */
"use client";

import React from 'react';
import CodeSnippet from "@/components/code-snippet";
import CodeSnippetV2 from "@/components/code-snippet-v2";

interface ClientComponentProps {
  code: string;
  language: string;
  title: string;
  componentType: 'original' | 'improved';
}

export function ClientComponent({ code, language, title, componentType }: ClientComponentProps) {
  // Type casting to ensure compatibility with CodeSnippet's strict type requirement
  const typedLanguage = language === "java" || language === "kotlin" 
    ? language 
    : "kotlin"; // Default to kotlin for any other language

  // Choose which component to render based on the componentType
  if (componentType === 'original') {
    return (
      <CodeSnippet 
        code={code} 
        language={typedLanguage as "java" | "kotlin"} 
        title={title} 
      />
    );
  } else {
    return (
      <CodeSnippetV2 
        code={code} 
        language={language} 
        title={title} 
      />
    );
  }
}