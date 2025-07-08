import React from 'react';
import { Globe } from 'lucide-react';
import { AudioPlayer } from '../components/AudioPlayer';
import { languageRecordings } from '../data';

export const LanguagePage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="w-16 h-16 mx-auto mb-6 text-amber-600" />
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Our Native Tongue
          </h1>
          <p className="text-xl text-green-700">
            Language is the soul of a people. With only 12 fluent speakers remaining, 
            every word saved is a victory against time.
          </p>
        </div>
      </section>

      {/* Language Stats & Word of the Day */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-green-900 mb-6">
                Preserving Our Language
              </h2>
              <p className="text-xl text-green-700 mb-8">
                Every conversation, every recording, every lesson brings us closer to 
                ensuring our language survives for future generations.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Word of the Day</h4>
                  <p className="text-3xl font-bold text-amber-600 mb-2">Yaku-tani</p>
                  <p className="text-green-700">Sacred mountain where spirits dwell</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-4xl font-bold text-green-800">847</div>
                    <div className="text-green-600">Words Preserved</div>
                  </div>
                  <div className="text-center p-6 bg-amber-50 rounded-lg">
                    <div className="text-4xl font-bold text-amber-600">12</div>
                    <div className="text-amber-700">Fluent Speakers</div>
                  </div>
                </div>
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Learn Our Language
              </button>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-green-900 mb-6">Recent Recordings</h3>
                <div className="space-y-4">
                  {languageRecordings.map((recording, index) => (
                    <AudioPlayer
                      key={index}
                      src={recording.audioSrc}
                      title={`${recording.title} - ${recording.speaker}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Learning Resources */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
            Learning Resources
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Basic Vocabulary</h3>
              <p className="text-green-700 mb-6">
                Start your journey with essential words and phrases used in daily life.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-green-800 font-semibold">Ama</span>
                  <span className="text-green-600">Mother</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800 font-semibold">Tayta</span>
                  <span className="text-green-600">Father</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800 font-semibold">Wasi</span>
                  <span className="text-green-600">House</span>
                </div>
              </div>
              <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-3 rounded-full font-semibold transition-colors">
                View All Words
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Pronunciation Guide</h3>
              <p className="text-green-700 mb-6">
                Learn the correct pronunciation with audio examples from native speakers.
              </p>
              <div className="space-y-4 mb-6">
                <AudioPlayer 
                  src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
                  title="Pronunciation: Greetings"
                />
                <AudioPlayer 
                  src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
                  title="Pronunciation: Numbers"
                />
              </div>
              <button className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 py-3 rounded-full font-semibold transition-colors">
                Practice Speaking
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Cultural Context</h3>
              <p className="text-green-700 mb-6">
                Understand the deeper meaning behind words and their cultural significance.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-900 mb-2">Sacred Words</h4>
                <p className="text-green-700 text-sm">
                  Many words in our language carry spiritual meaning and are used 
                  only in specific ceremonies or contexts.
                </p>
              </div>
              <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-3 rounded-full font-semibold transition-colors">
                Learn Context
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Language Preservation Efforts */}
      <section className="py-20 px-6 bg-green-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Help Preserve Our Language
          </h2>
          <p className="text-xl text-green-200 mb-8">
            Join our language preservation efforts. Every recording, every lesson, 
            every conversation helps keep our language alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Volunteer to Record
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              Join Language Classes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};