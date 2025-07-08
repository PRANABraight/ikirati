import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { stories } from '../data';

export const StoriesPage: React.FC = () => {
  const [currentStory, setCurrentStory] = useState(0);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-green-600" />
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Community Stories
          </h1>
          <p className="text-xl text-green-700">
            Every story is a bridge between past and present, every memory a treasure saved from time
          </p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-96 md:h-auto">
                  <img 
                    src={stories[currentStory].image} 
                    alt={stories[currentStory].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-green-900 mb-4">
                    {stories[currentStory].title}
                  </h3>
                  <p className="text-lg text-green-700 mb-6 leading-relaxed">
                    "{stories[currentStory].text}"
                  </p>
                  <p className="text-amber-600 font-semibold">
                    — {stories[currentStory].author}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={() => setCurrentStory(prev => prev === 0 ? stories.length - 1 : prev - 1)}
                className="p-3 bg-green-100 hover:bg-green-200 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-green-700" />
              </button>
              <div className="flex space-x-2 items-center">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStory ? 'bg-amber-500' : 'bg-green-200'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setCurrentStory(prev => (prev + 1) % stories.length)}
                className="p-3 bg-green-100 hover:bg-green-200 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-green-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Stories Grid */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
            All Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  index === currentStory ? 'ring-2 ring-amber-500' : ''
                }`}
                onClick={() => setCurrentStory(index)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-3">{story.title}</h3>
                  <p className="text-green-700 mb-4 line-clamp-3">{story.text}</p>
                  <p className="text-amber-600 font-semibold text-sm">— {story.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="py-20 px-6 bg-green-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Share Your Story
          </h2>
          <p className="text-xl text-green-200 mb-8">
            Do you have a story that connects to our heritage? We'd love to hear it.
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Submit Your Story
          </button>
        </div>
      </section>
    </div>
  );
};