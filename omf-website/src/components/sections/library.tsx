/**
 * Library section component
 * Displays the SysML Factory, SysML Helpers, and LayoutManager libraries
 */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Section from "@/components/section";
import PlaceholderMedia from "@/components/placeholder-media";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import CodeSnippet from "../code-snippet";

interface LibraryProps {
  index: number;
}

export default function Library({ index }: LibraryProps) {
  const [activeLibrary, setActiveLibrary] = useState("sysml-factory");
  
  // Library information
  const libraries = [
    {
      id: "sysml-factory",
      title: "SysML Factory",
      description: "Create SysML elements with ease. The factory provides a fluent API for creating and configuring model elements.",
      features: [
        "Create blocks, requirements, and more",
        "Fluent API for chaining operations",
        "Automatic error handling",
        "Type-safe interfaces"
      ],
      codeExample: 
`// Create a block with ports in one line
Block myBlock = SysMLFactory.createBlock("MyBlock")
    .withPorts("in", "out")
    .withStereotype("System");

// Create a requirement with trace
Requirement req = SysMLFactory.createRequirement("REQ-001")
    .withText("The system shall...")
    .withTrace(myBlock);`
    },
    {
      id: "sysml-helpers",
      title: "SysML Helpers",
      description: "Efficiently manipulate SysML elements. Helpers provide utility functions for common operations.",
      features: [
        "Find elements by criteria",
        "Traverse model hierarchies",
        "Transform model elements",
        "Handle stereotypes efficiently"
      ],
      codeExample: 
`// Find all blocks with a specific stereotype
List<Block> systemBlocks = SysMLHelpers
    .findElementsByStereotype(model, "System");

// Get all connections between blocks
List<Connector> connections = SysMLHelpers
    .getConnectorsBetween(blockA, blockB);

// Find path between elements
List<Element> path = SysMLHelpers
    .findPath(sourceElement, targetElement);`
    },
    {
      id: "layout-manager",
      title: "Layout Manager",
      description: "Automatically manage visual layouts. Ensure diagrams look professional with minimal effort.",
      features: [
        "Auto-arrange diagram elements",
        "Grid alignment support",
        "Aesthetic spacing algorithms",
        "Preserve manual adjustments"
      ],
      codeExample: 
`// Apply automatic layout to a diagram
LayoutManager.applyLayout(diagram, LayoutType.HIERARCHICAL);

// Custom layout with specific settings
LayoutManager.applyLayout(diagram, builder -> 
    builder.withSpacing(50)
           .withDirection(Direction.TOP_TO_BOTTOM)
           .withAlignPorts(true)
);

// Auto-arrange specific elements
LayoutManager.arrangeElements(diagram, selectedElements);`
    }
  ];

  const activeLibraryData = libraries.find(lib => lib.id === activeLibrary)!;

  return (
    <Section
      id="library"
      title="Library"
      subtitle="Powerful libraries to accelerate your MagicDraw plugin development"
      index={index}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <LibraryCard
          title="SysML Factory"
          description="Create SysML elements with ease. The factory provides a fluent API for creating and configuring model elements."
          features={[
            "Create blocks, requirements, and more",
            "Fluent API for chaining operations",
            "Automatic error handling",
            "Type-safe interfaces"
          ]}
        />
        
        <LibraryCard
          title="SysML Helpers"
          description="Efficiently manipulate SysML elements. Helpers provide utility functions for common operations."
          features={[
            "Find elements by criteria",
            "Traverse model hierarchies",
            "Transform model elements",
            "Handle stereotypes efficiently"
          ]}
        />
        
        <LibraryCard
          title="Layout Manager"
          description="Automatically manage visual layouts. Ensure diagrams look professional with minimal effort."
          features={[
            "Auto-arrange diagram elements",
            "Grid alignment support",
            "Aesthetic spacing algorithms",
            "Preserve manual adjustments"
          ]}
        />
      </div>
      
      <div className="mt-16">
        <PlaceholderMedia
          type="gif"
          label="Dynamic example showing automated SysML block creation"
          height={400}
          className="mx-auto max-w-3xl"
        />
      </div>
    </Section>
  );
}

interface LibraryCardProps {
  title: string;
  description: string;
  features: string[];
}

function LibraryCard({ title, description, features }: LibraryCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 uppercase mb-2 mt-auto">Features</h4>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
} 