import React, { useState, createContext, useContext } from "react";
import "./Tabs.css";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
  defaultTab?: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultTab,
  children,
  className = "",
}) => {
  const childArray = React.Children.toArray(children);
  const firstTabId =
    childArray[0] && (childArray[0] as React.ReactElement).props.id;
  const [activeTab, setActiveTab] = useState(defaultTab || firstTabId);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`tabs-container ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabList: React.FC<TabListProps> = ({
  children,
  className = "",
}) => {
  return <div className={`tabs-list ${className}`}>{children}</div>;
};

interface TabProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({ id, children, className = "" }) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tab must be used within a Tabs component");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;

  return (
    <button
      className={`tab ${isActive ? "active" : ""} ${className}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

interface TabPanelProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  id,
  children,
  className = "",
}) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabPanel must be used within a Tabs component");
  }

  const { activeTab } = context;

  if (activeTab !== id) return null;

  return <div className={`tab-panel ${className}`}>{children}</div>;
};
