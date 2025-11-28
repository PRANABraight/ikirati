import React, { useState, useEffect } from 'react';
import elderImage from '../assets/elder.jpg';
import { MessageCircle } from 'lucide-react';
import { AudioPlayer } from '../components/AudioPlayer';
import { elders } from '../data';
import { ScrollRevealSection } from '../components/ScrollReveal';

export const EldersPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Parallax Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url(${elderImage})`, // Assuming you have an elder image
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/60 to-amber-50" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            Wisdom of Our Elders
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 drop-shadow-md max-w-2xl mx-auto">
            Living libraries of knowledge, keepers of our most precious stories
          </p>
        </div>
      </section>

      {/* Elders Grid */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {elders.map((elder, index) => (
              <ScrollRevealSection key={index} className={`delay-${index * 100}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100 hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={elder.image}
                      alt={elder.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-3xl font-bold text-white mb-1">{elder.name}</h3>
                      <p className="text-amber-300 font-medium text-lg">Age {elder.age} • {elder.specialty}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <span className="absolute -top-4 -left-2 text-6xl text-amber-200 font-serif opacity-50">"</span>
                      <p className="text-green-800 italic text-lg relative z-10 pl-6 leading-relaxed">{elder.quote}</p>
                    </div>
                    <AudioPlayer
                      src={elder.audioSrc}
                      title={`${elder.name} - ${elder.specialty}`}
                      className="mb-6"
                    />
                    <button className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 px-6 py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2 group/btn">
                      <MessageCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      Connect
                    </button>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Elder Interviews */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollRevealSection>
            <h2 className="text-4xl font-bold text-green-900 mb-16 text-center">
              Featured Interviews
            </h2>

            <div className="space-y-12">
              {elders.map((elder, index) => (
                <div key={index} className="bg-green-50 rounded-3xl p-8 md:p-12 shadow-lg border border-green-100 hover:border-green-300 transition-colors duration-300">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="text-center md:text-left">
                      <div className="relative w-40 h-40 mx-auto md:mx-0 mb-6 group">
                        <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                        <img
                          src={elder.image}
                          alt={elder.name}
                          className="w-full h-full rounded-full object-cover relative z-10 border-4 border-white shadow-md"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-green-900">{elder.name}</h3>
                      <p className="text-amber-600 font-medium">{elder.specialty}</p>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-1 bg-amber-500 rounded-full" />
                        "Preserving {elder.specialty} for Future Generations"
                      </h4>
                      <p className="text-green-700 mb-8 text-lg leading-relaxed">
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
          </ScrollRevealSection>
        </div>
      </section>

      {/* Connect with Elders */}
      <section className="py-24 px-6 bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Learn from Our Elders
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a visit or join our monthly elder wisdom circles to learn directly
              from these living treasures of our community.
            </p>
            <button className="bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Schedule a Visit
            </button>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};