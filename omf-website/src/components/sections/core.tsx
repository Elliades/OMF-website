/**
 * "Core: Robustness and Simplicity" section component
 * Showcases the OMF Barrier and core features
 */
"use client";

import { motion } from "framer-motion";
import Section from "../section";
import PlaceholderMedia from "../placeholder-media";
import CodeSnippet from "../code-snippet";

// Example code snippet for barrier declaration
const barrierCode = `try (OMFBarrier barrier = new OMFBarrier()) {
  // Your critical operations here
  SysMLBlock block = SysMLFactory.createBlock("MyBlock");
  block.addProperty("myProperty", SysMLFactory.getIntType());
  block.setOwner(model.getDefaultPackage());
  
  // if any operation fails, everything is rolled back automatically
  barrier.commit(); // commit successful changes
} catch (Exception e) {
  // Error was caught and model is in consistent state
  log.error("Operation failed but model integrity is preserved");
}`;

interface CoreProps {
  index?: number;
}

export default function Core({ index = 1 }: CoreProps) {
  return (
    <div className="cover">
      <Section 
        id="core" 
        title="Core: Robustness and Simplicity"
        subtitle="Error management and state handling made easy"
        className="bg-[#f8fafc] dark:section-dark"
        index={index}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <PlaceholderMedia 
              type="gif" 
              height={300} 
              label="Error rollback demonstration (~10s)"
              className="shadow-soft rounded-lg"
            />
          </div>

          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Error Management Made Simple
              </h3>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-100 leading-relaxed">
                At OMF's core is the OMFBarrier, ensuring robust error management 
                with automatic rollback upon failure. Combined with FeatureRegisterer 
                and integrated listeners, managing your plugin state becomes straightforward.
              </p>
              
              <div className="bg-white dark:bg-[#050309]/80 rounded-lg p-6 shadow-soft border border-gray-100 dark:border-gray-700 mb-8">
                <h4 className="font-semibold text-lg mb-3 flex items-center dark:text-white">
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
                    className="mr-2 text-section-accent"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Key Benefits
                </h4>
                <ul className="space-y-2 ml-7 list-disc text-gray-700 dark:text-gray-300">
                  <li>Automatic rollback on failure</li>
                  <li>Simplified plugin state management</li>
                  <li>Built-in error handling</li>
                  <li>Consistent model state</li>
                </ul>
              </div>
              
              <CodeSnippet 
                code={barrierCode} 
                language="java" 
                title="OMFBarrier Example"
              />
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
} 