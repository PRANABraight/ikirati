import React, { useState, useEffect } from 'react';
import culturImage from '../assets/cultur.webp';
import elderImage from '../assets/elder.jpg';
import { Link } from 'react-router-dom';
// ... (rest of imports)

// ... (inside component)


import {
  Heart,
  Users,
  Camera,
  Mail,
  ArrowRight,
  Music,
  BookOpen
} from 'lucide-react';
import { stories } from '../data';

import { ScrollRevealSection } from '../components/ScrollReveal';

export const HomePage: React.FC = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setHeroVisible(true);
    const timer = setInterval(() => {
      setCurrentStory(prev => (prev + 1) % stories.length);
    }, 5000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/50 to-amber-900/80" />

        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 pt-20 md:pt-0 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="mb-8 animate-float-slow">
            <span className="inline-block py-1 px-4 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm text-sm font-bold tracking-widest uppercase">
              Welcome to Kirati Heart
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-xl font-serif">
            Remember Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              Heritage
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-50 mb-10 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md font-serif">
            Discover the untold stories of the Kirati people—guardians of the eastern Himalayas, weavers of ancient dreams, and keepers of a vibrant legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/timeline"
              className="group bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 font-serif"
            >
              Start the Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/archive"
              className="group bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 font-serif"
            >
              Explore Archive
              <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Stories Carousel */}
      <section className="py-24 px-6 bg-amber-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollRevealSection>
            <div className="text-center mb-20">
              <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold tracking-widest uppercase mb-4">
                Oral Traditions
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-green-900 mb-6 font-serif">
                Voices of the Valley
              </h2>
              <p className="text-xl text-green-700 max-w-3xl mx-auto font-light leading-relaxed">
                Listen to the whispers of our ancestors, echoing through time in every story told.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition-all duration-500 border border-white/50 hover:-translate-y-1">
              <div className="grid md:grid-cols-2 min-h-[500px]">
                <div className="relative h-64 md:h-auto overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors duration-500" />
                  <img
                    src={stories[currentStory].image}
                    alt={stories[currentStory].title}
                    className="w-full h-full object-cover transform scale-105 transition-transform duration-[20s] ease-linear"
                    style={{ transform: 'scale(1.1)' }}
                  />
                </div>
                <div className="p-10 md:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-green-50/50">
                  <div className="flex items-center gap-2 text-amber-600 mb-6">
                    <Music className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-widest text-xs">Featured Story</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-green-900 mb-6 leading-tight font-serif">
                    {stories[currentStory].title}
                  </h3>
                  <p className="text-lg text-green-700 mb-8 leading-relaxed italic border-l-4 border-amber-400 pl-4">
                    "{stories[currentStory].text}"
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-green-100">
                    <div>
                      <p className="text-xs text-green-600 uppercase tracking-wider font-bold mb-1">Storyteller</p>
                      <p className="text-green-900 font-bold text-lg font-serif">
                        {stories[currentStory].author || "Unknown Ancestor"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {stories.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentStory(idx)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentStory ? 'bg-amber-500 w-8' : 'bg-green-200 hover:bg-green-300'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Split Feature: Cultural Archive */}
      <section className="py-0">
        <div className="grid md:grid-cols-2">
          <div className="relative h-96 md:h-auto overflow-hidden group">
            <img
              src={culturImage}
              alt="Cultural Archive"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-green-900/40 group-hover:bg-green-900/30 transition-colors" />
          </div>
          <div className="bg-green-900 text-white p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -mr-20 -mt-20"></div>
            <ScrollRevealSection>
              <span className="inline-block py-1 px-3 rounded-full bg-green-800 text-green-200 border border-green-700 text-xs font-bold tracking-widest uppercase mb-6">
                Preserving Our Legacy
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Cultural Archive</h2>
              <p className="text-xl text-green-100 mb-10 leading-relaxed">
                Dive into a vast collection of recipes, songs, and myths. Our archive is a living library of the Kirati way of life.
              </p>
              <Link
                to="/archive"
                className="inline-flex items-center gap-3 text-amber-400 font-bold text-lg hover:text-amber-300 transition-colors group"
              >
                Explore the Archive
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* Split Feature: Interactive Timeline */}
      <section className="py-0">
        <div className="grid md:grid-cols-2">
          <div className="bg-amber-50 p-12 md:p-24 flex flex-col justify-center order-2 md:order-1 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -ml-20 -mb-20"></div>
            <ScrollRevealSection>
              <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold tracking-widest uppercase mb-6">
                Est. Ancient Times
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6 font-serif">Interactive Timeline</h2>
              <p className="text-xl text-green-700 mb-10 leading-relaxed">
                Walk through the ages. From ancient origins to modern revival, trace the footsteps of our ancestors across centuries of history.
              </p>
              <Link
                to="/timeline"
                className="inline-flex items-center gap-3 text-amber-600 font-bold text-lg hover:text-amber-700 transition-colors group"
              >
                View Timeline
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </ScrollRevealSection>
          </div>
          <div className="relative h-96 md:h-auto overflow-hidden group order-1 md:order-2">
            <img
              src={elderImage}
              alt="Timeline"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-amber-900/20 group-hover:bg-amber-900/10 transition-colors" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-900">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <Heart className="w-20 h-20 mx-auto mb-8 text-amber-400 animate-pulse" />
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 font-serif">
              Keep the Flame Alive
            </h2>
            <p className="text-2xl text-green-100 mb-12 max-w-2xl mx-auto font-light font-serif">
              Your participation is the heartbeat of our community. Join us in celebrating and preserving our unique heritage.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/events"
                className="bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
              >
                <Users className="w-6 h-6" />
                Join Community
              </Link>
              <Link
                to="/gallery"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-900 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Camera className="w-6 h-6" />
                Share Memories
              </Link>
            </div> */}

            <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-sm p-2 rounded-3xl sm:rounded-full flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email for updates"
                className="w-full sm:w-auto flex-1 px-6 py-3 bg-transparent text-white placeholder-green-200 focus:outline-none text-lg text-center sm:text-left"
              />
              <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 px-8 py-3 rounded-2xl sm:rounded-full text-white font-bold transition-colors shadow-lg flex items-center justify-center font-serif">
                <Mail className="w-5 h-5 mr-2" />
                Subscribe
              </button>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};