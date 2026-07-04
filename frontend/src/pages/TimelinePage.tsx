import React, { useState, useEffect } from 'react';
import { Mountain, BookOpen, Users, Heart, Calendar } from 'lucide-react';
import { timeline } from '../data';
import YalambarImage from '../assets/couple.webp';
import KiratiOverview from '../components/KiratiOverview';
import { ScrollRevealSection } from '../components/ScrollReveal';
import { TimelineModal } from '../components/TimelineModal';
import { usePageMeta } from '../hooks/usePageMeta';

export const TimelinePage: React.FC = () => {
  usePageMeta('Timeline', 'An interactive timeline of Kirati history, from ancient Himalayan settlements to the modern cultural revival.');
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<typeof timeline[0] | null>(null);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);

        // Calculate scroll progress for the timeline section
        const timelineSection = document.getElementById('timeline-section');
        if (timelineSection) {
          const { top, height } = timelineSection.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const progress = Math.min(Math.max((windowHeight - top) / (height + windowHeight) * 100, 0), 100);
          setScrollProgress(progress);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
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
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-primary-darker/20 backdrop-blur-sm">
        <div
          className="h-full bg-accent transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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
          <div className="mb-6 animate-float-slow"></div>
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

      {/* Timeline - Snake Layout */}
      <section id="timeline-section" className="py-24 px-6 bg-amber-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="hidden md:block">
            {/* Desktop Snake Layout */}
            {Array.from({ length: Math.ceil(timeline.length / 3) }).map((_, rowIndex) => {
              const startIdx = rowIndex * 3;
              const endIdx = Math.min(startIdx + 3, timeline.length);
              const rowItems = timeline.slice(startIdx, endIdx);
              const isEvenRow = rowIndex % 2 === 0;
              const isLastRow = rowIndex === Math.ceil(timeline.length / 3) - 1;

              // Reverse items for odd rows to create the snake effect visually
              const displayItems = isEvenRow ? rowItems : [...rowItems].reverse();

              return (
                <div key={rowIndex} className="relative mb-24 last:mb-0">
                  {/* Connecting Curves */}
                  {!isLastRow && (
                    <div className={`absolute top-1/2 w-24 h-48 border-[6px] border-amber-200/60 rounded-${isEvenRow ? 'r' : 'l'}-full 
                      ${isEvenRow ? 'right-0 border-l-0 translate-x-1/2' : 'left-0 border-r-0 -translate-x-1/2'} 
                      -z-10 shadow-sm`}
                      style={{ top: '50%' }}
                    />
                  )}

                  <div className={`flex justify-between items-start gap-8 ${!isEvenRow ? 'flex-row-reverse' : ''}`}>
                    {displayItems.map((item, idx) => {
                      // Robust check for first and last items in the timeline
                      const isFirstItem = item === timeline[0];
                      const isLastItem = item === timeline[timeline.length - 1];

                      return (
                        <ScrollRevealSection
                          key={idx}
                          className={`flex-1 w-full max-w-[30%] ${isFirstItem ? 'mt-20' : ''} ${isLastItem ? 'mb-20' : ''}`}
                        >
                          <div className="relative flex flex-col items-center">
                            {/* Start Marker (Desktop) */}
                            {isFirstItem && (
                              <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce-slow">
                                <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full shadow-lg shadow-amber-500/30 font-bold text-sm tracking-wider uppercase flex items-center gap-2 border-4 border-amber-100 whitespace-nowrap">
                                  <Mountain className="w-4 h-4" />
                                  Origins
                                </div>
                                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-amber-200 opacity-60" />
                              </div>
                            )}

                            <div
                              className="group relative cursor-pointer perspective-1000 w-full"
                              onClick={() => setSelectedEvent(item)}
                            >
                              {/* Connector Line */}
                              <div className={`absolute top-8 left-0 w-full h-[6px] bg-amber-200/60 -z-10 ${
                                // Logic to hide connector for first/last items in row appropriately
                                (isEvenRow && idx === 0 && rowIndex === 0) ? 'hidden' : ''
                                }`} />

                              <div className="bg-gradient-to-br from-white via-white to-amber-50/50 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-white/60 group-hover:border-amber-200/60 transform group-hover:-translate-y-2 h-full min-h-[320px] flex flex-col relative overflow-hidden">

                                {/* Decorative background blob */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-100/50 rounded-full blur-3xl group-hover:bg-amber-200/40 transition-colors duration-500" />

                                <div className="flex items-center justify-between mb-6 relative z-10">
                                  <div className="p-3.5 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl text-amber-600 group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:scale-110">
                                    {getIcon(item.icon)}
                                  </div>
                                  <span className="text-3xl font-bold text-green-950 font-serif tracking-tight">{item.year}</span>
                                </div>

                                <h3 className="text-xl font-bold text-green-900 mb-4 leading-tight group-hover:text-amber-700 transition-colors duration-300 relative z-10">{item.event}</h3>
                                <p className="text-green-700/80 text-sm leading-relaxed mb-6 relative z-10">
                                  {item.description ? item.description.substring(0, 90) + "..." : "A pivotal moment in our history."}
                                </p>

                                {/* Dot on the line */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-500 rounded-full border-[6px] border-white shadow-lg z-20 group-hover:scale-110 transition-transform duration-300" />

                                <div className="mt-auto pt-4 flex items-center text-amber-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 relative z-10">
                                  <span className="border-b-2 border-amber-200 group-hover:border-amber-500 pb-0.5 transition-colors">Read Full Story</span>
                                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                              </div>
                            </div>

                            {/* End Marker (Desktop) */}
                            {isLastItem && (
                              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                                <div className="w-1 h-8 bg-gradient-to-t from-green-600 to-amber-200 opacity-60" />
                                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white px-6 py-2 rounded-full shadow-lg shadow-green-600/30 font-bold text-sm tracking-wider uppercase flex items-center gap-2 border-4 border-green-100 whitespace-nowrap animate-pulse-slow">
                                  <Calendar className="w-4 h-4" />
                                  Present Day
                                </div>
                              </div>
                            )}
                          </div>
                        </ScrollRevealSection>
                      );
                    })}

                    {/* Fill empty spots in row to maintain grid structure */}
                    {Array.from({ length: 3 - displayItems.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="flex-1" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Vertical Layout */}
          <div className="md:hidden relative pt-24 pb-24">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-200 opacity-30" />

            {/* Start Marker (Mobile) */}
            <div className="absolute top-4 left-8 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-2 rounded-full shadow-lg border-2 border-white">
                <Mountain className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-amber-600 mt-1 uppercase tracking-wider bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">Origins</div>
            </div>

            <div className="space-y-12 pt-8">
              {timeline.map((item, index) => (
                <ScrollRevealSection key={index}>
                  <div
                    className="relative pl-20 cursor-pointer"
                    onClick={() => setSelectedEvent(item)}
                  >
                    {/* Connector */}
                    <div className="absolute left-8 top-8 w-12 h-0.5 bg-amber-300" />
                    {/* Dot */}
                    <div className="absolute left-[29px] top-6 w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-md z-10" />

                    <div className="bg-gradient-to-br from-white via-white to-amber-50/50 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] active:scale-95 transition-all duration-300 border border-white/60 relative overflow-hidden">

                      {/* Decorative background blob */}
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-100/50 rounded-full blur-2xl" />

                      <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-2.5 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl text-amber-600 shadow-sm">
                          {getIcon(item.icon)}
                        </div>
                        <span className="text-2xl font-bold text-green-950 font-serif tracking-tight">{item.year}</span>
                      </div>

                      <h3 className="text-lg font-bold text-green-900 mb-2 relative z-10">{item.event}</h3>
                      <p className="text-green-700/80 text-sm leading-relaxed mb-4 relative z-10">
                        {item.description ? item.description.substring(0, 80) + "..." : "Tap to read more details."}
                      </p>

                      <div className="flex items-center text-amber-600 text-xs font-bold uppercase tracking-wider relative z-10">
                        Read Story <span className="ml-1">→</span>
                      </div>
                    </div>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>

            {/* End Marker (Mobile) */}
            <div className="absolute bottom-4 left-8 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="text-xs font-bold text-green-700 mb-1 uppercase tracking-wider bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">Present</div>
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-2 rounded-full shadow-lg border-2 border-white">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>
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
            <a
              href="mailto:pranab.rai@coss.org.in?subject=Ikirati%20Timeline%20Contribution"
              className="bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center gap-3 mx-auto"
            >
              <BookOpen className="w-6 h-6" />
              Contribute to Timeline
            </a>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Timeline Modal */}
      <TimelineModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        icon={selectedEvent ? getIcon(selectedEvent.icon) : null}
      />
    </div>
  );
};