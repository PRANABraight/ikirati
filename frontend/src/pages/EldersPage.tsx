import React from 'react';
import elderImage from '../assets/elder.jpg';
import { AudioPlayer } from '../components/AudioPlayer';
import { ScrollRevealSection } from '../components/ScrollReveal';
import { HeroOverlay } from '../components/HeroOverlay';
import { urlFor, urlForFile } from '../lib/sanity';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { useScrollY } from '../hooks/useScrollY';
import { LoadingSection, ErrorSection, EmptySection } from '../components/DataState';
import { usePageMeta } from '../hooks/usePageMeta';

type Elder = {
  name: string;
  age?: number;
  specialty: string;
  quote?: string;
  image: unknown;
  audio: unknown;
};

const ELDERS_QUERY = `*[_type == "elder"] | order(name asc){name, age, specialty, quote, image, audio}`;

export const EldersPage: React.FC = () => {
  usePageMeta('Elders', 'Wisdom of Kirati elders: interviews, quotes, and recorded knowledge from community keepers.');
  const scrollY = useScrollY();
  const { data, loading, error, retry } = useSanityQuery<Elder[]>(ELDERS_QUERY);
  const elders = data ?? [];

  return (
    <div className="overflow-x-hidden">
      {/* Parallax Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url(${elderImage})`,
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <HeroOverlay />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            Wisdom of Our Elders
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 drop-shadow-md max-w-2xl mx-auto">
            Living libraries of knowledge, keepers of our most precious stories
          </p>
        </div>
      </section>

      {/* Elders Grid */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          {loading && <LoadingSection label="Loading elders" />}
          {!loading && error && <ErrorSection onRetry={retry} />}
          {!loading && !error && elders.length === 0 && (
            <EmptySection message="Elder profiles and interviews are being gathered from the community. Check back soon." />
          )}
          <div className="grid md:grid-cols-3 gap-8">
            {elders.map((elder, index) => (
              <ScrollRevealSection key={elder.name} className={['', 'delay-100', 'delay-200'][index % 3]}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100 hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative h-80 overflow-hidden bg-green-100">
                    {elder.image ? (
                      <img
                        src={urlFor(elder.image as Parameters<typeof urlFor>[0]).width(600).auto('format').url()}
                        alt={elder.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-3xl font-bold text-white mb-1">{elder.name}</h3>
                      <p className="text-amber-300 font-medium text-lg">
                        {elder.age ? `Age ${elder.age} • ` : ''}{elder.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="p-8">
                    {elder.quote && (
                      <div className="mb-6 relative">
                        <span className="absolute -top-4 -left-2 text-6xl text-amber-200 font-serif opacity-50">"</span>
                        <p className="text-green-800 italic text-lg relative z-10 pl-6 leading-relaxed">{elder.quote}</p>
                      </div>
                    )}
                    {elder.audio ? (
                      <AudioPlayer
                        src={urlForFile(elder.audio as Parameters<typeof urlForFile>[0])}
                        title={`${elder.name} - ${elder.specialty}`}
                      />
                    ) : null}
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Connect with Elders */}
      <section className="py-24 px-6 bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Learn from Our Elders
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Know an elder whose knowledge should be preserved here? Help us record
              and share their wisdom with the community.
            </p>
            <a
              href="mailto:pranab.rai@coss.org.in?subject=Ikirati%20Elder%20Interview"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Suggest an Elder
            </a>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};
