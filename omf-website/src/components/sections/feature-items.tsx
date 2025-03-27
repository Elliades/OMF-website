/**
 * Feature Items section component
 * Displays the various feature items available in OMF
 */
"use client";

import Section from "@/components/section";
import { motion } from "framer-motion";
import PlaceholderMedia from "@/components/placeholder-media";

interface FeatureItemsProps {
  index: number;
}

export default function FeatureItems({ index }: FeatureItemsProps) {
  return (
    <Section
      id="feature-items"
      title="Feature Items"
      subtitle="Ready-to-use components for building your MagicDraw plugins"
      index={index}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureItemCard
          title="UIAction"
          description="Add buttons and menu items to the MagicDraw interface. Define actions that users can trigger directly from the UI."
          iconEmoji="🖱️"
        >
          <PlaceholderMedia
            type="gif"
            label="Button click in MagicDraw UI"
            height={220}
          />
        </FeatureItemCard>

        <FeatureItemCard
          title="LiveAction"
          description="Create reactive behaviors that respond to model changes in real-time. Perfect for validation and automation."
          iconEmoji="⚡"
        >
          <PlaceholderMedia
            type="gif"
            label="Immediate response to model modifications"
            height={220}
          />
        </FeatureItemCard>

        <FeatureItemCard
          title="Option"
          description="Create configurable settings for your plugin that users can adjust according to their needs."
          iconEmoji="⚙️"
        >
          <div className="h-[220px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-4xl">⚙️</span>
          </div>
        </FeatureItemCard>

        <FeatureItemCard
          title="Hook"
          description="Define custom behavior triggered by specific events in MagicDraw. Intercept and extend functionality elegantly."
          iconEmoji="🪝"
        >
          <div className="h-[220px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-4xl">🪝</span>
          </div>
        </FeatureItemCard>
      </div>
    </Section>
  );
}

interface FeatureItemCardProps {
  title: string;
  description: string;
  iconEmoji: string;
  children: React.ReactNode;
}

function FeatureItemCard({ title, description, iconEmoji, children }: FeatureItemCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">{iconEmoji}</span>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        {children}
      </div>
    </motion.div>
  );
} 