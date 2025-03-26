/**
 * "Test Framework" section component
 * Showcases OMF's functional test framework with model comparison and scenario testing
 */
"use client";

import { motion } from "framer-motion";
import Section from "../section";
import PlaceholderMedia from "../placeholder-media";
import CodeSnippet from "../code-snippet";

interface TestFrameworkProps {
  index?: number;
}

export default function TestFramework({ index = 6 }: TestFrameworkProps) {
  // Example code snippet for test framework
  const testFrameworkCode = 
`// Model comparison test
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
}

// User scenario test
@Test
public void testUserWorkflow() {
    // Record a complete user workflow
    ScenarioTester.record()
        .selectDiagram("System Context")
        .clickOn(BrowserElement.of("Component"))
        .dragTo(x, y)
        .clickButton("Apply")
        .execute();
    
    // Verify result matches expectation
    ScenarioTester.assertResult()
        .elementExists("Component1")
        .hasProperty("name", "Component1")
        .isVisible();
}`;

  return (
    <Section
      id="test-framework"
      title="Functional Test Framework"
      subtitle="Automated testing for reliability"
      className="bg-section-alt-1 dark:section-dark"
      index={index}
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          Automatically test your plugins using the integrated functional test framework. 
          Efficiently compare SysML models and simulate user scenarios to ensure reliability.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">
              Reliable Testing, Simplified
            </h3>
            
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 mr-2 text-blue-500"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  Model Comparison
                </h4>
                <ul className="ml-8 list-disc space-y-2 text-gray-700">
                  <li>Compare actual models with expected outcomes</li>
                  <li>Ignore volatile elements like UUIDs</li>
                  <li>Detailed difference reporting</li>
                  <li>Configurable comparison settings</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 mr-2 text-green-500"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                  Scenario Testing
                </h4>
                <ul className="ml-8 list-disc space-y-2 text-gray-700">
                  <li>Record and replay user interactions</li>
                  <li>Simulate clicks, drags, and keyboard input</li>
                  <li>Verify UI responses</li>
                  <li>Test complete user workflows</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          <CodeSnippet 
            code={testFrameworkCode} 
            title="Functional Test Examples"
            className="shadow-sm"
          />
          
          <PlaceholderMedia 
            type="gif" 
            height={300} 
            label="SysML model comparison with highlighted results"
            className="shadow-lg rounded-lg"
          />
        </div>
      </div>
      
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="inline-block bg-green-50 px-8 py-4 rounded-full text-green-700 font-medium border border-green-100 shadow-sm">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            100% Test Coverage Made Possible with OMF Test Framework
          </span>
        </div>
      </motion.div>
    </Section>
  );
} 