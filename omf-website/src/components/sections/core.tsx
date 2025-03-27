/**
 * Core section component
 * Displays information about OMF's core features: robustness and simplicity
 */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Section from "@/components/section";
import PlaceholderMedia from "@/components/placeholder-media";
import CodeSnippet from "@/components/code-snippet";

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