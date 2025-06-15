import React from "react";

type FilterTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { id: 'all', label: 'All Posts' },
  { id: 'discussion', label: 'Discussions' },
  { id: 'prayer', label: 'Prayer Requests' },
  { id: 'project', label: 'Project Updates' },
  { id: 'announcement', label: 'Announcements' }
];

export default function FilterTabs({ activeTab, setActiveTab }: FilterTabsProps) {
  return (
    <section className="bg-white sticky top-[61px] md:top-[82px] z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto py-2 space-x-2 md:space-x-4 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-royal-DEFAULT text-white'
                  : 'bg-white text-royal-DEFAULT border border-royal-DEFAULT hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}