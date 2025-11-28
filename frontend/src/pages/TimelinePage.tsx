import React, { useState, useEffect } from 'react';
import { Mountain, BookOpen, Users, Heart, Calendar } from 'lucide-react';
import { timeline } from '../data';
import YalambarImage from '../assets/Yalambar.jpg';
import KiratiOverview from '../components/KiratiOverview';
import { ScrollRevealSection } from '../components/ScrollReveal';

export const TimelinePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain': return <Mountain className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Calendar': return <Calendar className="w-5 h-5" />;
      default: return <Mountain className="w-5 h-5" />;
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Parallax Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url(${YalambarImage})`,
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/90 via-green-900/70 to-amber-50" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-6 animate-float-slow">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm text-sm font-bold tracking-widest uppercase mb-4">
              Est. Ancient Times
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl font-serif tracking-tight leading-tight">
            Our Journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Through Time</span>
          </h1>
          <p className="text-xl md:text-3xl text-green-100 drop-shadow-lg max-w-3xl mx-auto font-light leading-relaxed">
            From the roots of the Himalayas to the present day, <br className="hidden md:block" />
            witness the enduring legacy of the Kirati people.
          </p>

          <div className="mt-12 animate-bounce-slow">
            <div className="w-1 h-16 bg-gradient-to-b from-amber-500 to-transparent mx-auto rounded-full opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Kirati Overview Section */}
      <KiratiOverview />

      {/* Timeline */}
      <section className="py-24 px-6 bg-amber-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="relative">
            {/* Center Line (Desktop) / Left Line (Mobile) */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-200 via-amber-500 to-amber-200 rounded-full opacity-30" />
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-1/3 bg-gradient-to-b from-amber-500 to-transparent rounded-full" />

            <div className="space-y-16 md:space-y-32">
              {timeline.map((item, index) => (
                <ScrollRevealSection key={index}>
                  <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative group`}>

                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} text-left`}>
                      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100 group-hover:border-amber-300 relative transform group-hover:-translate-y-1">

                        {/* Decorative Corner */}
                        <div className={`absolute top-0 w-16 h-16 border-t-4 border-amber-200 transition-all duration-500 group-hover:border-amber-500 ${index % 2 === 0 ? 'right-0 border-r-4 rounded-tr-3xl' : 'left-0 border-l-4 rounded-tl-3xl'}`} />

                        {/* Connector Line (Desktop) */}
                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-amber-300 to-amber-500 ${index % 2 === 0 ? '-right-16' : '-left-16'}`} />

                        {/* Connector Line (Mobile) */}
                        <div className="md:hidden absolute top-10 -left-12 w-12 h-0.5 bg-amber-300" />

                        <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                          <div className="p-4 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-lg group-hover:rotate-6">
                            {getIcon(item.icon)}
                          </div>
                          <span className="text-3xl md:text-4xl font-bold text-green-900 font-serif">{item.year}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-amber-700 mb-4">{item.event}</h3>
                        <p className="text-green-800 leading-relaxed text-base md:text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                          A pivotal moment in our history that shaped the generations to come.
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 md:relative md:translate-x-0 md:left-auto z-10 top-10 md:top-auto">
                      <div className="relative">
                        <div className="w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-lg z-10 relative group-hover:scale-125 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-20 group-hover:opacity-60" />
                      </div>
                    </div>

                    {/* Spacer for Desktop */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed History */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-5xl mx-auto">
          <ScrollRevealSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6 font-serif">
                Detailed History
              </h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
            </div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                  <div className="flex flex-col items-center md:w-1/4">
                    <div className="p-6 bg-green-50 rounded-3xl text-green-600 group-hover:bg-green-800 group-hover:text-white transition-all duration-500 shadow-md group-hover:shadow-xl transform group-hover:rotate-3">
                      {getIcon(item.icon)}
                    </div>
                    <div className="w-0.5 h-full bg-gradient-to-b from-green-100 to-transparent my-6 group-hover:from-green-300 transition-colors" />
                  </div>
                  <div className="md:w-3/4 pb-12 border-b border-green-50 last:border-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                      <h3 className="text-3xl font-bold text-green-900 font-serif">
                        {item.year}
                      </h3>
                      <span className="hidden md:block text-green-300">•</span>
                      <span className="text-lg font-medium text-amber-600 px-4 py-1 bg-amber-50 rounded-full self-start">
                        {item.event}
                      </span>
                    </div>

                    <div className="text-green-800 leading-loose text-lg pl-6 border-l-4 border-green-100 group-hover:border-amber-500 transition-all duration-500 bg-green-50/30 p-6 rounded-r-2xl">
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
                          Economic changes and educational opportunities led many Kirati youth to migrate to cities within Nepal and abroad. This migration brought exposure to new ideas but also challenged the transmission of traditional knowledge and language.
                        </p>
                      )}
                      {index === 6 && (
                        <p>
                          The number of native Kirati language speakers began to decline significantly due to urbanization and assimilation pressures. Concerned elders and cultural activists started efforts to document and revive their languages and customs.
                        </p>
                      )}
                      {index === 7 && (
                        <p>
                          Community organizations and scholars intensified work on preserving Kirati heritage through language classes, cultural programs, and academic research. Kirati music, dance, and rituals gained wider recognition.
                        </p>
                      )}
                      {index === 8 && (
                        <p>
                          A new generation of Kirati youth, both in Nepal and the diaspora, spearheaded cultural revival movements. They established digital archives, cultural schools, and advocacy groups to promote Kirati identity and seek political rights within Nepal’s federal system.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Add to Timeline */}
      <section className="py-24 px-6 bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-serif">
              Add to Our Timeline
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Do you have historical information, photos, or stories that could enrich our timeline?
              Help us build a more complete picture of our community's journey.
            </p>
            <button className="bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto">
              <BookOpen className="w-6 h-6" />
              Contribute to Timeline
            </button>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};