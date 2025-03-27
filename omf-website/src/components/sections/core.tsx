/**
 * "Core: Robustness and Simplicity" section component
 * Showcases the OMF Barrier and core features
 */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
  return (
    <Section 
      id="core" 
      title="Core: Robustness and Simplicity" 
      subtitle="Error management with automatic rollback, feature registration, and integrated listeners"
      index={index}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="flex flex-col space-y-6">
          <Feature
            title="OMFBarrier"
            description="Ensures robust error management with automatic rollback upon failure. Any error during execution will trigger a rollback to the original state."
          />
          <Feature
            title="FeatureRegisterer"
            description="Register your features easily and manage their lifecycle. The registerer takes care of loading, initialization, and shutdown processes."
          />
          <Feature
            title="Integrated Listeners"
            description="Built-in event listeners that simplify the management of your plugin's state and interactions with MagicDraw."
          />
          <PlaceholderMedia 
            type="gif" 
            label="Error rollback demonstration (~10s)" 
            className="hidden md:block"
          />
        </div>
        <div className="flex flex-col space-y-6">
          <CodeSnippet
            language="java"
            title="OMFBarrier Example"
            code={`// Example of OMFBarrier usage
try (OMFBarrier barrier = OMFBarrier.newBarrier()) {
    // Any operation within this barrier will be rolled back 
    // if an error occurs
    SysMLBlock block = factory.createBlock("MyBlock");
    block.addProperty("property1", "String");
    
    // If this throws an exception, all operations are rolled back
    someOperationThatMightFail();
    
    // Once the barrier is closed, the operations are committed
    barrier.commit();
}`}
            highlightLines={[1, 8, 12]}
          />
          <PlaceholderMedia 
            type="gif" 
            label="Error rollback demonstration (~10s)" 
            className="md:hidden mt-4"
          />
        </div>
      </div>
    </Section>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col space-y-2"
    >
      <h3 className="text-xl font-bold dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

// Note: This function is not being used in the current implementation
function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <span className="text-green-500 mr-2 mt-1 flex-shrink-0">
        <CheckCircle2 className="h-5 w-5" />
      </span>
      <span className="text-gray-700 dark:text-gray-300">{children}</span>
    </li>
  );
} 