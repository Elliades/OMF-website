/**
 * "Feature-Oriented Architecture" section component
 * Showcases OMF's modular architecture approach
 */
"use client";

import { motion } from "framer-motion";
import Section from "../section";
import PlaceholderMedia from "../placeholder-media";
import { Card, CardContent } from "../ui/card";

export default function Architecture() {
  // Feature information
  const features = [
    {
      title: "Modularity",
      description: "Each Feature is self-contained and can be enabled or disabled independently.",
      icon: (
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
          className="text-indigo-500"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
    },
    {
      title: "Scalability",
      description: "Add new Features without modifying existing ones, promoting clean extension.",
      icon: (
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
          className="text-green-500"
        >
          <path d="M21 3v6h-6" />
          <path d="m21 3-8 8" />
          <path d="M3 21v-6h6" />
          <path d="m3 21 8-8" />
        </svg>
      ),
    },
    {
      title: "Maintainability",
      description: "Isolated Features are easier to understand, test, and maintain.",
      icon: (
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
          className="text-amber-500"
        >
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M12 2v2" />
          <path d="M12 22v-2" />
          <path d="m17 20.66-1-1.73" />
          <path d="M11 10.27 7 3.34" />
          <path d="m20.66 17-1.73-1" />
          <path d="m3.34 7 1.73 1" />
          <path d="M14 12h8" />
          <path d="M2 12h2" />
          <path d="m20.66 7-1.73 1" />
          <path d="m3.34 17 1.73-1" />
          <path d="m17 3.34-1 1.73" />
          <path d="m11 13.73-4 6.93" />
        </svg>
      ),
    },
    {
      title: "Reusability",
      description: "Features can be shared and reused across different plugins.",
      icon: (
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
          className="text-blue-500"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
      ),
    },
  ];

  return (
    <Section 
      id="architecture" 
      title="Feature-Oriented Architecture"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-lg text-gray-700 leading-relaxed">
          OMF structures your plugins into modular, autonomous Features, 
          enhancing scalability and simplifying maintenance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Placeholder for architecture diagram */}
            <PlaceholderMedia 
              type="image" 
              height={350} 
              label="Feature-oriented architecture diagram"
              className="mb-8" 
            />
          </motion.div>
          
          {/* Placeholder for demo GIF */}
          <PlaceholderMedia 
            type="gif" 
            height={250} 
            label="Enabling/disabling Features demo (~12s)"
          />
        </div>

        <div>
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-l-4" 
                  style={{ borderLeftColor: feature.icon.props.className.split(" ")[0] }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="mr-4 p-2 rounded-full bg-gray-50">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
} 