import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { AudioPlayer } from '../components/AudioPlayer';
import { elders } from '../data';

export const EldersPage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-16 h-16 mx-auto mb-6 text-amber-600" />
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Wisdom of Our Elders
          </h1>
          <p className="text-xl text-green-700">
            Living libraries of knowledge, keepers of our most precious stories
          </p>
        </div>
      </section>

      {/* Elders Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {elders.map((elder, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={elder.image} 
                    alt={elder.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/80 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white">{elder.name}</h3>
                    <p className="text-amber-200">Age {elder.age} • {elder.specialty}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-green-700 italic mb-4">"{elder.quote}"</p>
                  <AudioPlayer 
                    src={elder.audioSrc}
                    title={`${elder.name} - ${elder.specialty}`}
                    className="mb-4"
                  />
                  <button className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-full font-semibold transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elder Interviews */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
            Featured Interviews
          </h2>
          
          <div className="space-y-8">
            {elders.map((elder, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="text-center">
                    <img 
                      src={elder.image} 
                      alt={elder.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-green-900">{elder.name}</h3>
                    <p className="text-green-600">{elder.specialty}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">
                      "Preserving {elder.specialty} for Future Generations"
                    </h4>
                    <p className="text-green-700 mb-4">
                      In this intimate conversation, {elder.name} shares decades of knowledge 
                      about {elder.specialty.toLowerCase()}, offering insights that can only come 
                      from a lifetime of practice and dedication to our cultural traditions.
                    </p>
                    <AudioPlayer 
                      src={elder.audioSrc}
                      title={`Full Interview - ${elder.name}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect with Elders */}
      <section className="py-20 px-6 bg-green-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Learn from Our Elders
          </h2>
          <p className="text-xl text-green-200 mb-8">
            Schedule a visit or join our monthly elder wisdom circles to learn directly 
            from these living treasures of our community.
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Schedule a Visit
          </button>
        </div>
      </section>
    </div>
  );
};