import React from 'react';
import festivalImage from '../assets/festival.webp';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { ScrollRevealSection } from '../components/ScrollReveal';
import { HeroOverlay } from '../components/HeroOverlay';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { useScrollY } from '../hooks/useScrollY';
import { LoadingSection, ErrorSection, EmptySection } from '../components/DataState';
import { usePageMeta } from '../hooks/usePageMeta';

type CommunityEvent = {
  title: string;
  date: string;
  location?: string;
  eventType?: string;
  description?: string;
  link?: string;
};

const EVENTS_QUERY = `*[_type == "event" && date >= now()] | order(date asc){title, date, location, eventType, description, link}`;

function formatEventDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const EventsPage: React.FC = () => {
  usePageMeta('Events', 'Upcoming Kirati community gatherings, festivals, workshops, and ceremonies.');
  const scrollY = useScrollY();
  const { data, loading, error, retry } = useSanityQuery<CommunityEvent[]>(EVENTS_QUERY);
  const events = data ?? [];

  return (
    <div className="overflow-x-hidden">
      {/* Parallax Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url(${festivalImage})`,
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <HeroOverlay />

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

          {loading && <LoadingSection label="Loading events" />}
          {!loading && error && <ErrorSection onRetry={retry} />}
          {!loading && !error && events.length === 0 && (
            <EmptySection message="No upcoming events are scheduled right now. Check back soon, or propose one below." />
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <ScrollRevealSection key={`${event.title}-${event.date}`} className={['', 'delay-100'][index % 2]}>
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-amber-100 group h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-4 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                        <Calendar className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-900 group-hover:text-amber-600 transition-colors">{event.title}</h3>
                        <p className="text-green-600 font-medium">{formatEventDate(event.date)}</p>
                      </div>
                    </div>
                    {event.eventType && (
                      <span className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                        {event.eventType}
                      </span>
                    )}
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2 text-green-700 mb-4">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  )}

                  {event.description && (
                    <p className="text-green-700 leading-relaxed mb-6 flex-1">{event.description}</p>
                  )}

                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full bg-green-50 hover:bg-green-600 text-green-800 hover:text-white py-4 rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      Event Details
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </ScrollRevealSection>
            ))}
          </div>
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
            <a
              href="mailto:pranab.rai@coss.org.in?subject=Ikirati%20Event%20Proposal"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Propose an Event
            </a>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};
