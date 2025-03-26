/**
 * "Library" section component
 * Showcases OMF's library features like SysML Factory, Helpers, and LayoutManager
 */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Section from "../section";
import PlaceholderMedia from "../placeholder-media";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function Library() {
  const [activeLibrary, setActiveLibrary] = useState("sysml-factory");
  
  // Library information
  const libraries = [
    {
      id: "sysml-factory",
      title: "SysML Factory",
      description: "Create SysML elements with minimal code.",
      features: [
        "Simplified block creation API",
        "Port and connector generation",
        "Requirements creation helpers",
        "Activity diagram elements"
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
      description: "Utilities for working with existing SysML models.",
      features: [
        "Element search and filtering",
        "Relationship management",
        "Model traversal utilities",
        "Type-safe element operations"
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
      description: "Automatically arrange diagram elements for better visualization.",
      features: [
        "Hierarchical layout algorithms",
        "Auto-spacing and alignment",
        "Connector routing optimization",
        "Custom layout persistence"
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
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          Accelerate your development with a powerful library: effortlessly create SysML 
          elements, manipulate them efficiently, and automatically manage visual layouts.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {libraries.map(library => (
          <Button
            key={library.id}
            variant={activeLibrary === library.id ? "default" : "outline"}
            onClick={() => setActiveLibrary(library.id)}
            className="px-6"
          >
            {library.title}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          key={activeLibraryData.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="order-2 md:order-1"
        >
          <Card className="mb-8 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">
                {activeLibraryData.title}
              </h3>
              <p className="mb-4 text-gray-700">
                {activeLibraryData.description}
              </p>
              
              <Accordion type="single" collapsible className="mb-4">
                <AccordionItem value="features">
                  <AccordionTrigger className="text-sm font-medium">
                    Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 ml-5 list-disc text-gray-700">
                      {activeLibraryData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="code">
                  <AccordionTrigger className="text-sm font-medium">
                    Code Example
                  </AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-gray-50 p-4 rounded-md text-sm font-mono overflow-x-auto">
                      {activeLibraryData.codeExample}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <PlaceholderMedia 
            type="gif" 
            height={280} 
            label={`${activeLibraryData.title} demo`}
          />
        </motion.div>

        <div className="order-1 md:order-2">
          <PlaceholderMedia 
            type="gif" 
            height={450} 
            label="SysML block creation and layout adjustments"
            className="shadow-lg rounded-lg"
          />
        </div>
      </div>
    </Section>
  );
} 