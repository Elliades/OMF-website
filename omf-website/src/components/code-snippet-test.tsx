/**
 * Test component for debugging CodeSnippet rendering issues
 */
"use client";

import { useState, useEffect } from "react";
import { Card } from "./ui/card";

interface TestCase {
  name: string;
  code: string;
  language: "java" | "kotlin";
}

const testCases: TestCase[] = [
  {
    name: "Annotation Test",
    language: "java",
    code: `// Model comparison test
@Test
public void testBlockCreation() {
    // Create a block using your feature
    myFeature.createBlock("TestBlock");
    
    // Compare with expected model
    ModelComparator.compare(
        getCurrentModel(),
        getExpectedModel("expected-block.mdxml"),
        ComparisonSettings.ignoreUUIDs()
    );
}`
  },
  {
    name: "Kotlin Annotation Test",
    language: "kotlin",
    code: `// Test suite for the demo local batch
@RunWith(Suite::class)
@Suite.SuiteClasses(
    T0_BasicSysML_SimpleBlockCreation::class,
    T1_BasicSysML_MultiActionsBlockCreation::class
)
class DemoLocalBatch : ATestBatchLocal() {
    override fun initVariable() {
        initZipProject = "init_publicFeatures_Test.mdzip"
        oracleZipProject = "oracle_publicFeatures_Test.mdzip"
    }
}`
  }
];

export default function CodeSnippetTest() {
  const [renderedHtml, setRenderedHtml] = useState<Record<string, string>>({});
  const [selectedCase, setSelectedCase] = useState(0);

  // Function to escape HTML for display
  const escapeHtml = (html: string) => {
    return html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Basic syntax highlighting function for debugging
  const highlightCode = (code: string, language: "java" | "kotlin") => {
    // Very simple highlighting for testing
    return code
      .replace(/@\w+(?:\([^)]*\))?/g, '<span class="text-pink-400">$&</span>')
      .replace(/\/\/.*/g, '<span class="text-gray-400">$&</span>')
      .replace(/public|void|class|override|fun/g, '<span class="text-blue-400">$&</span>');
  };

  useEffect(() => {
    // Generate the rendered HTML for each test case
    const html: Record<string, string> = {};
    testCases.forEach((testCase, index) => {
      html[index] = highlightCode(testCase.code, testCase.language);
    });
    setRenderedHtml(html);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Code Snippet Test</h1>
      
      <div className="flex mb-4 space-x-2">
        {testCases.map((testCase, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${selectedCase === index 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setSelectedCase(index)}
          >
            {testCase.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-2">Original Code</h2>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
            <code>{testCases[selectedCase].code}</code>
          </pre>
        </Card>
        
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-2">Rendered HTML</h2>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
            <code>{escapeHtml(renderedHtml[selectedCase] || '')}</code>
          </pre>
        </Card>
        
        <Card className="p-4 md:col-span-2">
          <h2 className="text-lg font-bold mb-2">Preview</h2>
          <div className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
            <pre>
              <code dangerouslySetInnerHTML={{ __html: renderedHtml[selectedCase] || '' }} />
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
} 