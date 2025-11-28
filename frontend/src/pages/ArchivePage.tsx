import React, { useState, useEffect } from 'react';
import { Download, Share2, Music, Utensils, BookOpen, ArrowRight } from 'lucide-react';
import { ShareModal } from '../components/ShareModal';
import { culturalTabs } from '../data';
import { ScrollRevealSection } from '../components/ScrollReveal';

type CulturalTabKey = keyof typeof culturalTabs;

export const ArchivePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CulturalTabKey>('recipes');
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
    ingredients?: string[];
    prep?: string[];
  }>({
    isOpen: false,
    title: '',
    content: '',
    ingredients: [],
    prep: []
  });
  // Add expanded state for each recipe card
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = (item: any, type: string) => {
    const content = `${item.name} \n\nType: ${type} \n\nContent: ${item.content} `;
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
      content: item.content,
      ingredients: Array.isArray(item.ingredients) ? item.ingredients : item.ingredients ? [item.ingredients] : [],
      prep: Array.isArray(item.prep) ? item.prep : item.prep ? [item.prep] : []
    });
  };

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="overflow-x-hidden">
      {/* Parallax Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
          style={{
            backgroundImage: "url('/src/assets/cultur.webp')",
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/90 via-green-900/70 to-amber-50" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-6 animate-float-slow">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm text-sm font-bold tracking-widest uppercase mb-4">
              Preserving Our Legacy
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl font-serif tracking-tight">
            Cultural <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Archive</span>
          </h1>
          <p className="text-xl md:text-3xl text-green-100 drop-shadow-lg max-w-3xl mx-auto font-light leading-relaxed">
            A living library of recipes, songs, and stories passed down through generations.
          </p>
        </div>
      </section>

      {/* Archive Content */}
      <section className="py-24 px-6 bg-amber-50 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollRevealSection>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">
              <div className="flex flex-col md:flex-row border-b border-green-100">
                {Object.keys(culturalTabs).filter(tab => tab !== 'stories').map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as CulturalTabKey)}
                    className={`flex-1 px-6 py-6 font-bold capitalize transition-all duration-300 text-lg relative overflow-hidden group ${activeTab === tab
                      ? 'text-amber-600 bg-amber-50/50'
                      : 'text-green-600 hover:bg-green-50 hover:text-green-800'
                      }`}
                  >
                    <div className={`absolute bottom-0 left-0 h-1 bg-amber-500 transition-all duration-300 ${activeTab === tab ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`} />
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      {tab === 'recipes' && <Utensils className={`w-5 h-5 ${activeTab === tab ? 'text-amber-500' : ''}`} />}
                      {tab === 'songs' && <Music className={`w-5 h-5 ${activeTab === tab ? 'text-amber-500' : ''}`} />}
                      {tab}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-8 md:p-16 bg-gradient-to-br from-white to-amber-50/30 min-h-[600px]">
                <div className="grid gap-8">
                  {culturalTabs[activeTab].map((item, index) => (
                    <ScrollRevealSection key={index}>
                      <div className="bg-white rounded-2xl p-8 md:p-10 hover:shadow-xl transition-all duration-300 border border-green-50 group hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>

                        <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
                          <div className="flex-1 w-full">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
                                {activeTab === 'recipes' ? 'Culinary' : 'Melody'}
                              </span>
                              <p className="text-green-400 text-sm font-semibold uppercase tracking-wider flex items-center gap-1">
                                {activeTab === 'recipes' && 'difficulty' in item && 'time' in item && (
                                  <>
                                    <span>•</span> {item.difficulty} <span>•</span> {item.time}
                                  </>
                                )}
                                {activeTab === 'songs' && 'type' in item && 'duration' in item && (
                                  <>
                                    <span>•</span> {item.type} <span>•</span> {item.duration}
                                  </>
                                )}
                              </p>
                            </div>

                            <h4 className="font-bold text-green-900 text-3xl mb-4 group-hover:text-amber-600 transition-colors font-serif">{item.name}</h4>

                            <div className="text-green-700 leading-relaxed text-lg mb-6">
                              {activeTab === 'recipes' && !expandedIndexes.includes(index)
                                ? `${item.content.substring(0, 150)}...`
                                : item.content}
                            </div>

                            {activeTab === 'recipes' && (
                              <div className="mt-4">
                                {!expandedIndexes.includes(index) ? (
                                  <button
                                    className="text-amber-600 font-bold hover:text-amber-700 transition-colors text-sm flex items-center gap-2 group/btn"
                                    onClick={() => toggleExpand(index)}
                                  >
                                    Read Full Recipe
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                  </button>
                                ) : (
                                  <div className="mt-8 space-y-8 bg-green-50/50 p-8 rounded-2xl border border-green-100">
                                    {Array.isArray((item as any).ingredients) && (item as any).ingredients.length > 0 && (
                                      <div>
                                        <span className="font-bold text-green-900 block mb-4 text-lg font-serif border-b border-green-200 pb-2">Ingredients</span>
                                        <ul className="grid md:grid-cols-2 gap-3 text-green-800">
                                          {(item as any).ingredients.map((ing: string, idx: number) => (
                                            <li key={idx} className="flex items-center gap-3">
                                              <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                                              {ing}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {Array.isArray((item as any).prep) && (item as any).prep.length > 0 && (
                                      <div>
                                        <span className="font-bold text-green-900 block mb-4 text-lg font-serif border-b border-green-200 pb-2">Preparation</span>
                                        <ol className="space-y-4 text-green-800">
                                          {(item as any).prep.map((step: string, idx: number) => (
                                            <li key={idx} className="flex gap-4">
                                              <span className="font-bold text-amber-600 bg-amber-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                                              <span className="pt-1">{step}</span>
                                            </li>
                                          ))}
                                        </ol>
                                      </div>
                                    )}
                                    <button
                                      className="text-amber-600 font-bold hover:text-amber-700 transition-colors text-sm mt-4 flex items-center gap-2"
                                      onClick={() => toggleExpand(index)}
                                    >
                                      Show Less
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {activeTab === 'songs' && 'link' in item && (
                              <div className="mt-6">
                                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                                  <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${(item as any).link.split('v=')[1]}`}
                                    title={item.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full aspect-video"
                                  ></iframe>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-row md:flex-col gap-3 md:ml-6 mt-4 md:mt-0">
                            <button
                              onClick={() => handleDownload(item, activeTab)}
                              className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group/btn border border-green-100"
                              title="Download"
                            >
                              <Download className="w-5 h-5 text-green-700 group-hover/btn:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => handleShare(item)}
                              className="p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors group/btn border border-amber-100"
                              title="Share"
                            >
                              <Share2 className="w-5 h-5 text-amber-700 group-hover/btn:scale-110 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </ScrollRevealSection>
                  ))}
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="py-24 px-6 bg-green-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <BookOpen className="w-20 h-20 mx-auto mb-8 text-amber-500 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-bold mb-8 font-serif">
              Contribute to Our Archive
            </h2>
            <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Help us preserve our heritage by sharing your family recipes, songs, and stories.
            </p>
            <button className="bg-amber-500 hover:bg-amber-400 text-white px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto">
              <Share2 className="w-5 h-5" />
              Submit Content
            </button>
          </ScrollRevealSection>
        </div>
      </section>

      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ ...shareModal, isOpen: false })}
        title={shareModal.title}
        content={shareModal.content}
        ingredients={shareModal.ingredients}
        prep={shareModal.prep}
      />
    </div>
  );
};