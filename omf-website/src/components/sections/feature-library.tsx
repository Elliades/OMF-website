/**
 * "Feature Library" section component
 * Showcases built-in features like Organizer, Stereotypes, FlowCreation
 */
"use client";

import { motion } from "framer-motion";
import Section from "../section";
import PlaceholderMedia from "../placeholder-media";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface FeatureLibraryProps {
  index?: number;
}

export default function FeatureLibrary({ index = 5 }: FeatureLibraryProps) {
  // Built-in features
  const features = [
    {
      title: "Organizer",
      description: "Efficiently organize model elements by applying custom sorting, filtering, and grouping rules.",
      benefits: [
        "Automatic element organization",
        "Custom sorting rules",
        "Smart element filtering",
        "Diagram cleanup"
      ],
      gifLabel: "Quick sorting and filtering elements"
    },
    {
      title: "Stereotypes",
      description: "Manage SysML stereotypes with a simplified API for applying, removing, and checking stereotypes.",
      benefits: [
        "Streamlined stereotype application",
        "Batch operations",
        "Profile management",
        "Stereotype inheritance handling"
      ],
      gifLabel: "Instant add/remove stereotype with immediate effect"
    },
    {
      title: "FlowCreation",
      description: "Automate the creation of flows between components with intelligent routing and connection.",
      benefits: [
        "Automatic flow creation",
        "Smart connector routing",
        "Port matching",
        "Flow validation"
      ],
      gifLabel: "Full flow automation demo"
    }
  ];

  return (
    <Section
      id="feature-library"
      title="Feature Library"
      subtitle="Built-in features for common tasks"
      className="section-alt-2 dark:section-dark"
      index={index}
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-lg text-gray-700 leading-relaxed">
          Access a comprehensive collection of built-in Features for organizing projects, 
          managing stereotypes, or automating flow creation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col h-full"
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700 mb-6">{feature.description}</p>
                <ul className="space-y-2 ml-5 list-disc text-gray-700">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <PlaceholderMedia 
                  type="gif" 
                  height={180} 
                  label={feature.gifLabel}
                  className="w-full"
                />
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="bg-primary/10 p-8 rounded-xl border border-primary/20">
          <h3 className="text-xl font-bold text-center mb-8">Complete Integration Demo</h3>
          <PlaceholderMedia 
            type="gif" 
            height={350} 
            label="Comprehensive Feature Library demo"
            className="w-full shadow-lg rounded-lg"
          />
        </div>
      </motion.div>
    </Section>
  );
} 