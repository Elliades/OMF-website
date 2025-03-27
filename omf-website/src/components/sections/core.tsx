/**
 * "Core: Robustness and Simplicity" section component
 * Showcases the OMF Barrier and core features
 */
"use client";

import { motion } from "framer-motion";
import Section from "@/components/section";
import PlaceholderMedia from "@/components/placeholder-media";
import CodeSnippet from "@/components/code-snippet";
import { CheckCircle2 } from "lucide-react";

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
  index: number;
}

export default function Core({ index }: CoreProps) {
  const codeExample = `// Define a barrier to handle errors and ensure rollback
public void createBlock(String name) {
    OMFBarrier.execute(() -> {
        // Create a block element
        Block block = SysMLFactory.createBlock(name);
        
        // Add properties - all changes are tracked
        block.addProperty("status", "active");
        block.addProperty("version", "1.0");
        
        // If any error occurs, all changes are rolled back
        // automatically by the barrier
    });
}`;

  return (
    <Section
      id="core"
      title="Core: Robustness and Simplicity"
      subtitle="Our framework ensures reliability through automatic error handling and rollback mechanisms"
      index={index}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-white/80 dark:bg-gray-800/50 rounded-lg p-6 shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700 h-full">
            <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              Key Features
            </h3>
            <ul className="space-y-4">
              <Feature>
                <strong>OMFBarrier</strong>: Automatic error handling and
                rollback mechanism ensures data integrity
              </Feature>
              <Feature>
                <strong>FeatureRegisterer</strong>: Simplified registration and
                activation of features
              </Feature>
              <Feature>
                <strong>Event Listeners</strong>: Integrated system for reacting
                to model changes
              </Feature>
              <Feature>
                <strong>Simplified API</strong>: Intuitive interfaces reduce
                learning curve and development time
              </Feature>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <PlaceholderMedia
            type="gif"
            label="Error rollback demonstration (~10s)"
            className="mb-4"
            height={220}
          />
          <CodeSnippet
            code={codeExample}
            language="java"
            title="OMFBarrier Example"
          />
        </motion.div>
      </div>
    </Section>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <span className="text-green-500 mr-2 mt-1 flex-shrink-0">
        <CheckCircle2 className="h-5 w-5" />
      </span>
      <span className="text-gray-700 dark:text-gray-300">{children}</span>
    </li>
  );
} 