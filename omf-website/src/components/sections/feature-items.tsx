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
import CodeSnippetV2 from "../code-snippet-v2";
import { Code, Play } from "lucide-react";

interface FeatureItemsProps {
  index?: number;
}

export default function FeatureItems({ index = 3 }: FeatureItemsProps) {
  // State to track which view (code or gif) is active for each feature
  const [viewType, setViewType] = useState<Record<string, 'code' | 'gif'>>({
    uiaction: 'gif',
    liveaction: 'gif',
    option: 'gif',
    hook: 'gif',
    api: 'gif'
  });

  // Toggle view type for a specific feature
  const toggleViewType = (featureId: string) => {
    setViewType(prev => ({
      ...prev,
      [featureId]: prev[featureId] === 'gif' ? 'code' : 'gif'
    }));
  };

  // Code examples for each feature
  const codeExamples = {
    uiaction: `@BrowserAction // This action will be available in the browser
@DiagramAction // This action will be available in the diagram
@MenuAction // This action will be available in the menu
@DeactivateListener //Deactivates the listeners when triggered
//Action will be available under "DEMO.Demo Action" in the menu
@MDAction(actionName = "Demo Action", category = "DEMO") 
class DemoAction: AUIAction() {

    //Check when the action is available (displayed when right click on the element)
    override fun checkAvailability(selectedElements: List<Element>): Boolean {
        return isProjectOpened
    }

    //This method is called when the action is triggered
    //Actions is performed inside a session, and inside OMFBarrier
    override fun actionToPerform(selectedElements: List<Element>) {
        OMFLogger2.toNotification().success("Demo Action performed")
    }    
}`,
    
    liveaction: `//Will be evaluated when model change is detected
class DemoLiveAction: ALiveAction() {
    
    //Will be assessed for each event of the  session
    override fun eventMatches(evt: PropertyChangeEvent?): Boolean {
        return EventChecker()
            .isElementCreated() //event concern an element creation
            .isBlock() // event concern a block
            .test(evt) // evaluate block creation
    }


    //Triggered when the event is detected
    //This method is executed in a session, and inside OMFBarrier
    override fun process(event: PropertyChangeEvent): PropertyChangeEvent {
            val block =  event.source as Class
            block.setName("succeed");
        return event
    }

    //Allows to execute other LiveAction for this session batch
    override fun isBlocking(): Boolean {
        return false
    }

}`,
    
    option: `//Helper class to manage the options (create, get, set)
class OptionsDemoOptionHelper(feature: OMFFeature): EnvOptionsHelper(feature) {
    //Create the option "DEMO.is DEMO UI Action Available" with default value "false"
    val GROUP = "DEMO" 
    val IS_DEMO_UI_ACTION_AVAILABLE = "is DEMO UI Action Available" 

    val isDemoUIActionAvailable : Boolean //ACCESSOR
        get() = getPropertyByName(IS_DEMO_UI_ACTION_AVAILABLE).value as Boolean

    val allOptions:List<Option> //LIST OF ALL OPTIONS
        get(){
            val isUIActionAvailable = OptionImpl(
                BooleanProperty(IS_DEMO_UI_ACTION_AVAILABLE, false),
                GROUP,
                feature.plugin.environmentOptionsGroup.get(),
                OptionKind.Environment
            )
            return listOf(isUIActionAvailable)
        }
}`,
    
    hook: `class FeatureExample : SimpleFeature("feature example") {
    
    //Register all hooks to the feature
    override fun initLifeCycleHooks(): List<Hook> {
        val onMagicDrawStartHook = object : AOnMagicDrawStartHook() {
            //This method is called when MagicDraw is started
            override fun onMagicDrawStart() {
                if (!OMFUtils.isDevMode()) return
                OMFLogger2.toNotification().success("FeatureExample: onMagicDrawStart")
            }
        }
        return listOf<Hook>(onMagicDrawStartHook)
    }
}`,
    
    api: `class FeatureExample : SimpleFeature("feature example") {
    
    //Register mapping between the URL and the method to call
    private fun registerRouting() {
        OMFApiServer.getInstance().addRoute("openProject", ExtHyperTextServerRouting.openProject())
        OMFApiServer.getInstance().addRoute("openTWCProject", ExtHyperTextServerRouting.openTWCProject())
        OMFApiServer.getInstance().addRoute("refmodel", ExtHyperTextServerRouting.refModel())
        OMFApiServer.getInstance().addRoute("openSpecification", ExtHyperTextServerRouting.openSpecification())
    }

    //On feature registration, start the server and register the routing
    override fun onRegistering() {
        OMFApiServer.getInstance(getPlugin()).startServer(8999)
        registerRouting()
    }

    //On feature unregistration, stop the server
    override fun onUnregistering() {
        OMFApiServer.getInstance(getPlugin()).stopServer()
    }
    
}
`
  };

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
      subtitle="Ready-to-use components for your plugins"
      className="section-alt-2 dark:section-dark"
      index={index}
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          OMF provides ready-to-use Feature Items. Easily integrate UI actions,
          live actions, configurable options, custom hooks, and standardized APIs.
        </p>
      </div>

      <div className="mb-16">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8 min-w-full">
            {featureItems.map(item => (
              <TabsTrigger 
                key={item.id} 
                value={item.id} 
                className={`text-sm feature-item-button ${activeTab === item.id ? 'selected' : ''}`}
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {featureItems.map(item => (
            <TabsContent key={item.id} value={item.id} className="mt-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Card className="border-t-4 border-primary shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-semibold">{item.title}</CardTitle>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm mb-3 uppercase">Benefits</h4>
                    <ul className="space-y-2 ml-5 list-disc">
                      {item.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <motion.div
                  key={`${item.id}-${viewType[item.id]}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Toggle button for switching between code and GIF - Now at bottom right */}
                  <div className="absolute bottom-3 right-3 z-10 flex space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-md">
                    <button
                      onClick={() => toggleViewType(item.id)}
                      className={`p-1.5 rounded-full transition-colors ${
                        viewType[item.id] === 'gif' 
                          ? 'bg-primary text-white' 
                          : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title="Show demonstration"
                      aria-label="Show demonstration"
                    >
                      <Play size={18} />
                    </button>
                    <button
                      onClick={() => toggleViewType(item.id)}
                      className={`p-1.5 rounded-full transition-colors ${
                        viewType[item.id] === 'code' 
                          ? 'bg-primary text-white' 
                          : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title="Show code example"
                      aria-label="Show code example"
                    >
                      <Code size={18} />
                    </button>
                  </div>

                  {/* Content based on view type */}
                  {viewType[item.id] === 'gif' ? (
                    <PlaceholderMedia
                      type="gif"
                      height={300}
                      label={item.gifLabel}
                    />
                  ) : (
                    <CodeSnippetV2
                      code={codeExamples[item.id as keyof typeof codeExamples]}
                      language="kotlin"
                      title={`${item.title} Implementation`}
                    />
                  )}
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