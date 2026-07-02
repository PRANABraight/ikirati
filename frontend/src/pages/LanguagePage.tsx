import React, { useState, useEffect } from 'react';
import { AudioPlayer } from '../components/AudioPlayer';
import { languageRecordings } from '../data';
import { ScrollRevealSection } from '../components/ScrollReveal';
import { HeroOverlay } from '../components/HeroOverlay';

export const LanguagePage: React.FC = () => {
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
            backgroundImage: "url('https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <HeroOverlay />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            Our Native Tongue
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 drop-shadow-md max-w-2xl mx-auto">
            Language is the soul of a people. With only 12 fluent speakers remaining,
            every word saved is a victory against time.
          </p>
        </div>
      </section>

      {/* Language Stats & Word of the Day */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollRevealSection>
              <div>
                <h2 className="text-4xl font-bold text-green-900 mb-6">
                  Preserving Our Language
                </h2>
                <p className="text-xl text-green-700 mb-8 leading-relaxed">
                  Every conversation, every recording, every lesson brings us closer to
                  ensuring our language survives for future generations.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100">
                    <h4 className="font-bold text-green-900 mb-3 text-lg uppercase tracking-wide">Word of the Day</h4>
                    <p className="text-4xl font-bold text-amber-600 mb-2">Yaku-tani</p>
                    <p className="text-green-700 text-lg italic">Sacred mountain where spirits dwell</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-8 bg-green-100 rounded-2xl shadow-md">
                      <div className="text-5xl font-bold text-green-800 mb-2">847</div>
                      <div className="text-green-700 font-medium">Words Preserved</div>
                    </div>
                    <div className="text-center p-8 bg-amber-100 rounded-2xl shadow-md">
                      <div className="text-5xl font-bold text-amber-600 mb-2">12</div>
                      <div className="text-amber-800 font-medium">Fluent Speakers</div>
                    </div>
                  </div>
                </div>

                <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Learn Our Language
                </button>
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection className="delay-200">
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-green-50">
                  <h3 className="text-2xl font-bold text-green-900 mb-8 border-b border-green-100 pb-4">Recent Recordings</h3>
                  <div className="space-y-6">
                    {languageRecordings.map((recording, index) => (
                      <div key={index} className="bg-green-50 rounded-xl p-4">
                        <AudioPlayer
                          src={recording.audioSrc}
                          title={`${recording.title} - ${recording.speaker} `}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>

      {/* Language Learning Resources */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollRevealSection>
            <h2 className="text-4xl font-bold text-green-900 mb-16 text-center">
              Learning Resources
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group">
                <h3 className="text-2xl font-bold text-green-900 mb-4 group-hover:text-amber-600 transition-colors">Basic Vocabulary</h3>
                <p className="text-green-700 mb-8">
                  Start your journey with essential words and phrases used in daily life.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-green-800 font-bold text-lg">Ama</span>
                    <span className="text-green-600 italic">Mother</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-green-800 font-bold text-lg">Tayta</span>
                    <span className="text-green-600 italic">Father</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-green-800 font-bold text-lg">Wasi</span>
                    <span className="text-green-600 italic">House</span>
                  </div>
                </div>
                <button className="w-full bg-green-200 hover:bg-green-300 text-green-900 py-3 rounded-full font-bold transition-colors">
                  View All Words
                </button>
              </div>

              <div className="bg-amber-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 group">
                <h3 className="text-2xl font-bold text-green-900 mb-4 group-hover:text-amber-600 transition-colors">Pronunciation Guide</h3>
                <p className="text-green-700 mb-8">
                  Learn the correct pronunciation with audio examples from native speakers.
                </p>
                <div className="space-y-6 mb-8">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <AudioPlayer
                      src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
                      title="Pronunciation: Greetings"
                    />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <AudioPlayer
                      src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
                      title="Pronunciation: Numbers"
                    />
                  </div>
                </div>
                <button className="w-full bg-amber-200 hover:bg-amber-300 text-amber-900 py-3 rounded-full font-bold transition-colors">
                  Practice Speaking
                </button>
              </div>

              <div className="bg-green-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group">
                <h3 className="text-2xl font-bold text-green-900 mb-4 group-hover:text-amber-600 transition-colors">Cultural Context</h3>
                <p className="text-green-700 mb-8">
                  Understand the deeper meaning behind words and their cultural significance.
                </p>
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border-l-4 border-amber-500">
                  <h4 className="font-bold text-green-900 mb-2">Sacred Words</h4>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Many words in our language carry spiritual meaning and are used
                    only in specific ceremonies or contexts.
                  </p>
                </div>
                <button className="w-full bg-green-200 hover:bg-green-300 text-green-900 py-3 rounded-full font-bold transition-colors">
                  Learn Context
                </button>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Language Preservation Efforts */}
      <section className="py-24 px-6 bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Help Preserve Our Language
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our language preservation efforts. Every recording, every lesson,
              every conversation helps keep our language alive.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                Volunteer to Record
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg">
                Join Language Classes
              </button>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};