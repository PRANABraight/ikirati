import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { upcomingEvents } from '../data';

export const EventsPage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-amber-600" />
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Community Gatherings
          </h1>
          <p className="text-xl text-green-700">
            Join us as we celebrate, learn, and preserve our heritage together
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
            Upcoming Events
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-900">{event.title}</h3>
                      <p className="text-green-600">{event.date}</p>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {event.type}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-green-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.attendees} attending</span>
                  </div>
                </div>

                <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-3 rounded-full font-semibold transition-colors">
                  Join Event
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
            Event Calendar
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-green-900 mb-2">March 2024</h3>
              <p className="text-green-600">Click on any date to see events</p>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-green-700 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <button
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded-lg transition-colors ${
                    [15, 22].includes(day)
                      ? 'bg-amber-100 text-amber-800 font-bold hover:bg-amber-200'
                      : 'hover:bg-green-50 text-green-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Host an Event */}
      <section className="py-20 px-6 bg-green-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Host Your Own Event
          </h2>
          <p className="text-xl text-green-200 mb-8">
            Have an idea for a cultural event? We'd love to help you organize it 
            and bring our community together.
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Propose an Event
          </button>
        </div>
      </section>
    </div>
  );
};