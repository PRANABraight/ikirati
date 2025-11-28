import React, { useState, useEffect } from 'react';
import craftImage from '../assets/craft.jpg';
import { Clock } from 'lucide-react';
import { crafts } from '../data';
import { ScrollRevealSection } from '../components/ScrollReveal';

export const CraftsPage: React.FC = () => {
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
            backgroundImage: `url(${craftImage})`, // Assuming you might have a crafts image, or fallback to a generic one
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        {/* Fallback background if image is missing or just overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/60 to-amber-50" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            Sacred Arts & Crafts
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 drop-shadow-md max-w-2xl mx-auto">
            Hands that create beauty, minds that preserve wisdom, hearts that honor tradition
          </p>
        </div>
      </section>

      {/* Crafts Grid */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {crafts.map((craft, index) => (
              <ScrollRevealSection key={index} className={`delay-${index * 100}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-amber-100">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={craft.image}
                      alt={craft.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                      {craft.difficulty}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-green-900 mb-3 group-hover:text-amber-600 transition-colors">{craft.title}</h3>
                    <p className="text-green-700 mb-6 flex-1 leading-relaxed">{craft.description}</p>
                    <div className="flex items-center justify-between text-sm text-green-600 pt-6 border-t border-green-50">
                      <span className="flex items-center gap-2 font-semibold">
                        <Clock className="w-4 h-4 text-amber-500" />
                        {craft.timeToLearn}
                      </span>
                      <button className="text-amber-600 font-bold hover:text-amber-700 transition-colors group-hover:translate-x-1 duration-300 flex items-center gap-1">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>

          <div className="text-center mt-16">
            <ScrollRevealSection>
              <button className="bg-amber-500 hover:bg-amber-400 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Join a Workshop
              </button>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* Craft Techniques */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollRevealSection>
            <h2 className="text-4xl font-bold text-green-900 mb-16 text-center">
              Traditional Techniques
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-green-50 rounded-3xl p-10 shadow-lg border border-green-100 hover:border-green-300 transition-colors duration-300">
                <h3 className="text-3xl font-bold text-green-900 mb-6">Ancient Methods</h3>
                <p className="text-green-800 mb-8 text-lg leading-relaxed">
                  Our crafts are created using techniques that have remained unchanged for centuries.
                  Each piece carries the wisdom of generations of artisans who perfected these methods
                  through patient practice and deep understanding of natural materials.
                </p>
                <ul className="space-y-4 text-green-700">
                  {[
                    'Hand-spinning natural fibers',
                    'Natural dye extraction from plants',
                    'Traditional loom construction',
                    'Sacred symbol interpretation'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 rounded-3xl p-10 shadow-lg border border-amber-100 hover:border-amber-300 transition-colors duration-300">
                <h3 className="text-3xl font-bold text-green-900 mb-6">Learning Path</h3>
                <p className="text-green-800 mb-8 text-lg leading-relaxed">
                  Master craftspeople guide students through a structured learning journey that
                  honors both the technical skills and spiritual significance of each art form.
                  The path requires patience, dedication, and respect for tradition.
                </p>
                <div className="space-y-6">
                  {[
                    { step: 1, title: 'Foundation & History', color: 'bg-green-100 text-green-800' },
                    { step: 2, title: 'Basic Techniques', color: 'bg-green-100 text-green-800' },
                    { step: 3, title: 'Advanced Skills', color: 'bg-green-100 text-green-800' },
                    { step: 4, title: 'Master Certification', color: 'bg-amber-100 text-amber-800' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        {item.step}
                      </div>
                      <span className="text-green-900 font-bold text-lg">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};