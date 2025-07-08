import React, { useState } from 'react';
import { BookOpen, Utensils, Music, Download, Share2 } from 'lucide-react';
import { ShareModal } from '../components/ShareModal';
import { culturalTabs } from '../data';

type CulturalTabKey = keyof typeof culturalTabs;

export const ArchivePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CulturalTabKey>('recipes');
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: '',
    content: ''
  });

  const handleDownload = (item: any, type: string) => {
    const content = `${item.name}\n\nType: ${type}\n\nContent: ${item.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = (item: any) => {
    setShareModal({
      isOpen: true,
      title: item.name,
      content: item.content
    });
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-green-600" />
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Cultural Archive
          </h1>
          <p className="text-xl text-green-700">
            Recipes, songs, and stories passed down through generations
          </p>
        </div>
      </section>

      {/* Archive Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex border-b">
              {Object.keys(culturalTabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as CulturalTabKey)}
                  className={`flex-1 px-6 py-4 font-semibold capitalize transition-colors ${
                    activeTab === tab 
                      ? 'bg-green-100 text-green-800 border-b-2 border-green-500' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {tab === 'recipes' && <Utensils className="w-5 h-5 inline mr-2" />}
                  {tab === 'songs' && <Music className="w-5 h-5 inline mr-2" />}
                  {tab === 'stories' && <BookOpen className="w-5 h-5 inline mr-2" />}
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8">
              <div className="space-y-4">
                {culturalTabs[activeTab].map((item, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-6 hover:bg-green-100 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900 text-lg mb-2">{item.name}</h4>
                        <p className="text-green-600 text-sm mb-3">
                          {activeTab === 'recipes' && 'difficulty' in item && 'time' in item && `${item.difficulty} • ${item.time}`}
                          {activeTab === 'songs' && 'type' in item && 'duration' in item && `${item.type} • ${item.duration}`}
                          {activeTab === 'stories' && 'type' in item && 'length' in item && `${item.type} • ${item.length}`}
                        </p>
                        <p className="text-green-700">{item.content}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button 
                          onClick={() => handleDownload(item, activeTab)}
                          className="p-2 bg-green-200 hover:bg-green-300 rounded-full transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-green-700" />
                        </button>
                        <button 
                          onClick={() => handleShare(item)}
                          className="p-2 bg-amber-200 hover:bg-amber-300 rounded-full transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4 text-amber-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-6">
            Contribute to Our Archive
          </h2>
          <p className="text-xl text-green-700 mb-8">
            Help us preserve our heritage by sharing your family recipes, songs, and stories.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Submit Content
          </button>
        </div>
      </section>

      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ ...shareModal, isOpen: false })}
        title={shareModal.title}
        content={shareModal.content}
      />
    </div>
  );
};