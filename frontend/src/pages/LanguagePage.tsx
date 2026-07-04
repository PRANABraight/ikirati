import React from 'react';
import mountainImage from '../assets/mountain.webp';
import { AudioPlayer } from '../components/AudioPlayer';
import { ScrollRevealSection } from '../components/ScrollReveal';
import { HeroOverlay } from '../components/HeroOverlay';
import { urlForFile } from '../lib/sanity';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { useScrollY } from '../hooks/useScrollY';
import { LoadingSection, ErrorSection, EmptySection } from '../components/DataState';
import { usePageMeta } from '../hooks/usePageMeta';

type VocabularyEntry = {
  word: string;
  language: string;
  translation: string;
  pronunciation?: string;
  example?: string;
  audio: unknown;
};

const VOCABULARY_QUERY = `*[_type == "vocabularyEntry"] | order(language asc, word asc){word, language, translation, pronunciation, example, audio}`;

const LANGUAGE_LABELS: Record<string, string> = {
  limbu: 'Limbu',
  'rai-bantawa': 'Rai (Bantawa)',
  'rai-chamling': 'Rai (Chamling)',
  'rai-kulung': 'Rai (Kulung)',
  yakkha: 'Yakkha',
  sunuwar: 'Sunuwar',
};

export const LanguagePage: React.FC = () => {
  usePageMeta('Language', 'Kirati language preservation: Limbu, Rai, Yakkha, and Sunuwar vocabulary and pronunciation recordings.');
  const scrollY = useScrollY();
  const { data, loading, error, retry } = useSanityQuery<VocabularyEntry[]>(VOCABULARY_QUERY);
  const entries = data ?? [];
  const recordings = entries.filter((e) => e.audio);
  const languageCount = new Set(entries.map((e) => e.language)).size;

  return (
    <div className="overflow-x-hidden">
      {/* Parallax Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url(${mountainImage})`,
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <HeroOverlay />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            Our Native Tongues
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 drop-shadow-md max-w-2xl mx-auto">
            Limbu, Rai, Yakkha, Sunuwar — every word recorded keeps a Kirati language alive.
          </p>
        </div>
      </section>

      {/* Language Stats & Vocabulary */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          {loading && <LoadingSection label="Loading vocabulary" />}
          {!loading && error && <ErrorSection onRetry={retry} />}
          {!loading && !error && entries.length === 0 && (
            <EmptySection message="Our vocabulary archive is just beginning. Words and recordings will appear here as the community contributes." />
          )}

          {!loading && !error && entries.length > 0 && (
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <ScrollRevealSection>
                <div>
                  <h2 className="text-4xl font-bold text-green-900 mb-6">
                    Preserving Our Languages
                  </h2>
                  <p className="text-xl text-green-700 mb-8 leading-relaxed">
                    Every conversation, every recording, every lesson brings us closer to
                    ensuring Kirati languages survive for future generations.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center p-8 bg-green-100 rounded-2xl shadow-md">
                      <div className="text-5xl font-bold text-green-800 mb-2">{entries.length}</div>
                      <div className="text-green-700 font-medium">Words Preserved</div>
                    </div>
                    <div className="text-center p-8 bg-amber-100 rounded-2xl shadow-md">
                      <div className="text-5xl font-bold text-amber-600 mb-2">{languageCount}</div>
                      <div className="text-amber-800 font-medium">Languages Documented</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {entries.map((entry) => (
                      <div key={`${entry.language}-${entry.word}`} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm gap-4">
                        <div>
                          <span className="text-green-800 font-bold text-lg">{entry.word}</span>
                          {entry.pronunciation && (
                            <span className="text-green-500 text-sm ml-2">/{entry.pronunciation}/</span>
                          )}
                          <p className="text-xs text-amber-700 uppercase tracking-wide mt-1">
                            {LANGUAGE_LABELS[entry.language] ?? entry.language}
                          </p>
                        </div>
                        <span className="text-green-600 italic text-right">{entry.translation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollRevealSection>

              <ScrollRevealSection className="delay-200">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-green-50">
                  <h3 className="text-2xl font-bold text-green-900 mb-8 border-b border-green-100 pb-4">Pronunciation Recordings</h3>
                  {recordings.length === 0 ? (
                    <p className="text-green-700">
                      Audio recordings from native speakers will appear here as they are added.
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {recordings.map((entry) => (
                        <div key={`${entry.language}-${entry.word}-audio`} className="bg-green-50 rounded-xl p-4">
                          <AudioPlayer
                            src={urlForFile(entry.audio as Parameters<typeof urlForFile>[0])}
                            title={`${entry.word} — ${entry.translation}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollRevealSection>
            </div>
          )}
        </div>
      </section>

      {/* Language Preservation Efforts */}
      <section className="py-24 px-6 bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Help Preserve Our Languages
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our language preservation efforts. Every recording, every lesson,
              every conversation helps keep Kirati languages alive.
            </p>
            <a
              href="mailto:pranab.rai@coss.org.in?subject=Ikirati%20Language%20Recording"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Volunteer to Record
            </a>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};
