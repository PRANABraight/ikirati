import React, { useState } from 'react';
import { stories, stories1 } from '../data';
import { BookOpen, User, Clock, ArrowRight, Quote, Share2 } from 'lucide-react';
import { ScrollRevealSection } from '../components/ScrollReveal';
import { StoryModal } from '../components/StoryModal';
import danceImage from '../assets/dance.webp';

export const StoriesPage: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);

  // Combine stories and remove duplicates based on title
  const allStories = [...stories, ...stories1]
    .filter((story, index, self) =>
      index === self.findIndex((t) => (
        t.title === story.title
      ))
    );

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${danceImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/90 via-green-900/70 to-amber-50" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-6 animate-float-slow">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm text-sm font-bold tracking-widest uppercase mb-4">
              Echoes of the Past
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl font-serif tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Stories</span>
          </h1>
          <p className="text-xl md:text-3xl text-green-100 drop-shadow-lg max-w-3xl mx-auto font-light leading-relaxed">
            Myths, legends, and oral traditions that define the Kirati spirit.
          </p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-24 px-6 bg-amber-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollRevealSection>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50 hover:shadow-3xl transition-shadow duration-500">
              <div className="grid md:grid-cols-2">
                <div className="relative h-[500px] md:h-auto overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                  <img
                    src={allStories[0].image}
                    alt={allStories[0].title}
                    className="w-full h-full object-cover transform scale-105 transition-transform duration-[20s] ease-linear"
                    style={{ transform: 'scale(1.1)' }}
                  />
                </div>
                <div className="p-10 md:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-green-50/50">
                  <div className="flex items-center gap-2 text-amber-600 mb-6">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-widest text-xs">Featured Legend</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-8 leading-tight font-serif">
                    {allStories[0].title}
                  </h2>
                  <p className="text-xl text-green-800 mb-10 leading-relaxed italic opacity-90 border-l-4 border-amber-400 pl-6">
                    "{allStories[0].text.substring(0, 200)}..."
                  </p>
                  <button
                    onClick={() => setSelectedStory(allStories[0])}
                    className="inline-flex items-center gap-3 bg-green-900 text-white px-8 py-4 rounded-full font-bold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg self-start"
                  >
                    Read Full Story
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* All Stories Grid */}
      <section className="py-24 px-6 bg-stone-50 relative">
        <div className="absolute left-0 bottom-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6 font-serif">More Tales from the Hills</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
            </div>
          </ScrollRevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allStories.slice(1).map((story, index) => (
              <ScrollRevealSection key={index} className={`delay-${(index % 3) * 100}`}>
                <div
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-green-50 group hover:-translate-y-2 h-full flex flex-col cursor-pointer"
                  onClick={() => setSelectedStory(story)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                      <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 5 min read
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-white to-green-50/30">
                    <h3 className="text-2xl font-bold text-green-900 mb-4 font-serif group-hover:text-amber-600 transition-colors">
                      {story.title}
                    </h3>

                    <div className="mb-6 relative">
                      <Quote className="w-8 h-8 text-amber-100 absolute -top-2 -left-2 -z-10" />
                      <p className="text-green-700 leading-relaxed line-clamp-3 relative z-10">
                        {story.text}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-green-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                        <User className="w-4 h-4" />
                        {story.author || "Unknown"}
                      </div>
                      <span className="text-amber-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="py-24 px-6 bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <BookOpen className="w-20 h-20 mx-auto mb-8 text-amber-500 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 font-serif">
              Share Your Story
            </h2>
            <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Do you have a family legend or a personal memory to share? Help us expand our collection.
            </p>
            <button className="bg-amber-500 hover:bg-amber-400 text-white px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto">
              <Share2 className="w-5 h-5" />
              Submit a Story
            </button>
          </ScrollRevealSection>
        </div>
      </section>

      <StoryModal
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        story={selectedStory}
      />
    </div>
  );
};