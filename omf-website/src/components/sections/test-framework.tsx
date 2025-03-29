/**
 * "Test Framework" section component
 * Showcases OMF's functional test framework with model comparison and scenario testing
 */
"use client";

import { motion } from "framer-motion";
import Section from "../section";
import PlaceholderMedia from "../placeholder-media";
import CodeSnippetV2 from "../code-snippet-v2";

interface TestFrameworkProps {
  index?: number;
}

export default function TestFramework({ index = 6 }: TestFrameworkProps) {
  // Example code snippet for test framework
  const testFrameworkCode = 
`// Test suite for the demo local batch
@RunWith(Suite::class)
@Suite.SuiteClasses( // BasicSysML
    T0_BasicSysML_SimpleBlockCreation::class,
    T1_BasicSysML_MultiActionsBlockCreation::class,
    T3CreatePort::class // Tests KOs

    ,
    T1_KO_wrongBlockName::class,
    T2_KO_noCreation::class,
    T3_KO_noDeletion::class

)
// Emplacement of the init and oracle projects
class DemoLocalBatch : ATestBatchLocal() {
    override fun initVariable() {
        initZipProject = "init_publicFeatures_Test.mdzip"
        oracleZipProject = "oracle_publicFeatures_Test.mdzip"
    }
}

// Simulate Block creation by user, in test package
class T0_BasicSysML_SimpleBlockCreation : AModelComparatorTestCase() {
    override fun initVariables() {
        // Test case name
        // Test case ID
        // Test package where the test is conducted
        name =            "2.Create a block in a single user action"
        testCaseID =      "T2_BasicSysML_SingleActionBlockCreation"
        testPackageName = "2.Create a block in a single user action"
    }

    // Which Magicdraw options should be set to run the test
    override fun initOptions() {}

    // Simulate the action to be tested (in this case, a block creation)
    // Could be a UI action call, an element creation to activate listener, etc.
    override fun testAction() {
        val owner = findTestedElementByID("_2021x_2_da1032a_1686310758915_84973_2922") // test package
        val myBlock = SysMLFactory.getInstance().createBlock(owner)
        myBlock.name = "MyBlock"
    }

    // MagicDraw options to be set after the test
    override fun reInitEnvOptions() {}
}`;

  const useCasesCode = 
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
      className="bg-section-alt-1 dark:section-dark px-3 sm:px-6"
      index={index}
    >
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Automatically test your plugins using the integrated functional test framework. 
          Efficiently compare SysML models and simulate user scenarios to ensure reliability.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-12 w-full max-w-full overflow-hidden">
        <div className="w-full overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-full"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">
              Reliable Testing, Simplified
            </h3>
            
            <div className="space-y-4 sm:space-y-8 w-full max-w-full">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 w-full max-w-full break-words">
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
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
                    className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-500 flex-shrink-0"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  <span className="flex-shrink break-words">Model Comparison</span>
                </h4>
                <ul className="ml-6 sm:ml-8 list-disc space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base break-words">
                  <li className="break-words">Compare actual models with expected outcomes</li>
                  <li className="break-words">Ignore volatile elements like UUIDs</li>
                  <li className="break-words">Detailed difference reporting</li>
                  <li className="break-words">Configurable comparison settings</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 w-full max-w-full break-words">
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
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
                    className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-500 flex-shrink-0"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                  <span className="flex-shrink break-words">Scenario Testing</span>
                </h4>
                <ul className="ml-6 sm:ml-8 list-disc space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base break-words">
                  <li className="break-words">Record and replay user interactions</li>
                  <li className="break-words">Simulate clicks, drags, and keyboard input</li>
                  <li className="break-words">Verify UI responses</li>
                  <li className="break-words">Test complete user workflows</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4 sm:space-y-8 w-full max-w-full overflow-hidden">
          <div className="w-full overflow-x-auto">
            <CodeSnippetV2
              code={testFrameworkCode}
              title="Test Suite Definition"
              className="shadow-sm text-sm sm:text-base w-full"
              language="kotlin"
            />
          </div>
          
          <div className="w-full overflow-x-auto">
            <CodeSnippetV2
              code={useCasesCode}
              title="Test Use Cases"
              className="shadow-sm text-sm sm:text-base w-full"
              language="java"
            />
          </div>
          
          <div className="w-full overflow-hidden">
            <PlaceholderMedia 
              type="gif" 
              height={200} 
              label="SysML model comparison with highlighted results"
              className="shadow-lg rounded-lg w-full"
            />
          </div>
        </div>
      </div>
      
      <motion.div
        className="mt-8 sm:mt-16 text-center w-full max-w-full overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="inline-block bg-green-50 px-4 sm:px-8 py-3 sm:py-4 rounded-full text-green-700 font-medium border border-green-100 shadow-sm text-sm sm:text-base max-w-full break-words">
          <span className="flex items-center justify-center flex-wrap">
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
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="break-words">100% Test Coverage Made Possible with OMF Test Framework</span>
          </span>
        </div>
      </motion.div>
    </Section>
  );
} 