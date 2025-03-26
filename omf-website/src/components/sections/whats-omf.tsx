/**
 * "What's OMF?" section component
 * First section of the OMF Vitrine website introducing the framework
 */
"use client";

import { motion } from "framer-motion";
import Section from "../section";
import PlaceholderMedia from "../placeholder-media";
import { Card, CardContent } from "../ui/card";

export default function WhatsOMF() {
  return (
    <Section id="whats-omf" title="What's OMF?" className="bg-gradient-to-b from-section-light to-section-blue">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6 gradient-text">
              Build Smarter, Not Harder
            </h3>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-200 leading-relaxed">
              OMF is an open-source framework designed to simplify the robust and 
              efficient development of MagicDraw plugins. Built by developers for 
              developers, OMF streamlines complex automations reliably and elegantly.
            </p>
            <Card className="bg-white/50 dark:bg-section-dark/50 backdrop-blur-sm shadow-soft mt-6 border dark:border-gray-700">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-2 flex items-center">
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
                  Why OMF?
                </h4>
                <ul className="space-y-2 ml-7 list-disc text-gray-700 dark:text-gray-300">
                  <li>Simplifies MagicDraw plugin development</li>
                  <li>Ensures robustness with automatic error handling</li>
                  <li>Promotes modular, maintainable plugin architecture</li>
                  <li>Accelerates development with ready-to-use components</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {/* Placeholder for OMF logo */}
            <PlaceholderMedia 
              type="image" 
              width="80%" 
              height={200} 
              label="OMF Logo"
              className="mb-8 shadow-soft" 
            />
          </motion.div>
          
          {/* Placeholder for demo GIF */}
          <PlaceholderMedia 
            type="gif" 
            height={250} 
            label="Feature creation and activation demo (~8s)"
            className="shadow-soft"
          />
        </div>
      </div>
    </Section>
  );
} 