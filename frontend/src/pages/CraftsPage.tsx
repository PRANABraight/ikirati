import React from 'react';
import { Palette, Clock } from 'lucide-react';
import { crafts } from '../data';

export const CraftsPage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <Palette className="w-16 h-16 mx-auto mb-6 text-amber-600" />
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Sacred Arts & Crafts
          </h1>
          <p className="text-xl text-green-700">
            Hands that create beauty, minds that preserve wisdom, hearts that honor tradition
          </p>
        </div>
      </section>

      {/* Crafts Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {crafts.map((craft, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={craft.image} 
                    alt={craft.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {craft.difficulty}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-900 mb-3">{craft.title}</h3>
                  <p className="text-green-700 mb-4">{craft.description}</p>
                  <div className="flex items-center justify-between text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {craft.timeToLearn}
                    </span>
                    <button className="bg-green-100 hover:bg-green-200 px-4 py-2 rounded-full font-semibold transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Join a Workshop
            </button>
          </div>
        </div>
      </section>

      {/* Craft Techniques */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
            Traditional Techniques
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Ancient Methods</h3>
              <p className="text-green-700 mb-6">
                Our crafts are created using techniques that have remained unchanged for centuries. 
                Each piece carries the wisdom of generations of artisans who perfected these methods 
                through patient practice and deep understanding of natural materials.
              </p>
              <ul className="space-y-2 text-green-600">
                <li>• Hand-spinning natural fibers</li>
                <li>• Natural dye extraction from plants</li>
                <li>• Traditional loom construction</li>
                <li>• Sacred symbol interpretation</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Learning Path</h3>
              <p className="text-green-700 mb-6">
                Master craftspeople guide students through a structured learning journey that 
                honors both the technical skills and spiritual significance of each art form. 
                The path requires patience, dedication, and respect for tradition.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">1</div>
                  <span className="text-green-700">Foundation & History</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">2</div>
                  <span className="text-green-700">Basic Techniques</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">3</div>
                  <span className="text-green-700">Advanced Skills</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-sm">4</div>
                  <span className="text-green-700">Master Certification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};