/**
 * "What's OMF?" section component
 * First section of the OMF Vitrine website introducing the framework
 */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Section from "../section";
import PlaceholderMedia from "../placeholder-media";
import { Card, CardContent } from "../ui/card";
import { Copy, Check, Github } from "lucide-react";

// Custom background style for the first section
const bgStyle = {
  // backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(220,768,395)'%3E%3Cstop offset='0' stop-color='%23A22756'/%3E%3Cstop offset='1' stop-color='%23FFBC33'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E\")",
  backgroundImage: "url('/svg/background/purpleToYellow.svg')",
  backgroundColor: "#A22756",
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
};

// Custom title styles
const titleStyle = {
  textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
  color: "white"
};

interface WhatsOMFProps {
  index?: number;
}

export default function WhatsOMF({ index = 0 }: WhatsOMFProps) {
  const repoUrl = "https://github.com/OMF-Open-MBSE-Framework/OMF.git";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(repoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section 
      id="whats-omf" 
      title="What's OMF?" 
      style={bgStyle} 
      className="text-white"
      titleStyles={titleStyle}
      index={index}
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white">
              Build Smarter, Not Harder
            </h3>
            <p className="text-lg mb-6 text-white/90 leading-relaxed">
              OMF is an open-source framework designed to simplify the robust and 
              efficient development of MagicDraw plugins. Built by developers for 
              developers, OMF streamlines complex automations reliably and elegantly.
            </p>
            
            {/* GitHub Repository Card */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20 flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <Github size={20} className="text-white flex-shrink-0" />
                <a 
                  href={repoUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white font-mono text-sm truncate hover:underline transition-all"
                >
                  {repoUrl}
                </a>
              </div>
              <div className="relative ml-2">
                <button 
                  onClick={copyToClipboard}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex-shrink-0"
                  aria-label="Copy repository URL"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-white" />}
                </button>
                {copied && (
                  <div className="absolute -top-8 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    Copied to clipboard!
                  </div>
                )}
              </div>
            </motion.div>
            
            <Card className="bg-white/10 backdrop-blur-sm shadow-soft mt-6 border border-white/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-2 flex items-center text-white">
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
                    className="mr-2 text-[#FFBC33]"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Why OMF?
                </h4>
                <ul className="space-y-2 ml-7 list-disc text-white/90">
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
            {/* OMF Logo */}
            <div className="mb-8 shadow-soft rounded-lg overflow-hidden bg-white/10 p-4 w-4/5">
              <Image 
                src="/logo/OMF-LOGO.png"
                alt="OMF Logo" 
                width={400}
                height={200}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
          
          {/* Placeholder for demo GIF */}
          <PlaceholderMedia 
            type="gif" 
            height={250} 
            label="Feature creation and activation demo (~8s)"
            className="shadow-soft rounded-lg"
          />
        </div>
      </div>
    </Section>
  );
} 