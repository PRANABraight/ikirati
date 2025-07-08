import React from 'react';
import { Mountain, BookOpen, Users, Heart, Calendar } from 'lucide-react';
import { timeline } from '../data';

export const TimelinePage: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain': return <Mountain className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Calendar': return <Calendar className="w-4 h-4" />;
      default: return <Mountain className="w-4 h-4" />;
    }
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-green-600" />
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Our Journey Through Time
          </h1>
          <p className="text-xl text-green-700">
            From roots to present, the story of our community
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-400 rounded-full" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className={`flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className="p-2 bg-amber-100 rounded-full">
                          {getIcon(item.icon)}
                        </div>
                        <span className="text-2xl font-bold text-amber-600">{item.year}</span>
                      </div>
                      <p className="text-green-700 font-medium">{item.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-md z-10" />
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed History */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
            Detailed History
          </h2>
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-amber-100 rounded-full">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-900">{item.year}</h3>
                    <p className="text-green-600">{item.event}</p>
                  </div>
                </div>
                
                <div className="text-green-700 leading-relaxed">
                  {index === 0 && (
                    <p>
                      The first families arrived in our valley in the early 1800s, drawn by the fertile soil 
                      and abundant water sources. They established the foundations of what would become our 
                      thriving community, building the first homes and cultivating the land that would 
                      sustain generations.
                    </p>
                  )}
                  {index === 1 && (
                    <p>
                      As our community grew, the need to preserve and pass down traditional skills became 
                      apparent. The crafts guild was formed to ensure that weaving, pottery, and woodworking 
                      techniques would not be lost. Master craftspeople began formal apprenticeship programs 
                      that continue to this day.
                    </p>
                  )}
                  {index === 2 && (
                    <p>
                      Economic opportunities in distant cities drew many young people away from the valley. 
                      This migration brought new perspectives and connections to the outside world, but also 
                      began the gradual erosion of daily traditional practices as families spread across 
                      the region.
                    </p>
                  )}
                  {index === 3 && (
                    <p>
                      The passing of the last generation of native speakers marked a critical moment in our 
                      cultural history. Recognizing the urgency, community leaders began recording elders 
                      and documenting the language before it could be lost forever. This period sparked 
                      the first organized preservation efforts.
                    </p>
                  )}
                  {index === 4 && (
                    <p>
                      A new generation of community members, many descendants of those who had migrated, 
                      returned with a renewed appreciation for their heritage. They initiated comprehensive 
                      documentation projects, established cultural education programs, and created this 
                      digital archive to ensure our traditions survive and thrive.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add to Timeline */}
      <section className="py-20 px-6 bg-green-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Add to Our Timeline
          </h2>
          <p className="text-xl text-green-200 mb-8">
            Do you have historical information, photos, or stories that could enrich our timeline? 
            Help us build a more complete picture of our community's journey.
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Contribute to Timeline
          </button>
        </div>
      </section>
    </div>
  );
};