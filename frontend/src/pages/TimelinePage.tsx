import React from 'react';
import { Mountain, BookOpen, Users, Heart, Calendar } from 'lucide-react';
import { timeline } from '../data';
import KiratiOverview from '../components/KiratiOverview';

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

      {/* Kirati Overview Section */}
      <KiratiOverview />

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
                      The Kirati people are believed to be among the earliest inhabitants of the eastern Himalayan region, including present-day eastern Nepal and surrounding areas. Their ancestors settled in the hills and mountains, living in harmony with nature and developing a rich oral tradition that preserved their history, myths, and customs.
                    </p>
                  )}
                  {index === 1 && (
                    <p>
                      Historical records and local legends mention the Kirati dynasty ruling parts of Nepal for several centuries. They were known as skilled warriors and rulers before the rise of the Shah dynasty. This era laid the foundation for Kirati cultural identity and governance.
                    </p>
                  )}
                  {index === 2 && (
                    <p>
                      During this period, the various Kirati clans such as Rai, Limbu, Yakkha, and Sunuwar solidified their distinct identities. They developed unique dialects, rituals, and social structures, while maintaining shared cultural elements like the Mundhum religious tradition.
                    </p>
                  )}
                  {index === 3 && (
                    <p>
                      The Limbu scholar Sirijunga introduced and revived the Limbu script, enabling the Limbu people to write their language and preserve their oral literature. This was a significant step toward cultural preservation and literacy.
                    </p>
                  )}
                  {index === 4 && (
                    <p>
                      Kirati communities began organizing their traditional festivals such as Sakela and Udhauli-Ubhauli more formally. These festivals became central to community life, reinforcing social bonds and spiritual beliefs.
                    </p>
                  )}
                  {index === 5 && (
                    <p>
Economic changes and educational opportunities led many Kirati youth to migrate to cities within Nepal and abroad. This migration brought exposure to new ideas but also challenged the transmission of traditional knowledge and language.                    </p>
                  )}
                  {index === 6 && (
                    <p>
The number of native Kirati language speakers began to decline significantly due to urbanization and assimilation pressures. Concerned elders and cultural activists started efforts to document and revive their languages and customs.                    </p>
                  )}
                  {index === 7 && (
                    <p>
Community organizations and scholars intensified work on preserving Kirati heritage through language classes, cultural programs, and academic research. Kirati music, dance, and rituals gained wider recognition.                    </p>
                  )}
                {index ===8 && (
                  <p>A new generation of Kirati youth, both in Nepal and the diaspora, spearheaded cultural revival movements. They established digital archives, cultural schools, and advocacy groups to promote Kirati identity and seek political rights within Nepal’s federal system.</p>
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