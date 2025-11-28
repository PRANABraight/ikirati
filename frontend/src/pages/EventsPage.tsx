import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { upcomingEvents } from '../data';
import { ScrollRevealSection } from '../components/ScrollReveal';

export const EventsPage: React.FC = () => {
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
            backgroundImage: "url('https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/60 to-amber-50" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            Community Gatherings
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 drop-shadow-md max-w-2xl mx-auto">
            Join us as we celebrate, learn, and preserve our heritage together
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <ScrollRevealSection>
            <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
              Upcoming Events
            </h2>
          </ScrollRevealSection>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <ScrollRevealSection key={index} className={`delay-${(index % 2) * 100}`}>
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-amber-100 group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-4 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                        <Calendar className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-900 group-hover:text-amber-600 transition-colors">{event.title}</h3>
                        <p className="text-green-600 font-medium">{event.date}</p>
                      </div>
                    </div>
                    <span className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                      {event.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-green-700 mb-8">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-500" />
                      <span className="font-medium">{event.attendees} attending</span>
                    </div>
                  </div>

                  <button className="w-full bg-green-50 hover:bg-green-600 text-green-800 hover:text-white py-4 rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
                    Join Event
                  </button>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollRevealSection>
            <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
              Event Calendar
            </h2>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-green-900 mb-2">March 2024</h3>
                <p className="text-green-600">Click on any date to see events</p>
              </div>

              <div className="grid grid-cols-7 gap-4 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-bold text-green-800 py-2 uppercase tracking-wider text-sm">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <button
                    key={day}
                    className={`aspect-square flex items-center justify-center rounded-xl transition-all duration-300 font-medium text-lg ${[15, 22].includes(day)
                      ? 'bg-amber-500 text-white font-bold shadow-lg hover:bg-amber-600 transform hover:scale-110'
                      : 'hover:bg-green-100 text-green-700 hover:text-green-900'
                      }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Host an Event */}
      <section className="py-24 px-6 bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Host Your Own Event
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Have an idea for a cultural event? We'd love to help you organize it
              and bring our community together.
            </p>
            <button className="bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Propose an Event
            </button>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};