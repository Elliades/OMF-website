/**
 * Test page for debugging code highlighting
 */
import { Metadata } from "next";
import CodeSnippetTest from "@/components/code-snippet-test";
import CodeSnippet from "@/components/code-snippet";
import CodeSnippetV2 from "@/components/code-snippet-v2";

export const metadata: Metadata = {
  title: "Code Snippet Test | OMF",
  description: "Testing environment for code snippet highlighting",
};

// Test Java code with annotation
const javaTestCode = `// Model comparison test
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
}`;

// Test Kotlin code with annotation
const kotlinTestCode = `// Test suite for the demo local batch
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
}`;

export default function TestPage() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Code Snippet Component Comparison</h1>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Java Annotation Test</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Original Component</h3>
              <CodeSnippet 
                code={javaTestCode} 
                language="java" 
                title="Original Java Code" 
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Improved Component (V2)</h3>
              <CodeSnippetV2 
                code={javaTestCode} 
                language="java" 
                title="Improved Java Code" 
              />
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Kotlin Annotation Test</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Original Component</h3>
              <CodeSnippet 
                code={kotlinTestCode} 
                language="kotlin" 
                title="Original Kotlin Code" 
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Improved Component (V2)</h3>
              <CodeSnippetV2 
                code={kotlinTestCode} 
                language="kotlin" 
                title="Improved Kotlin Code" 
              />
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Debug Tool</h2>
          <CodeSnippetTest />
        </div>
      </div>
    </main>
  );
} 