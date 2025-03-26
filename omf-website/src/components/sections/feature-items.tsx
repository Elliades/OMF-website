/**
 * "Feature Items" section component
 * Showcases different feature items like UIAction, LiveAction, etc.
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "../section";
import PlaceholderMedia from "../placeholder-media";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function FeatureItems() {
  // Feature item details
  const featureItems = [
    {
      id: "uiaction",
      title: "UIAction",
      description: "Add custom actions to MagicDraw's interface with full control over placement, icons, and behavior.",
      benefits: [
        "Seamless integration with MagicDraw UI",
        "Context-aware actions",
        "Customizable appearance",
        "Keyboard shortcuts support"
      ],
      gifLabel: "Button click in MagicDraw UI"
    },
    {
      id: "liveaction",
      title: "LiveAction",
      description: "Create actions that automatically respond to model changes without user intervention.",
      benefits: [
        "Real-time model monitoring",
        "Automatic validation",
        "Background processing",
        "Event-driven architecture"
      ],
      gifLabel: "Immediate response to model modifications"
    },
    {
      id: "option",
      title: "Option",
      description: "Add configurable settings to your plugin, allowing users to customize behavior.",
      benefits: [
        "User-configurable settings",
        "Persistent configurations",
        "Type-safe options",
        "Default values support"
      ],
      gifLabel: "Real-time configuration change"
    },
    {
      id: "hook",
      title: "Hook",
      description: "Extend functionality by registering custom behavior at specific points in the workflow.",
      benefits: [
        "Extensible architecture",
        "Decoupled components",
        "Event-based interaction",
        "Custom behavior injection"
      ],
      gifLabel: "Adding custom behaviors triggered by events"
    },
    {
      id: "api",
      title: "API",
      description: "Expose plugin functionality through well-defined APIs for integration with other plugins.",
      benefits: [
        "Inter-plugin communication",
        "Stable interfaces",
        "Versioned APIs",
        "Encapsulated implementation"
      ],
      gifLabel: "API integration demonstration"
    }
  ];
  
  const [activeTab, setActiveTab] = useState(featureItems[0].id);

  return (
    <Section 
      id="feature-items" 
      title="Feature Items"
      className="bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          OMF provides ready-to-use Feature Items. Easily integrate UI actions, 
          live actions, configurable options, custom hooks, and standardized APIs.
        </p>
      </div>

      <div className="mb-16">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
            {featureItems.map(item => (
              <TabsTrigger key={item.id} value={item.id} className="text-sm">
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {featureItems.map(item => (
            <TabsContent key={item.id} value={item.id} className="mt-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Card className="border-t-4 border-primary shadow-sm">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-base text-gray-700">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm mb-3 text-gray-500 uppercase">Benefits</h4>
                    <ul className="space-y-2 ml-5 list-disc text-gray-700">
                      {item.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <PlaceholderMedia 
                    type="gif" 
                    height={300} 
                    label={item.gifLabel}
                  />
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {featureItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`${activeTab === item.id ? 'opacity-100' : 'opacity-60'}`}
          >
            <PlaceholderMedia 
              type="gif" 
              height={120} 
              label={`Mini ${item.title} demo`}
              className="cursor-pointer"
              onClick={() => setActiveTab(item.id)}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
} 