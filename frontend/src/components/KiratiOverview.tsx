import React from "react";
import { ScrollRevealSection } from "./ScrollReveal";
import { Users, History, BookOpen } from "lucide-react";

const KiratiOverview: React.FC = () => (
  <section className="py-24 px-6 bg-amber-50 relative overflow-hidden" id="kirati-overview">
    {/* Background Pattern */}
    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
      <div className="absolute right-0 top-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>

    <div className="max-w-6xl mx-auto relative z-10">
      <ScrollRevealSection>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6 font-serif">The Kirati People</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-green-800 max-w-3xl mx-auto leading-relaxed">
            The <strong className="text-amber-600">Kirati</strong> are an indigenous ethnic group primarily found in the eastern Himalayan region.
            Known for their rich cultural heritage, unique languages, and deep spiritual connection with nature.
          </p>
        </div>
      </ScrollRevealSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          { name: "Rai", desc: "Known for their rich oral traditions and diverse dialects." },
          { name: "Limbu", desc: "Famous for the Mundhum and their distinct script, Sirijunga." },
          { name: "Yakkha", desc: "Custodians of unique agricultural practices and rituals." },
          { name: "Sunuwar", desc: "Skilled artisans and warriors with a deep bond to the land." }
        ].map((group, index) => (
          <ScrollRevealSection key={index} className={['', 'delay-100', 'delay-200'][index % 3]}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 group hover:-translate-y-2 h-full">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-300">
                <Users className="w-7 h-7 text-green-700 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-3 font-serif">{group.name}</h3>
              <p className="text-green-700 leading-relaxed text-sm">
                {group.desc}
              </p>
            </div>
          </ScrollRevealSection>
        ))}
      </div>

      <ScrollRevealSection>
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-green-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -mr-32 -mt-32 opacity-50"></div>

          <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
            <div className="md:w-1/3">
              <div className="bg-green-900 text-white p-8 rounded-2xl shadow-lg transform md:-rotate-2">
                <History className="w-10 h-10 mb-4 text-amber-400" />
                <h3 className="text-2xl font-bold mb-4 font-serif">Historical Roots</h3>
                <p className="text-green-100 leading-relaxed">
                  From ancient dynasties to modern resilience, the Kirati history is a testament to survival and cultural pride.
                </p>
              </div>
            </div>

            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-green-900 mb-8 flex items-center gap-3 font-serif">
                <BookOpen className="w-8 h-8 text-amber-500" />
                Key Historical Facts
              </h3>
              <ul className="space-y-6">
                {[
                  "Believed to be among the earliest inhabitants of Nepal and the eastern Himalayas.",
                  "Ruled parts of Nepal for centuries before the Shah dynasty (Kirati Dynasty).",
                  "Mentioned in the Mahabharata as fierce warriors and skilled archers.",
                  "Traditionally lived in autonomous communities practicing subsistence agriculture."
                ].map((fact, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <span className="flex-shrink-0 w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      {i + 1}
                    </span>
                    <p className="text-lg text-green-800 leading-relaxed group-hover:text-green-900 transition-colors">
                      {fact}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollRevealSection>
    </div>
  </section>
);

export default KiratiOverview;